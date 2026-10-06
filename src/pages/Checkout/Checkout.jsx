import "./Checkout.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../../Redux/OrderSlice";
import { clearCart } from "../../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../utils/pricing";
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../services/orderService";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const coupon = useSelector((state) => state.cart.coupon);

  const {
    subtotal,
    discount,
    // discountedSubtotal,
    shipping,
    gst,
    total,
    coupon: appliedCoupon,
  } = calculateCartTotals(cartItems, coupon);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const validateCustomer = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const postalCodeRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.email.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.state.trim() ||
      !customer.postalCode.trim()
    ) {
      alert("Please fill all delivery details.");
      return false;
    }

    if (!phoneRegex.test(customer.phone.trim())) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!emailRegex.test(customer.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!postalCodeRegex.test(customer.postalCode.trim())) {
      alert("Please enter a valid 6-digit postal code.");
      return false;
    }

    return true;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

  const handleCOD = async () => {
    if (!validateCustomer()) return;

    try {
      setLoading(true);

      const order = await createOrder({
        customer,
        cartItems,
        coupon,
        orderSource: "WEBSITE",
        paymentMethod: "COD",
        // paymentStatus: "PENDING",
      });

      dispatch(
        placeOrder({
          id: `UKH${order.id}`,
          items: cartItems,
          customer,
          total: Number(order.totalAmount),
          paymentMethod: "COD",
          paymentStatus: order.paymentStatus,
          status: order.status,
          createdAt: order.createdAt,
        }),
      );

      dispatch(clearCart());
      navigate(`/success?orderId=${order.id}`);
    } catch (error) {
      console.error("COD order failed:", error);
      alert(error.message || "Unable to place COD order.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsappOrder = async () => {
    if (!validateCustomer()) return;

    try {
      setLoading(true);

      const order = await createOrder({
        customer,
        cartItems,
        coupon,
        orderSource: "WHATSAPP",
        paymentMethod: "MANUAL",
        // paymentStatus: "PENDING",
      });

      const products = cartItems
        .map(
          (item) =>
            `${item.name} (${item.selectedWeight || item.weight || "Default"}) x ${
              item.quantity
            }`,
        )
        .join("\n");

      const message = `
🛒 UK Hills Overseas Order

Order ID: UKH${order.id}
Date: ${new Date().toLocaleString()}

Name: ${customer.name}
Phone: ${customer.phone}
Email: ${customer.email}

Address:
${customer.address}
${customer.city}, ${customer.state}
${customer.postalCode}

Products:
${products}

Total: ₹${Number(order.totalAmount).toFixed(0)}

Payment Method: WhatsApp / Manual Confirmation
Payment Status: Pending
`;

      dispatch(
        placeOrder({
          id: `UKH${order.id}`,
          items: cartItems,
          customer,
          total: Number(order.totalAmount),
          status: order.status,
          paymentMethod: "WhatsApp",
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt,
        }),
      );

      dispatch(clearCart());

      window.open(
        `https://wa.me/917983524302?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );

      navigate(`/success?orderId=${order.id}`);
    } catch (error) {
      console.error("WhatsApp order failed:", error);
      alert(error.message || "Unable to create WhatsApp order.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
    if (!validateCustomer()) return;

    let databaseOrder = null;

    try {
      setLoading(true);

      // 1. Create a pending database order.
      databaseOrder = await createOrder({
        customer,
        cartItems,
        coupon,
        orderSource: "WEBSITE",
        paymentMethod: "RAZORPAY",
      });

      const databaseOrderId = Number(databaseOrder.id);

      if (!Number.isInteger(databaseOrderId) || databaseOrderId <= 0) {
        throw new Error("Invalid database order ID.");
      }

      // 2. Create the Razorpay payment order.
      const razorpayOrder = await createRazorpayOrder({
        orderId: databaseOrder.id,
      });

      // 3. Save the Razorpay order ID in PostgreSQL.
      // await saveRazorpayOrderId(databaseOrder.id, razorpayOrder.id);

      // 4. Open Razorpay Checkout.
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error(
          "Razorpay Key ID is missing. Check the frontend .env file.",
        );
      }

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "UK Hills Overseas",
        description: "Premium Himalayan Products",
        order_id: razorpayOrder.id,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },

        notes: {
          databaseOrderId: String(databaseOrder.id),
        },

        theme: {
          color: "#0f766e",
        },

        // 5. Verify the payment on the backend.
        handler: async (paymentResponse) => {
          try {
            setLoading(true);

            const verifiedOrder = await verifyRazorpayPayment({
              orderId: databaseOrder.id,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            });

            dispatch(
              placeOrder({
                id: `UKH${verifiedOrder.id}`,
                items: cartItems,
                customer,
                total: Number(verifiedOrder.totalAmount),
                status: verifiedOrder.status,
                paymentMethod: "RAZORPAY",
                paymentStatus: verifiedOrder.paymentStatus,
                paymentId: verifiedOrder.razorpayPaymentId,
                createdAt: verifiedOrder.createdAt,
              }),
            );

            dispatch(clearCart());
           navigate(`/success?orderId=${databaseOrder.id}`);
          } catch (error) {
            console.error("Payment verification failed:", error);

            alert(
              error.message ||
                "Payment verification failed. Please contact support.",
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled. Your order remains pending.");
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout script is not loaded.");
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (paymentError) => {
        console.error("Payment failed:", paymentError);

        alert(
          paymentError.error?.description ||
            "Payment failed. Your order remains pending.",
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Razorpay flow failed:", error);
      alert(error.message || "Unable to start payment.");
      setLoading(false);
    }
  };

  // Stage 1: prevent checkout from being used without products.
  if (cartItems.length === 0) {
    return (
      <main
        className="checkout-page empty-checkout"
        aria-labelledby="empty-checkout-title"
      >
        <section className="empty-checkout-card">
          <h1 id="empty-checkout-title">Your Cart Is Empty</h1>
          <p>Add products to your cart before proceeding to checkout.</p>
          <button
            type="button"
            className="payment-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <section
          className="checkout-form"
          aria-labelledby="delivery-details-title"
        >
          <h1 id="delivery-details-title">Delivery Details</h1>

          <div className="form-field">
            <label htmlFor="checkout-name">Full Name</label>
            <input
              id="checkout-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={customer.name}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-phone">Phone Number</label>
            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              placeholder="Enter your 10-digit mobile number"
              value={customer.phone}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-email">Email Address</label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={customer.email}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-address">Delivery Address</label>
            <textarea
              id="checkout-address"
              name="address"
              autoComplete="street-address"
              placeholder="Enter your complete delivery address"
              value={customer.address}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-city">City</label>
            <input
              id="checkout-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Enter your city"
              value={customer.city}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-state">State</label>
            <input
              id="checkout-state"
              name="state"
              type="text"
              autoComplete="address-level1"
              placeholder="Enter your state"
              value={customer.state}
              onChange={handleInput}
            />
          </div>

          <div className="form-field">
            <label htmlFor="checkout-postal-code">Postal Code</label>
            <input
              id="checkout-postal-code"
              name="postalCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder="Enter your 6-digit postal code"
              value={customer.postalCode}
              onChange={handleInput}
            />
          </div>
        </section>

        <section
          className="order-summary"
          aria-labelledby="order-summary-title"
        >
          <h2 id="order-summary-title">Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="summary-item"
            >
              <span>
                {item.name} × {item.quantity}
                {item.selectedWeight && <small>{item.selectedWeight}</small>}
              </span>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <p>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </p>

          {discount > 0 && (
            <p>
              <span>
                Discount
                {appliedCoupon && ` (${appliedCoupon})`}
              </span>
              <span>-₹{discount.toFixed(0)}</span>
            </p>
          )}

          <p>
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </p>

          <p>
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(0)}</span>
          </p>

          <h3>
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </h3>

          <fieldset className="payment-methods">
            <legend>Select Payment Method</legend>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>UPI / Cards / Net Banking</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash On Delivery</span>
            </label>
          </fieldset>

          <button
            type="button"
            className="payment-btn"
            disabled={loading}
            aria-busy={loading}
            onClick={() => {
              if (paymentMethod === "cod") {
                handleCOD();
              } else {
                handleRazorpay();
              }
            }}
          >
            {loading
              ? "Processing..."
              : paymentMethod === "razorpay"
                ? `Pay ₹${total.toFixed(0)} Securely`
                : "Place COD Order"}
          </button>

          <button
            type="button"
            className="whatsapp-btn-order"
            disabled={loading}
            aria-busy={loading}
            onClick={handleWhatsappOrder}
          >
            {loading ? "Processing..." : "Order via WhatsApp"}
          </button>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
