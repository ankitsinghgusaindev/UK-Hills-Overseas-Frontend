import "./AdminOrders.css";
import { useEffect, useState } from "react";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
} from "../../../services/adminService";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

function formatStatus(status) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll("_", "-");
}

function getPaymentStatusClass(status) {
  return status.toLowerCase();
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAdminOrders();

        setOrders(data);
      } catch (error) {
        console.error("Failed to load admin orders:", error);
        setError(error.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const updatedOrder = await updateAdminOrderStatus(orderId, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === updatedOrder.id
            ? {
                ...order,
                status: updatedOrder.status,
              }
            : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order:", error);
      alert(error.message || "Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <div className="admin-orders">
        <div className="admin-orders-loading">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders">
        <div className="admin-orders-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      {/* Header */}
      <div className="admin-orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track customer orders</p>
        </div>
      </div>

      {/* Orders Card */}
      <div className="admin-orders-card">
        {orders.length === 0 ? (
          <div className="admin-orders-empty">
            <h3>No orders found</h3>
            <p>There are currently no customer orders.</p>
          </div>
        ) : (
          <div className="admin-orders-table-wrapper">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    {/* Order ID */}
                    <td>
                      <span className="admin-order-id">#{order.id}</span>
                    </td>

                    {/* Customer */}
                    <td>
                      <div className="admin-customer-name">
                        {order.user?.name || order.customerName}
                      </div>

                      <div className="admin-customer-email">
                        {order.user?.email || order.email}
                      </div>
                    </td>

                    {/* Amount */}
                    <td>
                      <span className="admin-order-amount">
                        ₹{order.totalAmount}
                      </span>
                    </td>

                    {/* Payment */}
                    <td>
                      <div className="admin-payment-method">
                        {formatStatus(order.paymentMethod)}
                      </div>

                      <span
                        className={`admin-payment-status ${getPaymentStatusClass(
                          order.paymentStatus,
                        )}`}
                      >
                        {formatStatus(order.paymentStatus)}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td>
                      <select
                        className={`admin-status-select ${getStatusClass(
                          order.status,
                        )}`}
                        value={order.status}
                        onChange={(event) =>
                          handleStatusChange(order.id, event.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option
                            key={status}
                            value={status}
                            disabled={
                              status !== order.status &&
                              !canSelectStatus(order.status, status)
                            }
                          >
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    
                    <td>
                      <button
                        type="button"
                        className="admin-view-order-btn"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function canSelectStatus(currentStatus, nextStatus) {
  const transitions = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PACKED", "CANCELLED"],
    PACKED: ["SHIPPED"],
    SHIPPED: ["OUT_FOR_DELIVERY"],
    OUT_FOR_DELIVERY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  return transitions[currentStatus]?.includes(nextStatus);
}

export default AdminOrders;
