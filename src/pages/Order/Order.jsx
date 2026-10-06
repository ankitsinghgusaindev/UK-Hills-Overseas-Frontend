import "./Order.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../services/orderService";

const formatStatus = (status = "") => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const normalizeOrder = (order) => {
  return {
    id: order.id,
    total: Number(order.totalAmount),
    status: formatStatus(order.status),

    // Payment information from backend
    paymentStatus: formatStatus(order.paymentStatus),
    paymentMethod: formatStatus(order.paymentMethod),

    customer: {
      name: order.customerName,
      email: order.email,
      phone: order.phone,
      address: `${order.address}, ${order.city}, ${order.state} - ${order.postalCode}`,
    },

    items: order.items.map((item) => ({
      id: item.id,
      name: item.product?.name || "Unknown Product",
      image: item.product?.image || "",
      weight: item.variant?.weight || "",
      quantity: item.quantity,
      price: Number(item.price),
    })),
  };
};

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async (showLoading = false) => {
      try {
        // Only show the loading screen on the first request.
        // Background refreshes happen silently.
        if (showLoading) {
          setLoading(true);
        }

        setError("");

        const backendOrders = await fetchOrders();

        const formattedOrders = backendOrders.map(normalizeOrder);

        if (isMounted) {
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);

        if (isMounted) {
          setError(error.message || "Unable to fetch orders.");
        }
      } finally {
        if (isMounted && showLoading) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    loadOrders(true);

    // Refresh orders every 5 seconds while the page is visible
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadOrders(false);
      }
    }, 5000);

    // Immediately refresh when the user returns to the Orders tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadOrders(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      isMounted = false;

      clearInterval(interval);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="no-orders">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="no-orders">
        <h2>Unable to Load Orders</h2>
        <p>{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No Orders Found</h2>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="order-actions">
        <button
          type="button"
          className="continue-shopping-btn"
          onClick={() => navigate("/")}
        >
          <span aria-hidden="true">←</span>
          <span className="button-text">Continue Shopping</span>
        </button>
      </div>

      <div className="orders-header">
        <h1>Track Your Order</h1>
        <p>
          Follow your order journey from our kitchen to your doorstep.
        </p>
      </div>

      {orders.map((order) => {
        const steps = [
          "Pending",
          "Confirmed",
          "Packed",
          "Shipped",
          "Out For Delivery",
          "Delivered",
        ];

        const currentStep = steps.indexOf(order.status);

        return (
          <div className="order-card" key={order.id}>
            {/* Order Header */}
            <div className="order-top">
              <div>
                <h3>Order #{order.id}</h3>

                <p>
                  Status:{" "}
                  <span className="status">
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="order-total">
                Total - ₹{order.total.toFixed(2)}
              </div>
            </div>

            {/* Order Tracking */}
            <div className="tracking-container">
              {steps.map((step, index) => (
                <div
                  className={`tracking-step ${
                    index <= currentStep ? "active" : ""
                  }`}
                  key={step}
                >
                  <div className="circle">
                    {index < currentStep
                      ? "✓"
                      : index === currentStep
                        ? "●"
                        : ""}
                  </div>

                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Ordered Products */}
            <div className="products-list">
              <h4>Ordered Items</h4>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="product-row"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                  ) : (
                    <div
                      className="product-placeholder"
                      aria-hidden="true"
                    >
                      🛍️
                    </div>
                  )}

                  <div>
                    <h5>{item.name}</h5>

                    <p>
                      {item.weight &&
                        `Weight: ${item.weight} | `}
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span>
                    ₹
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery Information */}
            <div className="delivery-info">
              <h4>Delivery Address</h4>

              <p>{order.customer.address}</p>
            </div>

            {/* Payment Information */}
            <div className="payment-badge">
              Payment status: {order.paymentStatus}
              {" • "}
              {order.paymentMethod}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;