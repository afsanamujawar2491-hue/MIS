import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import AuthLeftPanel from "../../components/AuthLeftPanel";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.email || !form.password) {
    setError("Email and Password are required.");
    return;
  }

  try {
    setLoading(true);

    const response = await loginUser(form);
    const data = response.data;

    // ❗ CHECK SUCCESS FIRST
    if (!data.token) {
      setError(data.message || "Login failed");
      return;
    }

    console.log("Response data...."+JSON.stringify(response.data));
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("user", JSON.stringify(data));

    if (data.role === "ROLE_ADMIN") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    const message =
      err.response?.data?.message ||
      "Invalid Email or Password";

    setError(message);

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
    
          <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">


        {/* Left Panel */}

     

          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-900 p-12 text-white">

          <h4 className="uppercase tracking-[5px]">
            MANAGEMENT INFORMATION SYSTEM
          </h4>

          <h1 className="text-3xl font-bold mt-5">
           LOGIN
          </h1>

          <p className="mt-8 text-lg leading-8 opacity-90">
            Welcome back! Login securely to access your Management Information System dashboard.
          </p>

        </div>

        {/* Right Panel */}

        <div className="p-10">

          <div className="mb-8">

            <h2 className="text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue
            </p>

          </div>

          {error && (
            <div className="mb-5 bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center">

                <input
                  type="checkbox"
                  className="mr-2"
                />

                Remember Me

              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="mt-8 text-center text-gray-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-700 font-semibold hover:underline"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;