import { FaShieldAlt, FaChartLine, FaUsers } from "react-icons/fa";

function AuthLeftPanel() {
    return (
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12">

            <h1 className="text-5xl font-bold">
                MIS Portal
            </h1>

            <p className="mt-5 text-lg opacity-90">
                Management Information System
            </p>

            <div className="mt-12 space-y-6">

                <div className="flex items-center gap-4">
                    <FaShieldAlt size={22} />
                    <span>Secure Authentication</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaUsers size={22} />
                    <span>User Management</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaChartLine size={22} />
                    <span>Reports & Analytics</span>
                </div>

            </div>

            <p className="mt-14 text-blue-100 italic">
                "Manage your organization smarter."
            </p>

        </div>
    );
}

export default AuthLeftPanel;