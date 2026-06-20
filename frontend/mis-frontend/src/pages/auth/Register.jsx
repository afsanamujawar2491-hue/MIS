import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../../assets/bg.jpg";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "SALESPERSON",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.fullName.trim()) {
      return "Full Name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return "Enter a valid email";
    }

    const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;

if (!passwordPattern.test(form.password)) {
  setError("Password must include uppercase, lowercase, number, and special character");
  return;
}

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    setLoading(true);

    const response = await registerUser({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    const message = response.data;

    // Backend returns "Email already exists"
    if (message === "Email already exists") {
      setError(message);
      return;
    }

    setSuccess(
       "🎉 Registration successful! Please check your email to verify your account."
    );

    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "SALESPERSON",
    });

  } catch (err) {
    console.error("Registration Error:", err);

    if (err.response?.data) {
      setError(err.response.data);
    } else {
      setError("Registration failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
   <div
    className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
    style={{
        backgroundImage: `url(${bg})`
    }}
>
      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-[950px] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-900 px-10 py-8 text-white">

          <h4 className="uppercase tracking-[5px]">
            MANAGEMENT INFORMATION SYSTEM
          </h4>

          <h1 className="text-5xl font-bold mt-4">
            SIGN UP
          </h1>

         <p className="mt-5 text-base leading-7 opacity-90">
            Create your account and manage
            users securely through the MIS
            Portal.
          </p>

        </div>

        {/* Right Panel */}

        <div className="p-7">

          <h2 className="text-3xl font-bold text-center text-slate-800">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Register your MIS account
          </p>

          {error && (
            <div className="mt-5 bg-red-100 border border-red-300 text-red-700 rounded-lg p-3">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 bg-green-100 border border-green-300 text-green-700 rounded-lg p-3">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            <div className="relative">

              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border rounded-xl py-2.5 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full border rounded-xl py-2.5 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                value={form.password}
                placeholder="Password"
                onChange={handleChange}
                className="w-full border rounded-xl py-2.5 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full border rounded-xl py-2.5 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <FaUserShield className="absolute left-4 top-4 text-gray-400" />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-xl py-2.5 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ROLE_SALESPERSON">
                  Salesperson
                </option>

                <option value="ROLE_ADMIN">
                  Admin
                </option>

              </select>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="text-center mt-8">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-blue-600 font-semibold"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;