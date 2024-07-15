import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { fetchCategories } from "../features/user/categorySlice";

const CategoryDropdown = ({ onChange }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    onChange(event);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        width: "17em",
        margin: "auto",
        backdropFilter: "blur(40px)",

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
      <InputLabel id="category-dropdown-label">Category</InputLabel>
      <Select
        labelId="category-dropdown-label"
        value={category}
        onChange={handleChange}
        label="Category"
        defaultValue=""
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
  );
};

export default CategoryDropdown;
