import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-toastify/dist/ReactToastify.css";

const AddFoodItem = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [price, setPrice] = useState("");
  const fileInputRef = useRef(null);

  const notifySuccess = () => {
    toast.success("Food item added successfully", {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("category_id", category);

    try {
      await axios.post("http://localhost:5000/api/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notifySuccess();
      // Clear form
      setCategory("");
      setName("");
      setImage(null);
      setImageName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageRemove = () => {
    setImage(null);
    setImageName("");
    // Clear file input (optional, for better UX)
    fileInputRef.current.value = "";
  };
  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="ml-4  p-4 lg:p-8 bg-white shadow-lg rounded-lg space-y-4 w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200"
      >
        <FormControl
          variant="outlined"
          fullWidth
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
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            required
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          fullWidth
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
        <Box sx={{ position: "relative" }}>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <TextField
            label="Image"
            value={imageName ? imageName : "Image Upload"}
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
            variant="outlined"
            fullWidth
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
        </Box>

        {image && (
          <Box display="flex" alignItems="center">
            <img
              src={URL.createObjectURL(image)}
              alt="Item Preview"
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
            <IconButton onClick={handleImageRemove}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {imageName && (
          <Box>
            <Typography>{imageName}</Typography>
          </Box>
        )}
        <TextField
          label="Price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          variant="outlined"
          fullWidth
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2d3748",
            "&:hover": {
              backgroundColor: "#4a5568",
            },
            color: "white",
          }}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Add Food Item
        </Button>
      </Box>
    </Stack>
  );
};

export default AddFoodItem;
