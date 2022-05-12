import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import React from "react";
import SidebarHeader from "./app/SidebarHeader";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <SidebarHeader>{outlet}</SidebarHeader>;
};
