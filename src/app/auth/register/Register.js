"use client"; // Mark this file as a client component
import { useState } from "react";
import FormInput from "@/app/components/FormInput";

export default function Register({ onCreateRecord }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    userExists: false,
  });

  const validateForm = (data) => {
    let isValid = true;
    let errors = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    // Validate name
    if (!data.name || data.name.trim().length < 2) {
      errors.name = true;
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = true;
      isValid = false;
    }

    if (!data.password || data.password.length < 6) {
      errors.password = true;
      isValid = false;
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = true;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const isValid = validateForm(data);
    if (isValid) {
      const error = await onCreateRecord(data);
      if (error) {
        setFormErrors({ ...formErrors, userExists: true });
      }
    }
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold">
        Sign up for a QuizLy account
      </h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          isValid={!formErrors.name}
          errorMsg="ⓘ Please enter a valid name"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          isValid={!formErrors.email}
          errorMsg="ⓘ Please enter a valid email"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          isValid={!formErrors.password}
          errorMsg="ⓘ Password must be at least 6 characters"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          isValid={!formErrors.confirmPassword}
          errorMsg="ⓘ Passwords do not match"
        />
        <FormInput
          name="userExists"
          type="hidden"
          isValid={!formErrors.userExists}
          errorMsg="ⓘ A user with this email already exists"
        />
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
