import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/" />;
}
