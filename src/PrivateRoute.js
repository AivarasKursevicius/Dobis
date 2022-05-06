import { Navigate, Outlet } from "react-router";
import { useLocation } from "react-router";

export const PrivateRoute = ({isLogged}) => {
    return isLogged? <Outlet/> : <Navigate to='/login'/>;
}

export const ProtectedRoutes = ({isLogged}) => {
    const location = useLocation();
    const isAuth = isLogged;
    return isAuth ? (
      <Outlet />
    ) : (
      <Navigate to="/" replace state={{ from: location }} />
    );
  };
  
  export default ProtectedRoutes;