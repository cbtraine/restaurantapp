import React, { useState, useRef } from "react";
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

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [type, setType] = useState("veg");
  const fileInputRef = useRef(null);

  const notifySuccess = () => {
    toast.success("Category added successfully", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("type", type);

    try {
      await axios.post("http://localhost:5000/api/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notifySuccess();
      // Clear form
      setName("");
      setImage(null);
      setImageName("");
      setType("veg");
    } catch (error) {
      console.error("Error adding category:", error);
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

    fileInputRef.current.value = "";
  };

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className=" ml-4 p-4 lg:p-8 bg-white shadow-lg rounded-lg space-y-4 w-full max-w-md backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200"
      >
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
        <Box
          sx={{ position: "relative", display: "flex", alignItems: "center" }}
        >
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
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        )}

        {imageName && (
          <Box>
            <Typography sx={{ color: "white" }}>{imageName}</Typography>
          </Box>
        )}

        <FormControl
          variant="outlined"
          fullWidth
          sx={{
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
            "& .MuiSelect-root": {
              color: "white",
            },
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
            sx={{
              "& .MuiSelect-select": {
                color: "white",
              },
            }}
          >
            <MenuItem value="veg">Veg</MenuItem>
            <MenuItem value="non-veg">Non-Veg</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2D3728",
            "&:hover": {
              backgroundColor: "#565e52",
            },
            color: "white",
          }}
          className="w-full  text-white py-2 rounded-lg  transition duration-200"
        >
          Add Category
        </Button>
      </Box>
    </Stack>
  );
};

export default AddCategory;
