import { useState } from "react";
import { addUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddUser() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_SALESPERSON",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });

  // 🔥 clear error when user starts typing
  if (error) {
    setError("");
  }
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
    return "Please enter a valid email address";
  }

  if (!form.password) {
    return "Password is required";
  }


  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(form.password)) {
    return (
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    );
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

  setLoading(true);

  try {
    const res = await addUser(form);

    setSuccess(res.data);

    setForm({
      fullName: "",
      email: "",
      password: "",
      role: "ROLE_SALESPERSON",
    });

    setTimeout(() => {
      navigate("/admin");
    }, 1000);

  } catch (err) {
    setError(err.response?.data || "Failed to add user");
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6 relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-blue-950/60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold text-center text-slate-800">
          Add User
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Create a new user account
        </p>

        {/* Success */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-semibold"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ROLE_SALESPERSON">Salesperson</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

      <div className="flex gap-3">

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
  >
    {loading ? "Adding..." : "Add User"}
  </button>

  <button
    type="button"
    onClick={() => navigate("/admin")}
    className="w-full bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
  >
    Cancel
  </button>

</div>

        </form>

      </div>
    </div>
  );
}

export default AddUser;