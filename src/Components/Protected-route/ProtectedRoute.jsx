import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  // Component States
  const userToken = localStorage.getItem("userToken");

  return userToken ? children : <Navigate to="/auth/login" />;

};

export default ProtectedRoute;
