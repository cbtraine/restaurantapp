import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CategoryDropdown from "../Components/categoryDropdown";
import { fetchCartItems } from "../features/user/cartSlice";
import ItemsList from "../Components/itemlist";
import SearchBar from "../Components/searchbar";
import Bgimage from "../images/fire.jpg";
import { AppBar, Toolbar, IconButton, Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Img1 from "../images/ll.webp";

const HomePage = () => {
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    available: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleCartClick = () => {
    navigate("/cartpage");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        minHeight: "screen",
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Toolbar>
          <img src={Img1} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="home-page  w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
        <div className=" py-4 flex flex-row items-center justify-between w-full items-center ">
          <CategoryDropdown onChange={handleCategoryChange} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <ItemsList filters={filters} />
      </div>
    </div>
  );
};

export default HomePage;
