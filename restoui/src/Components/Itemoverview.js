import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  Box,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Select,
  InputAdornment,
  MenuItem,
  TablePagination,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";

const ItemOverview = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [open, setOpen] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const fileInputRef = useRef(null);
  const notifySuccess = () => {
    toast.success("Update Item successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifySuccesses = () => {
    toast.success("Delete Item successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items", {
        params: {
          available: availabilityFilter !== "" ? availabilityFilter : undefined,
          search: searchQuery,
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setItems(response.data.items);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [availabilityFilter, searchQuery, page, rowsPerPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const WhiteTextSelect = styled(Select)(({ theme }) => ({
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiInputBase-input": {
      width: "9em",
      backdropFilter: "blur(20px)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
  }));
  const WhiteTextMenuItem = styled(MenuItem)(({ theme }) => ({}));

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/api/items/${id}`);
      if (resp.status === 200) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setConfirmDeleteOpen(false);
    notifySuccesses();
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editItem.name);
      formData.append("image", editItem.image);
      formData.append("price", editItem.price);
      formData.append("category_id", editItem.category_id);
      formData.append("type", editItem.type);

      await axios.put(
        `http://localhost:5000/api/items/${editItem.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      notifySuccess();
      fetchItems();
      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    try {
      const newAvailability = !currentAvailability;
      await axios.patch(`http://localhost:5000/api/items/${id}/availability`, {
        available: newAvailability,
      });
      fetchItems();
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFileChange = (e) => {
    setEditItem({ ...editItem, image: e.target.files[0] });
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageRemove = () => {
    setEditItem({ ...editItem, image: null });
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };
  const handleAvalibiltyChange = (event) => {
    setAvailabilityFilter(event.target.value);
    setPage(0);
  };

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <div>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pb={2}
        >
          <WhiteTextSelect
            value={availabilityFilter}
            onChange={handleAvalibiltyChange}
            displayEmpty
            variant="outlined"
          >
            <WhiteTextMenuItem value="">All</WhiteTextMenuItem>
            <WhiteTextMenuItem value="true">Available</WhiteTextMenuItem>
            <WhiteTextMenuItem value="false">Unavailable</WhiteTextMenuItem>
          </WhiteTextSelect>
          <TextField
            label="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
                width: "10em",
                backdropFilter: "blur(20px)",
              },

              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            variant="outlined"
          />
        </Stack>

        {items.length === 0 ? (
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
            <TableContainer
              component={Paper}
              style={{
                margin: "auto",
                width: 800,
                backdropFilter: "blur(20px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "2px solid #E5E7EB",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                    <TableCell sx={{ color: "white" }}>Price INR</TableCell>
                    <TableCell sx={{ color: "white" }}>Category</TableCell>
                    <TableCell sx={{ color: "white" }}>Type</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Available Status
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            color: "white",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.name}
                            style={{
                              marginRight: 10,
                              width: 60,
                              height: 60,
                            }}
                          />
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.price}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.category_name}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.category_type === "veg" ? "Veg" : "Non-Veg"}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          color={item.available ? "success" : "error"}
                          onClick={() =>
                            handleToggleAvailability(item.id, item.available)
                          }
                          startIcon={
                            item.available ? (
                              <CheckCircleIcon />
                            ) : (
                              <CancelIcon />
                            )
                          }
                        >
                          {item.available ? "AVAILABLE" : "UNAVAILABLE"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                sx={{ color: "white" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              backdropFilter: "blur(20px)",
              color: "white",
              border: "2px solid #E5E7EB",
            },
          }}
        >
          <DialogContent>
            <form
              onSubmit={handleUpdate}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <h1 className="text-xl font-bold">EDIT ITEMS</h1>
              <TextField
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                label="Name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                required
                variant="outlined"
                fullWidth
              />
              <Box sx={{ position: "relative" }}>
                <input
                  id="edit-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <TextField
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                  label="Image"
                  value={
                    editItem.image
                      ? typeof editItem.image === "string"
                        ? editItem.image
                        : editItem.image.name
                      : "Image Upload"
                  }
                  onClick={handleIconClick}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <CloudUploadIcon sx={{ color: "white" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>

              {editItem.image && typeof editItem.image !== "string" && (
                <Box display="flex" alignItems="center">
                  <img
                    src={URL.createObjectURL(editItem.image)}
                    alt="Item Preview"
                    style={{
                      width: "50px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                  <IconButton onClick={handleImageRemove}>
                    <CancelIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              )}

              <TextField
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                label="Price"
                type="number"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({ ...editItem, price: e.target.value })
                }
                required
                variant="outlined"
                fullWidth
              />

              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Update
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              backdropFilter: "blur(20px)",
              color: "white",
              border: "2px solid #E5E7EB",
            },
          }}
          open={confirmDeleteOpen}
          onClose={handleConfirmDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ color: "white" }} id="alert-dialog-title">
            {"Confirm Delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "white" }}
              id="alert-dialog-description"
            >
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleConfirmDeleteClose}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDelete(deleteItemId)}
              color="success"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Stack>
  );
};

export default ItemOverview;
