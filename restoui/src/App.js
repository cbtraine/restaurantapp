import React from "react";
import MainRoute from "./Provider/Mainroute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log("App");

  return (
    <>
      <ToastContainer />
      <MainRoute />
    </>
  );
}

export default App;
