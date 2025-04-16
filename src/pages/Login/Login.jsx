import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthStore } from "../../store";
import { toast } from "react-toastify"; 
export default function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { login, register, isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  // Login schema
  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .min(9, "Phone number is too short"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Register schema
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    phone: Yup.string()
      .required("Phone number is required")
      .min(9, "Phone number is too short"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Admin login schema (same as Login)
  const AdminLoginSchema = LoginSchema;

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      if (isAdmin()) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (values) => {
    let success = false;
    if (currentState === "Login") {
      success = await login(values.phone, values.password);
      if (success) {
        if (isAdmin()) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } else if (currentState === "Sign Up") {
      success = await register(values.name, values.phone, values.password);
      if (success) {
        navigate("/");
      }
    } else if (currentState === "Admin") {
      success = await login(values.phone, values.password);
      if (success && isAdmin()) {
        navigate("/admin");
      } else {
        alert("You don't have admin privileges");
      }
    }
  };

  return (
    <Formik
      initialValues={
        currentState === "Sign Up"
          ? { name: "", phone: "", password: "" }
          : { phone: "", password: "" }
      }
      validationSchema={
        currentState === "Sign Up"
          ? RegisterSchema
          : currentState === "Admin"
          ? AdminLoginSchema
          : LoginSchema
      }
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10 text-2xl font-semibold">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800 " />
          </div>
          {currentState === "Sign Up" && (
            <div className="w-full">
              <Field
                name="name"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-800"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
              )}
            </div>
          )}

          <div className="w-full">
            <Field
              name="phone"
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-800"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
            )}
          </div>

          <div className="w-full">
            <Field
              name="password"
              type="password"
              placeholder="password"
              className="w-full px-3 py-2 border border-gray-800"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
          </div>

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p
              onClick={() => toast.info("Coming soon!")}
              className="text-gray-400 cursor-not-allowed"
            >
              Forgot Password?
            </p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="text-gray-600 cursor-pointer"
              >
                Create Account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="text-gray-600 cursor-pointer"
              >
                Already have an account?
              </p>
            )}
          </div>
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            {currentState === "Login" && (
              <button
                type="button"
                onClick={() => setCurrentState("Admin")}
                className="bg-black text-white font-light px-8 py-2 mt-4"
              >
                Admin Login
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-black text-white font-light px-8 py-2 mt-4 ${
                currentState === "Login" ? "ml-auto" : ""
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : currentState === "Login"
                ? "Sign In"
                : "Sign Up"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
