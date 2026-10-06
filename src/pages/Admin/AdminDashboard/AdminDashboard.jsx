import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../../Redux/AuthSlice";
import "./AdminDashboard.css";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.admin);

  const handleLogout = async () => {
    const result = await dispatch(logoutAdmin());

    if (logoutAdmin.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-sidebar-header">
          <div className="admin-logo">
            UK Hills
          </div>

          <div className="admin-panel-title">
            Admin Panel
          </div>
        </div>

        <nav className="admin-navigation">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>▦</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>▤</span>
            Orders
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>◫</span>
            Products
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>◈</span>
            Categories
          </NavLink>

          <NavLink
            to="/admin/inventory"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>▥</span>
            Inventory
          </NavLink>

        </nav>

        <div className="admin-sidebar-footer">

          <div className="admin-user">
            <div className="admin-user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="admin-user-info">
              <strong>{user?.name || "Admin"}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main area */}
      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <h1>Admin Portal</h1>
            <p>Manage your UK Hills Overseas store</p>
          </div>

          <div className="admin-topbar-user">
            {user?.name || "Admin"}
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;