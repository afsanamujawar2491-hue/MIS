import {
  FaUsers,
  FaUserTie,
  FaPlus,
  FaTrash,
  FaToggleOn,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionTimeout from "../components/SessionTimeout";

import {
  getAllUsers,
  deleteUser,
  updateUserStatus,
} from "../services/authService";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [users,setUsers] = useState([]);

  const [search,setSearch] = useState("");

  const loadUsers = async () => {

    try{

      const res = await getAllUsers();

      setUsers(res.data);

    }catch(err){

      console.log(err);

    }
  };

  useEffect(()=>{

    loadUsers();

  },[]);

  const handleDelete = async(id)=>{

    if(!window.confirm(
      "Delete this user?"
    )) return;

    await deleteUser(id);

    loadUsers();
  };

  const handleStatus = async(id)=>{

    await updateUserStatus(id);

    loadUsers();
  };

  const salespersons =
    users.filter(
      u=>u.role==="ROLE_SALESPERSON"
    ).length;

  const filteredUsers =
    users.filter(user =>
      user.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <SessionTimeout />

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-slate-700">
            Admin Dashboard
          </h2>

          <button
            onClick={() =>
              navigate("/add-user")
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaPlus />
            Add User
          </button>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaUsers className="text-4xl text-blue-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Total Users
            </h3>

            <p className="text-4xl font-bold mt-3">
              {users.length}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaUserTie className="text-4xl text-green-600 mb-4" />

            <h3 className="text-xl font-semibold">
              Salespersons
            </h3>

            <p className="text-4xl font-bold mt-3">
              {salespersons}
            </p>

          </div>

        </div>

        {/* User Table */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between mb-5">

            <h3 className="text-2xl font-semibold">
              Users
            </h3>

            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={(e)=>
                setSearch(e.target.value)
              }
              className="border p-2 rounded-lg"
            />

          </div>

          <table className="w-full">

            <thead>

              <tr className="bg-slate-200">

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Role
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map(user => (

                <tr
                  key={user.userId}
                  className="border-b"
                >

                  <td className="p-3">
                    {user.fullName}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">
                    {user.role.replace(
                      "ROLE_",
                      ""
                    )}
                  </td>

                  <td
                    className={`p-3 font-semibold ${
                      user.status==="active"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>

                  <td className="p-3 flex gap-3">

                    <button
                      onClick={() =>
                        handleStatus(
                          user.userId
                        )
                      }
                      className="text-blue-600"
                    >
                      <FaToggleOn />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          user.userId
                        )
                      }
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;