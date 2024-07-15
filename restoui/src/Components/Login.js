import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Bgimage from "../images/b14.jpg";
import Img1 from "../images/b21.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeUserDetails } from "../features/user/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function LoginPage() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const notifySuccess = () => {
    toast.success("Login Successfully", {
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

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        values
      );
      notifySuccess();
      resetForm();
      console.log("login api resp ==>", response.data.user);

      dispatch(storeUserDetails(response.data.user));

      localStorage.setItem("userdetails", JSON.stringify(response.data.user));
      localStorage.setItem("role", response.data.user.role); // Set role in localStorage
      navigate("/itemoverview");

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setFieldError("password", "Incorrect password");
        const notifySuccess = () => {
          toast.error(
            "Please contact the Superadmin to request access for login.",
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
        notifySuccess();
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
      className="min-h-screen flex items-center justify-center bg-gray-200 relative"
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
        <div className="w-full md:w-1/2 p-8  ">
          <h2 className="text-2xl text-white font-semibold mb-4">Chef</h2>
          <h3 className="text-xl text-white mb-4">Login To Your Account</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-white">Email</label>
                  <Field
                    type="email"
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
                  <label className="block text-white">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
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
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to="/forgotpassword"
                    className="text-white hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  {isSubmitting ? "Logging In..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex items-center justify-between mt-4">
            <Link to="/signup" className="text-white hover:underline">
              Or Create An Account Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
