import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../assets/512.png";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { authentication } from "./firebase";

const drawerWidth = 240;

const sidebarList = [
  { text: "Rent", icon: HomeWorkRoundedIcon, path: "/rent" },
  { text: "Rent Invoice", icon: ReceiptRoundedIcon, path: "/rentinvoice" },
  { text: "Taxes", icon: PaidRoundedIcon, path: "/taxes" },
  { text: "Groceries", icon: AddShoppingCartRoundedIcon, path: "/groceries" },
  { text: "Todo", icon: FormatListNumberedRoundedIcon, path: "/todo" },
  { text: "Logout", icon: LogoutIcon, path: "/login" },
];

const SidebarHeader = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const routeChange = (to) => {
    var path = to;
    navigate(path);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { logout } = useAuth();

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isLastItem = (index, list) => {
    if (index + 1 === list.length) {
      return true;
    } else {
      return false;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {sidebarList.map((item, index, list) => (
          <React.Fragment key={index}>
            <ListItem
              button
              key={index}
              onClick={() =>
                isLastItem(index, list)
                  ? handleSignOut()
                  : routeChange(item.path)
              }
            >
              <ListItemIcon>{<item.icon />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider variant="middle" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() => routeChange("/")}
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            Kursevičiai
          </Typography>
          <Avatar
            alt="Dobis"
            style={{ marginLeft: "10px", cursor: "pointer" }}
            src={Logo}
            onClick={() => routeChange("/")}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "30px",
          marginBottom: "30px",
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
            xs: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />

        {props.children}
      </Box>
    </Box>
  );
};

export default SidebarHeader;
