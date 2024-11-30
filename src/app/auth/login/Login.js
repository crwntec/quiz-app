"use client";
import { useState } from "react";
import FormInput from "@/app/components/FormInput";
import { useRouter } from "next/navigation";

export default function Login({ onLogin }) {
  const [formErrors, setFormErrors] = useState({
    invalidCredentials: false,
    serverError: false,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Reset errors before attempting login
    setFormErrors({
      invalidCredentials: false,
      serverError: false,
    });

    setLoading(true);
    try {
      const {redirectURL, error} = await onLogin(data);
      console.log(redirectURL, error);
      if (error === "invalidCredentials") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          invalidCredentials: true,
        }));
      } else if (error === "serverError") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          serverError: true,
        }));
      }
      if (redirectURL) {
        window.location.href = redirectURL;
      }
    } catch (err) {
      console.error("Login error:", err);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        serverError: true,
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold">
        Login to your QuizLy account
      </h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          isValid={!formErrors.invalidCredentials}
          errorMsg={"ⓘ Incorrect email or password"}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          isValid={!formErrors.invalidCredentials && !formErrors.serverError}
        />
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-lg bg-primary-content"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
        {formErrors.serverError && (
          <p className="mt-4 label-text-alt text-center text-sm text-red-500">
            ⓘ Something went wrong please try again later
          </p>
        )}
        <div className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/auth/register" className="underline text-primary font-bold">
            Create one
          </a>
        </div>
      </form>
    </div>
  );
}
