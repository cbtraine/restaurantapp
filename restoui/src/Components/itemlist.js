import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/user/itemSlice";
import {
  updateCartItem,
  addToCart as addToCartAction,
} from "../features/user/cartSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Pagination,
  Grid,
  TextField,
} from "@mui/material";

const ItemsList = ({ filters }) => {
  const dispatch = useDispatch();
  const { items, count } = useSelector((state) => state.items);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(
      fetchItems({
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, filters, currentPage]);

  const handleAddToCart = (item_id, quantity) => {
    dispatch(addToCartAction({ item_id, quantity }));
    setAddedItems((prev) => ({
      ...prev,
      [item_id]: true,
    }));

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [item_id]: false,
      }));
    }, 2000);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedQuantities = { ...quantities, [id]: newQuantity };
    setQuantities(updatedQuantities);
    dispatch(updateCartItem({ id, quantity: newQuantity }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="items-list">
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search items"
          variant="outlined"
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            width: "17em",
            "& .MuiInputBase-input": {
              backdropFilter: "blur(40px)",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "white",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
      </Box>
      {filteredItems.length === 0 ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignContent={"center"}
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "2px solid #E5E7EB",
            padding: "40px",
            width: 800,
            height: 400,
            borderRadius: "8px",
            margin: "auto",
          }}
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            No Items Found
          </h1>
        </Stack>
      ) : (
        <>
          <Grid container spacing={2}>
            {filteredItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={
                  filteredItems.length === 1
                    ? 12
                    : filteredItems.length === 2
                    ? 6
                    : 4
                }
                key={item.id}
              >
                <Card
                  sx={{
                    maxWidth: 250,
                    height: "100%",
                    backdropFilter: "blur(20px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid #E5E7EB",
                    color: "white",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.name}
                    image={`http://localhost:5000/uploads/${item.image}`}
                    sx={{ borderRadius: "10px", height: "150px" }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2">{item.price} Rs</Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      pb: 0,
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "gray",
                        },
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "white",
                        },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", pb: 2, m: "auto" }}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            (quantities[item.id] || 1) + 1
                          )
                        }
                        sx={{
                          backgroundColor: "transparent",
                          backdropFilter: "blur(1px)",
                          color: "white",
                          minWidth: "30px",
                        }}
                      >
                        +
                      </Button>
                      <Typography
                        variant="body1"
                        sx={{ mx: 2, display: "flex", alignItems: "center" }}
                      >
                        {quantities[item.id] || 1}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max((quantities[item.id] || 1) - 1, 1)
                          )
                        }
                        sx={{
                          backgroundColor: "transparent",
                          backdropFilter: "blur(1px)",
                          color: "white",
                          minWidth: "30px",
                        }}
                        disabled={quantities[item.id] <= 0}
                      >
                        -
                      </Button>
                    </Box>
                    <Button
                      variant="standard"
                      onClick={() =>
                        handleAddToCart(item.id, quantities[item.id] || 1)
                      }
                      sx={{
                        backdropFilter: "blur(1px)",
                        backgroundColor: addedItems[item.id]
                          ? "green"
                          : "transparent",
                        color: addedItems[item.id] ? "white" : "white",
                        minWidth: "80px",
                      }}
                    >
                      {addedItems[item.id] ? "Added" : "Add to Cart"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            "& .MuiPaginationItem-root": {
              color: "white",
              backgroundColor: "black",
            },
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default ItemsList;
