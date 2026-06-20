import { useState, useEffect,useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import bg from "../../assets/bg.jpg";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  

  // 🔥 VALIDATE TOKEN ON PAGE LOAD
const redirected = useRef(false);

useEffect(() => {
  api
    .get(`/auth/validate-reset-token?token=${token}`)
    .then(() => {
      setStatus("valid");
    })
    .catch(() => {
      setStatus("invalid");

      if (redirected.current) return;
      redirected.current = true;

      setTimeout(() => {
        navigate("/forgot-password");
      }, 3000);
    });
}, [token, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage(res.data);
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${bg})` }}>

      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* 🔥 STATUS UI */}
        {status === "loading" && (
          <p className="text-gray-600 font-semibold">Checking link...</p>
        )}

        {status === "valid" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Reset Link Valid Please Enter New Password
            </h1>

            <form onSubmit={submitHandler} className="space-y-4">

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
                Update Password
              </button>
            </form>

            {message && (
              <p className="text-green-600 mt-3">{message}</p>
            )}

            {error && (
              <p className="text-red-600 mt-3">{error}</p>
            )}
          </>
        )}

       {status === "invalid" && (
  <div className="text-center">
    <h1 className="text-2xl font-bold text-red-600">
      Reset Link Expired or Invalid
    </h1>

    <p className="text-gray-500 mt-2">
      Redirecting to Forgot Password page...
    </p>
  </div>
)}

      </div>
    </div>
  );
}

export default ResetPassword;