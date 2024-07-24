import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../features/user/cartSlice";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField,
  Rating,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Bgimage from "../images/b13.jpg";
import Img1 from "../images/empty-cart-5521508-4610092.webp";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: "",
    comment: "",
    rating: 2,
    items: [],
    cartId: "",
  });
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    handleCloseDialog();
  };

  const handleStartShopping = () => {
    navigate("/homepage");
  };

  const handleBack = () => {
    navigate("/homepage");
  };

  const handleOpenDialog = (item) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleBuy = () => {
    if (cartItems.length > 0) {
      setReviewData({
        ...reviewData,
        items: cartItems.map((item) => ({
          itemName: item.name,
          itemPrice: item.price,
          cartQuantity: item.quantity,
        })),
        cartId: cartItems[0].id,
      });
      setOpenReviewDialog(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseReviewDialog = () => setOpenReviewDialog(false);

  const handleReviewSubmit = async () => {
    if (reviewData.name.trim() === "") {
      setNameError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const result = await response.json();
      if (response.ok) {
        setOpenSnackbar(true);
        handleCloseReviewDialog();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (!cartItems) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="cart-page px-2 py-2 sm:px-10 sm:py-10"
    >
      <Card
        sx={{
          maxWidth: "100%",
          width: { xs: "100%", md: "900px" },
          margin: "auto",
          mt: 4,
          p: 3,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "2px solid #E5E7EB",
        }}
      >
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Your Cart
        </Typography>
        <Typography>Order Summary</Typography>
        <Divider sx={{ mb: 2 }} />
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CardMedia
              component="img"
              alt="Empty Cart"
              image={Img1}
              sx={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                margin: "auto",
              }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "GRAY",
                backdropFilter: "blur(20px)",
                color: "white",
              }}
              onClick={handleStartShopping}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                mb: 2,
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                alt={item.name}
                image={`http://localhost:5000/uploads/${item.image}`}
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "10px",
                  mr: { sm: 2 },
                  mb: { xs: 2, sm: 0 },
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{item.price} Rs</Typography>
              </Box>
              <Box
                sx={{
                  paddingX: "20px",
                  textAlign: "center",
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1">
                  Total: {item.price * item.quantity} Rs
                </Typography>
              </Box>
              <Button
                onClick={() => handleOpenDialog(item)}
                sx={{ color: "red", ml: 2, mt: { xs: 2, sm: 0 } }}
              >
                <Delete />
              </Button>
            </Box>
          ))
        )}
        {cartItems.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="h6">
              Total:{" "}
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}{" "}
              Rs
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="success"
                sx={{
                  backgroundColor: "#4CAF50",
                  ":hover": { backgroundColor: "#45a049" },
                  marginRight: "8px",
                }}
                onClick={handleBuy}
              >
                Buy Now
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(1px)",
                  color: "white",
                }}
                onClick={handleBack}
              >
                Back
              </Button>
            </Box>
          </Box>
        )}
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            {itemToDelete ? itemToDelete.name : ""} from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleRemove(itemToDelete.id)}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle>Submit Your Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={reviewData.name}
            onChange={(e) => {
              setReviewData({ ...reviewData, name: e.target.value });
              setNameError(false);
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
          />
          <TextField
            margin="dense"
            label="Comment"
            fullWidth
            variant="standard"
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
          />
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={reviewData.rating}
              onChange={(e, newValue) =>
                setReviewData({ ...reviewData, rating: newValue })
              }
              max={5}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseReviewDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleReviewSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Item placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartPage;
