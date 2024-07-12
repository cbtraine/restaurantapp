import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      type="text"
      label="Search items..."
      variant="outlined"
      onChange={handleSearch}
      sx={{
        width: "17em",
        margin: "auto",
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
  );
};

export default SearchBar;
