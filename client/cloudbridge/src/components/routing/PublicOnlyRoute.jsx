import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicOnlyRoute = () => {
  const { isAuthenticated, defaultRoute } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
