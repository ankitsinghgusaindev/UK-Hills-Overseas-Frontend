import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const location = useLocation();

  const { isAuthenticated, initialized } = useSelector(
    (state) => state.auth.customer
  );

  // Wait until the customer session check is complete
  if (!initialized) {
    return <div>Loading...</div>;
  }

  // Redirect unauthenticated customers to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;