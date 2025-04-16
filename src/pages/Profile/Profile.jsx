import React from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../store";

const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be more than 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .min(10, "Must be at least 10 digits")
    .max(15, "Must be less than 15 digits"),
});

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuthStore();
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(values);
    } catch (error) {
      toast.error(error.message || "Error during update", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Profile
      </h1>

      <Formik
        initialValues={{
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          phone: currentUser?.phone || "",
        }}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize 
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <FormField
              name="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />
            
            <FormField
              name="email"
              label="Email Address"
              type="email"
              placeholder="example@domain.com"
            />
            
            <FormField
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="05XXXXXXXX"
            />

            <button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center">
                  <Spinner /> Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function FormField({ name, label, type, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
}

// Spinner component for loading state
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}