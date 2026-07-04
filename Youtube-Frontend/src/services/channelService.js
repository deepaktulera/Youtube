import api from "./axios";

export const getChannel = (username) =>
  api.get(`/channel/${username}`);

export const createChannel = (username, channelData) =>
  api.post(`/channel/${username}`, channelData);

export const updateChannel = (id, channelData) =>
  api.patch(`/channel/${id}`, channelData);

export const deleteChannel = (id) =>
  api.delete(`/channel/${id}`);