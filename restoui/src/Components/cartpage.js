import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  updateCartItem,
} from "../features/user/cartSlice";
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Bgimage from "../images/fire.jpg";
import Img1 from "../images/empty-cart-5521508-4610092.webp";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems, count } = cartState;

  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false); // Added for dialog state
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    console.log("Cart State:", cartState);
  }, [cartState]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    handleCloseDialog();
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStartShopping = () => {
    navigate("/homepage");
  };
  const handleBack = () => {
    navigate("/homepage");
  };

  const handleOpenDialog = (item) => {
    // Added to open dialog
    setItemToDelete(item); // Set the item to be deleted
    setOpenDialog(true); // Open the dialog
  };
  const handleCloseDialog = () => {
    // Added to close dialog
    setOpenDialog(false); // Close the dialog
    setItemToDelete(null); // Reset the item to be deleted
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
                  display: "flex",
                  alignItems: "center",
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
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
                  {item.quantity}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  sx={{
                    backgroundColor: "transparent",
                    backdropFilter: "blur(1px)",
                    color: "white",
                    minWidth: "30px",
                  }}
                  disabled={item.quantity === 1}
                >
                  -
                </Button>
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
        )}
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            {itemToDelete ? itemToDelete.name : ""} from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove(itemToDelete.id)}
            color="success"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartPage;
