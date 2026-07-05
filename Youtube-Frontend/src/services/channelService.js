import api from "./axios";

export const getChannel = (username) =>
  api.get(`/channel/${username}`);

export const createChannel = (username, channelData) =>
  api.post(`/channel/${username}`, channelData);

export const updateChannel = (username, channelData) =>
  api.patch(`/channel/${username}`, channelData);

export const deleteChannel = (id) =>
  api.delete(`/channel/${id}`);