import "./CartModal.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
} from "../../Redux/CartSlice";

import { calculateCartTotals } from "../../utils/pricing";

function CartModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");

  const cartItems = useSelector((state) => state.cart.cartItems);
  const appliedCoupon = useSelector((state) => state.cart.coupon);

  /*
   * Single source of truth for cart pricing.
   * CartModal and Checkout now use the same calculation.
   */
  const {
    subtotal,
    discount,
    shipping,
    gst,
    total,
  } = calculateCartTotals(cartItems, appliedCoupon);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    onClose();
    navigate("/checkout");
  };

  const handleCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "WELCOME10") {
      dispatch(applyCoupon(code));
      toast.success("10% Applied Successfully");
      return;
    }

    if (code === "UKHILLS20") {
      dispatch(applyCoupon(code));
      toast.success("🎉 20% Discount Applied");
      return;
    }

    dispatch(applyCoupon(""));
    toast.error("❌ Invalid Coupon Code");
  };

  const removeCoupon = () => {
    setCouponCode("");
    dispatch(applyCoupon(""));
    toast.info("Coupon Removed Successfully");
  };

  const continueShopping = () => {
    onClose();

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 400);
  };

  return (
    <div
      className={`cart-overlay ${isOpen ? "show" : ""}`}
      role="presentation"
    >
      <aside
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <h2 id="cart-title">Your Cart</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✖
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon" aria-hidden="true">
              🛒
            </div>

            <h3>Your UK Hills Basket is Empty</h3>

            <p>
              Bring home the authentic taste of Uttarakhand. Explore our
              handcrafted pickles, spices, murabba, laddoos and Himalayan
              specialties.
            </p>

            <button
              type="button"
              className="continue-shopping-btn"
              onClick={continueShopping}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={`${item.productId}-${item.variantId}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>

                  <p>Weight: {item.selectedWeight}</p>

                  <p>₹{item.price}</p>

                  <div className="qty">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() =>
                        dispatch(
                          decreaseQty({
                            productId: item.productId,
                            variantId: item.variantId,
                          })
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() =>
                        dispatch(
                          increaseQty({
                            productId: item.productId,
                            variantId: item.variantId,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        productId: item.productId,
                        variantId: item.variantId,
                      })
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="cart-footer">
              <div className="cart-summary">
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
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(0)}</span>
                </p>

                <p>
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(0)}</span>
                </p>

                <h2>Total : ₹{total.toFixed(0)}</h2>
              </div>

              <label htmlFor="coupon-code" className="sr-only">
                Coupon code
              </label>

              <input
                id="coupon-code"
                type="text"
                value={couponCode}
                placeholder="Enter Coupon"
                autoComplete="off"
                onChange={(e) => setCouponCode(e.target.value)}
              />

              {discount > 0 && (
                <div className="coupon-applied">
                  <p className="coupon-success">
                    🎉 {appliedCoupon} Coupon Applied Successfully
                  </p>

                  <button
                    type="button"
                    className="remove-coupon-btn"
                    onClick={removeCoupon}
                  >
                    Remove Coupon
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleCoupon}
              >
                Apply Coupon
              </button>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartModal;