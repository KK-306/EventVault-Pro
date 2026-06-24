import API from "../../api/axios";

export const getEvents = async (params = {}) => {
  const response = await API.get("/events", {
    params,
  });

  return response.data;
};

export const getEventById = async (id) => {
  const response = await API.get(`/events/${id}`);

  return response.data;
};

export const createEventRequest = async (eventData) => {
  const response = await API.post("/events/create", eventData);

  return response.data;
};

export const updateEventRequest = async (id, eventData) => {
  const response = await API.put(`/events/${id}`, eventData);

  return response.data;
};

export const deleteEventRequest = async (id) => {
  const response = await API.delete(`/events/${id}`);

  return response.data;
};

export const approveEventRequest = async (id) => {
  const response = await API.patch(`/events/${id}/approve`);

  return response.data;
};

export const rejectEventRequest = async (id) => {
  const response = await API.put(`/events/${id}`, {
    status: "rejected",
  });

  return response.data;
};

export const uploadEventImageRequest = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await API.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
