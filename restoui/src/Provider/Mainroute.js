import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import SignUpPage from "../Components/SignUp";
import LoginPage from "../Components/Login";
import ForgotPasswordPage from "../Components/Forgotpassword";
import OTPVerificationPage from "../Components/Otpverification";
import PrivateRoute from "../Provider/Privateroute";
import AddFoodItem from "../Components/Addfooditem";
import ItemOverview from "../Components/Itemoverview";
import AddCategory from "../Components/Addcategory";
import Header from "../shared/Commonheader";
import AdminDataPage from "../Components/list";
import HomePage from "../Components/homepage";
import CartPage from "../Components/cartpage";

function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/itemoverview" element={<ItemOverview />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addfooditem" element={<AddFoodItem />} />
        </Route>

        <Route element={<PrivateRoute superadminOnly />}>
          <Route path="/admindatapage" element={<AdminDataPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute;
