import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Bgimage from "../images/fire.jpg";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Img3 from "../images/img3.avif";
import axios from "axios";

const OTPVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  const [verificationMessage, setVerificationMessage] = useState("");
  const [error, setError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleOTPVerification = async (otp) => {
    try {
      const response = await axios.post("http://localhost:5000/api/verifyotp", {
        email,
        otp,
      });
      if (response.data.success) {
        setOtpVerified(true);
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resetpassword",
        { email, otp: values.otp, newPassword: values.newPassword }
      );
      setVerificationMessage(response.data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-200"
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-500">
        <div className="w-full md:w-1/2 bg-cover ">
          <img
            src={Img3}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 ">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Verify OTP and Reset Password
          </h2>
          {!otpVerified ? (
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={Yup.object().shape({
                otp: Yup.string().required("OTP is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleOTPVerification(values.otp);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4 ">
                    <label className="block text-white">OTP</label>
                    <Field
                      type="text"
                      name="otp"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-white">New Password</label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmNewPassword"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                  </button>
                  {verificationMessage && (
                    <p className="text-green-500 mt-4">{verificationMessage}</p>
                  )}
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
