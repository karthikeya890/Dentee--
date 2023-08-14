import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  if (!Cookies.get("jwtToken")) return <Navigate to="/login" replace="true" />;

  return props.children;
};

export default ProtectedRoute;
