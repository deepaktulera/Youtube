import api from "./axios";

export const getChannel = (username) => api.get(`/channel/${username}`);
export const createChannel = (id) => api.post(`/channel/${id}`);
export const updateChannel = (id) => api.patch(`/channel/${id}`);
export const deleteChannel = (id) => api.delete(`/channel/${id}`);