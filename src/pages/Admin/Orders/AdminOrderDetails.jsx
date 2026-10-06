import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminOrderById,
  updateAdminOrderStatus,
} from "../../../services/adminService";
import "./AdminOrderDetails.css";

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const TRANSITIONS = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PACKED", "CANCELLED"],
  PACKED: ["SHIPPED"],
  SHIPPED: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

function formatLabel(value) {
  if (!value) return "Not available";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function AdminOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAdminOrderById(orderId);

        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);

        setError(
          error.message || "Failed to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const handleStatusChange = async (event) => {
    const nextStatus = event.target.value;

    try {
      setUpdating(true);
      setError("");

      const updatedOrder = await updateAdminOrderStatus(
        order.id,
        nextStatus
      );

      setOrder((previousOrder) => ({
        ...previousOrder,
        ...updatedOrder,
      }));
    } catch (error) {
      console.error("Failed to update order:", error);

      setError(
        error.message || "Failed to update order status."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-order-details">
        <div className="order-details-loading">
          Loading order details...
        </div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="admin-order-details">
        <div className="order-details-error">
          {error}
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-order-details">
        <div className="order-details-error">
          Order not found.
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-details">

      {/* Header */}
      <div className="order-details-header">

        <div>
          <button
            type="button"
            className="order-back-btn"
            onClick={() => navigate("/admin/orders")}
          >
            ← Back to Orders
          </button>

          <h1>Order #{order.id}</h1>

          <p>
            View and manage order information.
          </p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="order-details-error">
          {error}
        </div>
      )}

      {/* Customer + Payment */}
      <div className="order-details-grid">

        {/* Customer */}
        <section className="order-details-card">

          <h2>Customer Information</h2>

          <div className="order-info-row">
            <span>Name</span>
            <strong>
              {order.user?.name || "Not available"}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Email</span>
            <strong>
              {order.user?.email || "Not available"}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Customer ID</span>
            <strong>
              {order.user?.id ?? "Not available"}
            </strong>
          </div>

        </section>

        {/* Payment */}
        <section className="order-details-card">

          <h2>Payment Information</h2>

          <div className="order-info-row">
            <span>Payment Method</span>
            <strong>
              {formatLabel(order.paymentMethod)}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Payment Status</span>
            <strong>
              {formatLabel(order.paymentStatus)}
            </strong>
          </div>

          <div className="order-info-row">
            <span>Total Amount</span>
            <strong>
              ₹{order.totalAmount}
            </strong>
          </div>

        </section>

      </div>

      {/* Order Items */}
      <section className="order-details-card order-items-card">

        <div className="section-header">
          <div>
            <h2>Order Items</h2>

            <p>
              {order.items?.length || 0} item(s)
            </p>
          </div>
        </div>

        {!order.items || order.items.length === 0 ? (
          <div className="order-items-empty">
            No items found for this order.
          </div>
        ) : (
          <div className="order-items-list">

            {order.items.map((item) => (

              <div
                className="order-item"
                key={item.id}
              >

                {/* Product */}
                <div className="order-item-product">

                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="order-item-image"
                    />
                  ) : (
                    <div className="order-item-image-placeholder">
                      No Image
                    </div>
                  )}

                  <div>
                    <h3>
                      {item.product?.name || "Product"}
                    </h3>

                    <p>
                      Weight:{" "}
                      {item.variant?.weight ||
                        "Not available"}
                    </p>

                    <p>
                      Quantity:{" "}
                      {item.quantity ?? "Not available"}
                    </p>
                  </div>

                </div>

                {/* Price */}
                <div className="order-item-price">

                  <span>
                    Unit Price
                  </span>

                  <strong>
                    ₹{item.variant?.price ?? "—"}
                  </strong>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* Order Status */}
      <section className="order-details-card">

        <h2>Order Status</h2>

        <div className="order-status-control">

          <div>
            <p>Current Status</p>

            <strong>
              {formatLabel(order.status)}
            </strong>
          </div>

          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={updating}
          >

            {STATUS_OPTIONS.map((status) => (

              <option
                key={status}
                value={status}
                disabled={
                  status !== order.status &&
                  !TRANSITIONS[order.status]?.includes(
                    status
                  )
                }
              >
                {formatLabel(status)}
              </option>

            ))}

          </select>

        </div>

        {updating && (
          <p className="order-status-updating">
            Updating order status...
          </p>
        )}

      </section>

    </div>
  );
}

export default AdminOrderDetails;