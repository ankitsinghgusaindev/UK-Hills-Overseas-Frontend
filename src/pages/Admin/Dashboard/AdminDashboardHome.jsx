import { useEffect, useState } from "react";
import { fetchAdminOrders } from "../../../services/adminService";
import "./AdminDashboardHome.css";

function AdminDashboardHome() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const data = await fetchAdminOrders();

        setOrders(data);
      } catch (error) {
        setError(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-error">
        {error}
      </div>
    );
  }

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "CONFIRMED"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "PAID")
    .reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-dashboard-home">

      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your UK Hills Overseas store</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span className="stat-label">Total Orders</span>
          <strong>{totalOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-label">Pending Orders</span>
          <strong>{pendingOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-label">Confirmed Orders</span>
          <strong>{confirmedOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-label">Delivered Orders</span>
          <strong>{deliveredOrders}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span className="stat-label">Paid Revenue</span>
          <strong>₹{totalRevenue.toFixed(2)}</strong>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="dashboard-section">

        <div className="dashboard-section-header">
          <h3>Recent Orders</h3>
          <span>{recentOrders.length} orders</span>
        </div>

        {recentOrders.length === 0 ? (
          <div className="dashboard-empty">
            No orders found.
          </div>
        ) : (
          <div className="dashboard-orders-table-wrapper">
            <table className="dashboard-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>

                    <td>#{order.id}</td>

                    <td>
                      <div className="dashboard-customer">
                        <strong>
                          {order.user?.name || "Guest"}
                        </strong>

                        <span>
                          {order.user?.email || "No email"}
                        </span>
                      </div>
                    </td>

                    <td>
                      ₹{Number(order.totalAmount || 0).toFixed(2)}
                    </td>

                    <td>
                      {order.paymentStatus}
                    </td>

                    <td>
                      <span
                        className={`dashboard-status status-${order.status.toLowerCase()}`}
                      >
                        {order.status.replaceAll("_", " ")}
                      </span>
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

export default AdminDashboardHome;