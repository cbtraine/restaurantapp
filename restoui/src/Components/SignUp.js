import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Bgimage from "../images/b14.jpg";
import Img1 from "../images/b23.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import axios from "axios";

function SignUpPage() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const notifySuccess = () => {
    toast.success(
      "Congratulations! Your registration was successful. Please reach out to the Superadmin to obtain login permission",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    phoneNumber: Yup.string(),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        values
      );
      notifySuccess();
      resetForm();
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFieldError("username", "Username already exists");
        setFieldError("email", "Email already exists");
      } else {
        console.error("Error logging in:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-200 "
      style={{
        backgroundImage: `url(${Bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-500">
        <div className="w-full md:w-1/2 bg-cover">
          <img src={Img1} alt="Dish" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl text-white font-bold mb-4">Chef</h2>
          <h3 className="text-xl text-white mb-4">Create Your Account</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-white" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
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
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2D3728] text-white py-2 rounded-lg hover:bg-[#565e52] transition duration-200"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center justify-between mt-4">
            <Link to="/login" className="text-white hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
