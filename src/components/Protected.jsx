import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
