import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFF",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "2px solid #E5E7EB",
          color: "#FFF",
        },
      },
    },
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      // fontStyle: "italic",
    },
    h1: {
      color: "#FF0000",
    },
    h2: {
      color: "#FF0000",
    },
    h3: {
      color: "#FF0000",
    },
    h4: {
      color: "#FF0000",
    },
    h5: {
      color: "#FFF",
    },
    h6: {
      color: "#fff",
    },
    subtitle2: {
      color: "#FF0000",
    },
    caption: {
      color: "#FF0000",
    },
    overline: {
      color: "#FF0000",
    },
  },
});

export default lightTheme;
