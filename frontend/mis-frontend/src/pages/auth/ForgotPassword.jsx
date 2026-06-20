import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import api from "../../utils/axiosConfig";
import bg from "../../assets/bg.jpg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/forgot-password",
        { email }
      );

      setMessage(res.data.message);
      setError("");

    } catch (err) {

      setError(
        err.response?.data ||
        "Something went wrong"
      );

      setMessage("");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-900 p-10 text-white">

          <h4 className="uppercase tracking-[5px] text-sm">
            MANAGEMENT INFORMATION SYSTEM
          </h4>

          <h1 className="text-3xl font-bold mt-5 leading-tight">
            FORGOT
            <br />
            PASSWORD
          </h1>

          <p className="mt-6 text-base leading-7 opacity-90">
            Don't worry! Enter your registered email
            address and we'll send you a secure link
            to reset your password.
          </p>

        </div>

        {/* Right Panel */}

        <div className="p-8 flex flex-col justify-center">

          <div className="mb-6">

            <h6 className="text-3xl font-bold text-slate-800">
              Forgot Password
            </h6>

            <p className="text-gray-500 mt-2">
              Enter your email to receive a reset link
            </p>

          </div>

       {message && (
  <div className="mb-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded-xl font-medium">
    {message}
  </div>
)}

{error && (
  <div className="mb-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl font-medium">
    {error}
  </div>
)}

          <form onSubmit={submitHandler}>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>{ setEmail(e.target.value);
                setError("");
                setMessage("");}}
                required
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Send Reset Link
            </button>

          </form>

          <div className="mt-6 text-center">

            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Back To Login
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;