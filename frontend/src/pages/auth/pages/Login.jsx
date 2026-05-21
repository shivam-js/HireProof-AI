import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import {
  validateEmail,
  validatePassword,
} from "../utils/authValidation";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

    const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) return;

    try {
      setLoading(true);

      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to continue managing AI-powered hiring workflows."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            Forgot Password?
          </Link>
        </div>

                {errors.api && (
                  <p className="text-sm font-medium text-red-400">
                    {errors.api}
                  </p>
                )}

        <AuthButton text={loading ? "Logging in..." : "Login to HireProof AI"} />

        <div className="text-center">
          <p className="text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;