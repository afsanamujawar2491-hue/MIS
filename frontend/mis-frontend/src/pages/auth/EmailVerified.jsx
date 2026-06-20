import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import bg from "../../assets/bg.jpg";

function EmailVerified() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const token = searchParams.get("token");

    console.log("Token:", token);

    if (!token) {
      navigate("/verification-expired");
      return;
    }

    axios
      .get(`http://localhost:8080/api/auth/verify?token=${token}`)
      .then((res) => {
        const result = res.data;

        console.log("Response:", result);

        if (result === "verified" || result === "already_verified") {
          setStatus("success");

          // show success UI first, then redirect
          setTimeout(() => {
            navigate("/login");
          }, 3000);

        } else {
          navigate("/verification-expired");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        navigate("/verification-expired");
      });

  }, [navigate, searchParams]);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* LOADING STATE */}
        {status === "loading" && (
          <h2 className="text-xl font-semibold">Verifying...</h2>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-800">
              Email Verified
            </h1>

            <p className="mt-4 text-gray-600">
              Your email has been successfully verified.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login...
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default EmailVerified;