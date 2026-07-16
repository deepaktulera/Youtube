import api from "./axios";

// Fetch all videos from the server
export const getAllVideos = () =>
  // Send GET request to retrieve all videos
  api.get("/videos");

// Fetch a single video by its ID
export const getVideo = (id) =>
  // Send GET request to retrieve video details
  api.get(`/video/${id}`);

// Fetch all videos uploaded by a specific channel
export const getChannelVideos = (uploader) =>
  // Send GET request using uploader username
  api.get(`/videos/channel/${uploader}`);

// Like a video using its ID
export const likeVideo = (id) =>
  // Send PUT request to add a like
  api.put(`/video/${id}/like`);

// Dislike a video using its ID
export const dislikeVideo = (id) =>
  // Send PUT request to add a dislike
  api.put(`/video/${id}/dislike`);

// Increase the view count of a video
export const updateViews = (id) =>
  // Send PUT request to update video views
  api.put(`/video/${id}/views`);

// Upload a new video
export const uploadVideo = (data) =>
  // Send POST request with video details
  api.post("/video/upload", data);

// Delete a video using its ID
export const deleteVideo = (id) =>
  // Send DELETE request to remove the video
  api.delete(`/video/${id}`);

// Update existing video information
export const updateVideo = (id, data) =>
  // Send PATCH request with updated video data
  api.patch(`/video/${id}`, data);