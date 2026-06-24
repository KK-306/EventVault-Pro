import API from "../../api/axios";

export const getUsers = async () => {
  const response = await API.get("/users");

  return response.data;
};

export const createUserRequest = async (userData) => {
  const response = await API.post("/auth/register", userData);

  return response.data;
};

export const updateUserRequest = async (id, userData) => {
  const response = await API.put(`/users/${id}`, userData);

  return response.data;
};

export const deleteUserRequest = async (id) => {
  const response = await API.delete(`/users/${id}`);

  return response.data;
};

export const getPendingUsersRequest = async () => {
  const response = await API.get("/users/pending");
  return response.data;
};

export const approveUserRequest = async (id) => {
  const response = await API.patch(`/users/${id}/approve`);
  return response.data;
};

export const rejectUserRequest = async (id) => {
  const response = await API.patch(`/users/${id}/reject`);
  return response.data;
};

export const suspendUserRequest = async (id) => {
  const response = await API.patch(`/users/${id}/suspend`);
  return response.data;
};

export const reactivateUserRequest = async (id) => {
  const response = await API.patch(`/users/${id}/reactivate`);
  return response.data;
};
