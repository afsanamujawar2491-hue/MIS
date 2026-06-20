import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import EmailVerified from "./pages/auth/EmailVerified";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VerificationExpired from "./pages/auth/VerificationExpired";
import AddUser from "./pages/Admin/AddUser";
import Home from "./pages/Home";




function App() {
    const token = localStorage.getItem("token");
    return (

        <BrowserRouter>

            <Routes>

                
                {/* Public Routes */}

            

                <Route
                  path="/"
                  element={token ? <Navigate to="/dashboard" /> : <Home />}
                />
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    path="/email-verified"
                    element={<EmailVerified />}
                />

                <Route
                  path="/verification-expired"
                  element={<VerificationExpired />}
                />
                {/* User Dashboard */}

             <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

              <Route
            path="/admin"
            element={
              <ProtectedRoute role="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
            />
                    <Route
          path="/add-user"
         element={
  <ProtectedRoute role="ROLE_ADMIN">
    <AddUser />
  </ProtectedRoute>
}
        />

            </Routes>

        </BrowserRouter>

    );
}

export default App;