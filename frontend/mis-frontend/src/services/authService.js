import api from "../utils/axiosConfig";

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const registerUser = (data) => {
    return api.post("/auth/register", data);
};
export const addUser = (data) => {

  const token = localStorage.getItem("token");

  return api.post(
    "/auth/add-user",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
export const getAllUsers = () => {
  return api.get("/users");
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const updateUserStatus = (id) => {
  return api.put(`/users/status/${id}`);
};