import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Protected = ({ isAllowed, redirectPath, children }) => {
console.log("isLoggedIn in protected js",isAllowed);

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default Protected;
