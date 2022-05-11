import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import Sidebar, { DrawerHeader } from "./app/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Box bgcolor="secondary.main" sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {outlet}
        </Box>
      </Box>
    </>
  );
};
