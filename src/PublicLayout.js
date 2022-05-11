import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const PublicLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{outlet}</>;
};
