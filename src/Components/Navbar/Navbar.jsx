import "./Navbar.css";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../Redux/ProductSlice";
import { useNavigate, Link } from "react-router-dom";
import { logoutCustomer } from "../../Redux/AuthSlice";

import { FaSearch } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

function Navbar({ setCartOpen }) {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state) => state.auth.customer);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const orders = useSelector((state) => state.orders.orders);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const activeOrders = orders.filter((order) => order.status !== "Delivered");

  const showTrackOrder = activeOrders.length > 0;

  useEffect(() => {
    const normalizedSearch = search.trim();

    if (!normalizedSearch) {
      dispatch(setSearchTerm(""));
      return;
    }

    const timer = setTimeout(() => {
      dispatch(setSearchTerm(normalizedSearch));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const handleLogout = async () => {
    const result = await dispatch(logoutCustomer());

    if (logoutCustomer.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to="/" className="logo">
        UK Hills Overseas
      </Link>

      <ul>
        <li>
          <a href="#home">Home</a>
        </li>

        <li>
          <a href="#products">Products</a>
        </li>

        <li>
          <a href="#services">Services</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="actions">
         {isAuthenticated ? (
          <div className="auth-actions">
            <span className="user-name">Hi, {user?.name}</span>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              disabled={authLoading}
            >
              {authLoading ? "..." : "Logout"}
            </button>
          </div>
        ) : (
          <div className="auth-actions">
            <button
              type="button"
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        )}
        
        <div className="search-box">
          <FaSearch aria-hidden="true" />

          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            placeholder="Search Pickles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>

       

        <button
          type="button"
          className="cart-btn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${totalItems} ${
            totalItems === 1 ? "item" : "items"
          }`}
        >
          <span aria-hidden="true">🛒</span>
          <span className="cart-count" aria-hidden="true">
            {totalItems}
          </span>
        </button>

        {showTrackOrder && (
          <button
            type="button"
            className="track-order-btn"
            onClick={() => navigate("/orders")}
            aria-label="Track my orders"
          >
            <MdLocalShipping className="track-icon" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
