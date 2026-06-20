import { Link } from "react-router-dom";
import bg from "../../assets/bg.jpg";

function VerificationExpired() {
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute inset-0 bg-blue-950/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-4xl text-red-600">✕</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Verification Link Invalid
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          This verification link has already been used
          or has expired.
        </p>

        <Link
          to="/login"
          className="mt-8 inline-block w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Back To Login
        </Link>

      </div>
    </div>
  );
}

export default VerificationExpired;