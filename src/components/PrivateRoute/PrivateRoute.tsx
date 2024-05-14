import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  isAllowed,
  redirectTo = "/",
  children,
}: {
  isAllowed: any;
  redirectTo?: string;
  children?: any;
}): JSX.Element => {  
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
