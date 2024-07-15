import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Bgimage from "../images/b14.jpg";
import Img3 from "../images/img3.avif";
import axios from "axios";

const ForgotPasswordPage = () => {
  const initialValues = {
    email: "",
  };

  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgotpassword",
        values
      );
      setResetMessage(response.data.message);
      setError("");
      navigate("/verify-otp", { state: { email: values.email } });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
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
        <div className="w-full md:w-1/2 bg-cover">
          <img
            src={Img3}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Forgot Password
          </h2>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  {isSubmitting ? "Sending..." : "Send OTP"}
                </button>
              </Form>
            )}
          </Formik>
          {resetMessage && (
            <p className="text-green-500 mt-4">{resetMessage}</p>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex items-center justify-between mt-4">
            <Link to="/login" className="text-white hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
