import Navbar from "../components/Navbar";
import SessionTimeout from "../components/SessionTimeout";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <SessionTimeout />

      <div className="p-8">

        <h2 className="text-3xl font-bold text-slate-700">
          Sales Dashboard
        </h2>

        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">

          <h3 className="text-xl font-semibold text-slate-700">
            Welcome
          </h3>

          <p className="mt-3 text-gray-600">
            {user?.fullName}
          </p>

          <p className="text-gray-500">
            {user?.email}
          </p>

          <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {user?.role?.replace("ROLE_", "")}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;