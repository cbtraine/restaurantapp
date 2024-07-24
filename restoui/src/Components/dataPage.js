import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Button,
} from "@mui/material";

const DataPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: "",
    itemName: "",
    startDate: "",
    endDate: "",
  });

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reviews/reviews",
        {
          params: searchParams,
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={2}
            spacing={2}
          >
            <TextField
              label="Customer Name"
              name="name"
              value={searchParams.name}
              onChange={handleSearchChange}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
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
            />
            <TextField
              label="Item Name"
              name="itemName"
              value={searchParams.itemName}
              onChange={handleSearchChange}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
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
            />
            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              value={searchParams.startDate}
              onChange={handleSearchChange}
              InputLabelProps={{
                shrink: true,
                style: { color: "white" },
              }}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                  backdropFilter: "blur(20px)",
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
            />
            <TextField
              type="date"
              label="End Date"
              name="endDate"
              value={searchParams.endDate}
              onChange={handleSearchChange}
              InputLabelProps={{
                shrink: true,
                style: { color: "white" },
              }}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                  backdropFilter: "blur(20px)",
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
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Search
            </Button>
          </Stack>
        </form>

        <TableContainer
          component={Paper}
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "2px solid #E5E7EB",
            borderRadius: "8px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Customer Name</TableCell>
                <TableCell sx={{ color: "white" }}>Item Name</TableCell>
                <TableCell sx={{ color: "white" }}>Item Price</TableCell>
                <TableCell sx={{ color: "white" }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "white" }}>{review.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {review.item_name}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {review.item_price}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(review.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Stack>
  );
};

export default DataPage;
