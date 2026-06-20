import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import bg from "../assets/bg.jpg";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/65"></div>

      {/* Navbar */}

      <nav className="relative z-20 flex justify-between items-center px-12 py-6">

        <h1 className="text-3xl font-bold text-white">
          MIS Portal
        </h1>

        <div className="space-x-4">

          <Link to="/login">
            <button className="text-white hover:text-cyan-300">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
              Register
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <div className="relative z-20 flex items-center justify-center h-[85vh]">

        <div className="text-center text-white">

          <h1 className="text-6xl font-bold">
            Management
          </h1>

          <h1 className="text-6xl font-bold mt-2">
            Information System
          </h1>

          <p className="mt-6 text-xl text-gray-300">

            Smart solution for User Management,
            Authentication and Business Reports.

          </p>

          <div className="mt-10">

            <Link to="/register">

              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto transition">

                Get Started

                <FaArrowRight/>

              </button>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;