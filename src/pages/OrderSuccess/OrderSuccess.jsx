import "./OrderSuccess.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchOrders } from "../../services/orderService";

function OrderSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError("Order information is unavailable.");
        setLoading(false);
        return;
      }

      try {
        const orders = await fetchOrders();

        const foundOrder = orders.find(
          (item) => String(item.id) === String(orderId),
        );

        if (!foundOrder) {
          setError("We could not find your order details.");
          return;
        }

        setOrder(foundOrder);
      } catch (err) {
        console.error("Failed to load order:", err);
        setError("Unable to load your order details.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h2>Loading your order...</h2>

          <p className="success-message">
            Please wait while we retrieve your order details.
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h2>Order information unavailable</h2>

          <p className="success-message">
            {error || "We could not find your order details."}
          </p>

          <div className="success-actions">
            <button
              type="button"
              className="continue-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              type="button"
              className="track-btn"
              onClick={() => navigate("/orders")}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isWhatsappOrder = order.paymentMethod === "MANUAL";

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>{isWhatsappOrder ? "✓" : "✓"}</h1>

        <h2>
          {isWhatsappOrder
            ? "Order Request Created"
            : "Order Placed Successfully"}
        </h2>

        <p className="success-message">
          {isWhatsappOrder
            ? "Your order request has been created. Please send the prepared WhatsApp message to our team. Your order will be confirmed after we receive and review your message."
            : "Thank you for choosing UK Hills Overseas. Your order has been received and is being prepared."}
        </p>

        <div className="order-id">
          Order ID: #{order.id}
        </div>

        <div className="order-info">
          <p>
            <span>Estimated Delivery</span>
            <strong>3-5 Working Days</strong>
          </p>

          <p>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </p>

          <p>
            <span>Amount</span>
            <strong>
              ₹{Number(order.totalAmount ?? order.total ?? 0).toFixed(0)}
            </strong>
          </p>

          <p>
            <span>Payment Method</span>
            <strong>
              {isWhatsappOrder ? "WhatsApp / Manual" : order.paymentMethod}
            </strong>
          </p>

          <p>
            <span>Payment Status</span>
            <strong>
              {isWhatsappOrder ? "Awaiting Confirmation" : order.paymentStatus}
            </strong>
          </p>

          {order.razorpayPaymentId && (
            <p>
              <span>Payment ID</span>
              <strong>{order.razorpayPaymentId}</strong>
            </p>
          )}
        </div>

        {isWhatsappOrder && (
          <p className="whatsapp-order-note">
            Please make sure the WhatsApp message is sent successfully. Our
            team will confirm your order after receiving it.
          </p>
        )}

        <div className="success-actions">
          <button
            type="button"
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            type="button"
            className="track-btn"
            onClick={() => navigate("/orders")}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;