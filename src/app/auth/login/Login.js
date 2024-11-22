"use client";
import { useState } from "react";
import FormInput from "@/app/components/FormInput";
export default function Login({ onLogin }) {
  const [formErrors, setFormErrors] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    onLogin(data).then((result) => {
      setFormErrors(!result);
      if (result) {
        window.location.href = result;
      }
    });
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold">
        Login to your QuizLy account
      </h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" name="email" type="email" isValid={true} />
        <FormInput
          label="Password"
          name="password"
          type="password"
          isValid={!formErrors}
          errorMsg="ⓘ Email or password is wrong"
        />
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="underline text-primary font-bold"
          >Create one</a>
        </div>
      </form>
    </div>
  );
}
