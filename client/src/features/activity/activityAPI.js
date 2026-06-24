import API from "../../api/axios";

export const getActivityLogs = async () => {
  const response = await API.get("/activity");

  return response.data;
};
