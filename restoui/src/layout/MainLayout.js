import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Bgimage from "../images/b14.jpg";
import Img1 from "../images/b26.png";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Category, Fastfood, ListAlt } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import CommonHeader from "../shared/Commonheader";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;
const drawerBackgroundColor = "rgba(0, 0, 0, 0)";

// if(role === "superdsfdsf"){
//   menuList.push(  {
//     text: "Admin Management",
//     icon: <ManageAccountsIcon sx={{ color: "#fff" }} />,
//     page: "/admindatapage",
//   },)
// }

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: drawerBackgroundColor,
  color: "#fff",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: drawerBackgroundColor,
  color: "#fff",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  backdropFilter: "blur(8px)",
  // backgroundColor: "rgba(255, 255, 255, 0.1)",
  // border: "2px solid #E5E7EB",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  backgroundColor: drawerBackgroundColor,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backdropFilter: "blur(4px)",
  // backgroundColor: "rgba(255, 255, 255, 0.1)",
  //border: "2px solid #E5E7EB",
  flexShrink: 0,
  whiteSpace: "nowrap",

  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const [selectedPage, setSelectedPage] = useState(() => {
    const storedPage = localStorage.getItem("selectedPage");
    return storedPage ? storedPage : "addCategory";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const handleMenuClick = (page) => {
    setSelectedPage(page);
    navigate(page);
    setOpen(true);
  };

  const menuHandleToogle = () => {
    setOpen(!open);
  };
  const role = localStorage.getItem("role");
  console.log("Role from localStorage:", role); // Add this line to debug

  const menuItems = [
    {
      text: "Add Category",
      icon: <Category sx={{ color: "#fff" }} />,
      page: "/addcategory",
    },
    {
      text: "Add Food Item",
      icon: <Fastfood sx={{ color: "#fff" }} />,
      page: "/addfooditem",
    },
    {
      text: "Item Overview",
      icon: <ListAlt sx={{ color: "#fff" }} />,
      page: "/itemoverview",
    },
  ];

  if (role === "superadmin") {
    menuItems.push({
      text: "Admin Management",
      icon: <ManageAccountsIcon sx={{ color: "#fff" }} />,
      page: "/admindatapage",
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {open && (
            <div>
              <img src={Img1} alt="logo" className="w-20 h-16" />
            </div>
          )}

          <IconButton onClick={menuHandleToogle}>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#fff" }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backdropFilter:
                    location.pathname === item.page ? "blur(1000px)" : "none",
                  backgroundColor:
                    location.pathname === item.page
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  border:
                    location.pathname === item.page
                      ? "2px solid #E5E7EB"
                      : "none",
                  color: location.pathname === item.page ? "#000" : "#fff",
                }}
                onClick={() => handleMenuClick(item.page)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: location.pathname === item.page ? "#fff" : "#fff",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === item.page ? "#fff" : "#fff",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          // flexGrow: 1,
          // p: 0,
          // minHeight: "100vh",
          // backgroundImage: `url(${Bgimage})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",

          width: "100%",
          minHeight: "100vh",
        }}
      >
        <CommonHeader />

        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
