import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { registerUser } from "../../../services/authServices";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/authValidation";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      fullName: validateRequired(formData.fullName, "Full name"),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error
    );

    if (hasErrors) return;

    try {
      const response = await registerUser(formData);

      alert("Registration successful! Please login.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      console.log(response);
    } catch (error) {
      setErrors({
        api:
          error?.response?.data?.message ||
          "Registration failed. Try again.",
      });
    }
  };

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Start verifying candidates and managing hiring workflows with HireProof AI."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {errors.api && (
          <p className="text-sm text-red-400 text-center">
            {errors.api}
          </p>
        )}

        <AuthButton
          text={loading ? "Creating Account..." : "Create Account"}
        />

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Register;