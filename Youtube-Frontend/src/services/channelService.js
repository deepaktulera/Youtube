import api from "./axios";

// Fetch channel details using username
export const getChannel = (username) =>
  // Send GET request to retrieve channel information
  api.get(`/channel/${username}`);

// Create a new channel for a user
export const createChannel = (username, channelData) =>
  // Send POST request with channel details
  api.post(`/channel/${username}`, channelData);

// Update existing channel information
export const updateChannel = (username, channelData) =>
  // Send PATCH request with updated channel data
  api.patch(`/channel/${username}`, channelData);

// Delete a channel using channel ID
export const deleteChannel = (id) =>
  // Send DELETE request to remove the channel
  api.delete(`/channel/${id}`);