import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  // Login değilse
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol yetkisizse
  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
