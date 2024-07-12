import React, { useCallback, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Stack,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminList = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const notifySuccess = () => {
    toast.success("Admin deleted successfully", {
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

  const fetchAdminList = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        params: {
          search: searchQuery,
          filter:
            availabilityFilter === "true"
              ? "active"
              : availabilityFilter === "false"
              ? "inactive"
              : "",
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setItems(response.data.items);
      setTotalCount(response.data.totalPages * rowsPerPage);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [searchQuery, availabilityFilter, page, rowsPerPage]);

  useEffect(() => {
    fetchAdminList();
  }, [fetchAdminList]);

  const toggleStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/toggle/${id}`
      );
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, is_active: response.data.is_active }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setConfirmDeleteOpen(false);
    notifySuccess();
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page to 0 when searching
  };
  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
    setPage(0); // Reset page to 0 when searching
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
          <Select
            value={availabilityFilter}
            onChange={handleAvailabilityChange}
            displayEmpty
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                width: "9em",
                color: "white",
              },
            }}
          >
            <MenuItem value="" sx={{ color: "white" }}>
              All
            </MenuItem>
            <MenuItem value="true" sx={{ color: "white" }}>
              Active
            </MenuItem>
            <MenuItem value="false" sx={{ color: "white" }}>
              Inactive
            </MenuItem>
          </Select>
          <TextField
            label="Search by username"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
                width: "10em",
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
              No Users Found
            </h1>
          </Stack>
        ) : (
          <>
            <TableContainer
              component={Paper}
              style={{
                margin: "auto",
                width: 800,
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "2px solid #E5E7EB",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>ID</TableCell>
                    <TableCell sx={{ color: "white" }}>Username</TableCell>
                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                    <TableCell sx={{ color: "white" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ color: "white" }}>{item.id}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.username}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.email}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {item.is_active === 0 ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => toggleStatus(item.id)}
                          >
                            Inactive
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => toggleStatus(item.id)}
                          >
                            Active
                          </Button>
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <DeleteIcon />
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
                  Are you sure you want to delete this User?
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
          </>
        )}
      </div>
    </Stack>
  );
};

export default AdminList;
