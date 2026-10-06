import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Order/Order";
import NotFound from "./pages/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAdminAuth, initializeCustomerAuth } from "./Redux/AuthSlice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminDashboardHome from "./pages/Admin/Dashboard/AdminDashboardHome";
import AdminProtectedRoute from "./Components/AdminProtectedRoute/AdminProtectedRoute";
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import AdminOrders from "./pages/Admin/Orders/AdminOrders";
import AdminCategories from "./pages/Admin/Categories/AdminCategories";
import AdminInventory from "./pages/Admin/Inventory/AdminInventory";
import AdminOrderDetails from "./pages/Admin/Orders/AdminOrderDetails";

function App() {
 const dispatch = useDispatch();

const adminInitialized = useSelector(
  (state) => state.auth.admin.initialized
);
const customerInitialized = useSelector(
  (state) => state.auth.customer.initialized
);

useEffect(() => {
  dispatch(initializeAdminAuth());
  dispatch(initializeCustomerAuth());
}, [dispatch]);

if (!adminInitialized || !customerInitialized) {
  return <div>Loading...</div>;
}

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardHome />} />

          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<AdminOrderDetails />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="categories" element={<AdminCategories />} />

          <Route path="inventory" element={<AdminInventory />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
