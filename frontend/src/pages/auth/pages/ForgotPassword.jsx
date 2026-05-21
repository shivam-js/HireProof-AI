import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { validateEmail } from "../utils/authValidation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    setError(emailError);

    if (emailError) return;

    console.log("Forgot password form valid:", email);
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email address and we’ll prepare password recovery for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={handleChange}
          error={error}
        />

        <AuthButton text="Continue" />

        <p className="text-center text-sm text-slate-400">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;