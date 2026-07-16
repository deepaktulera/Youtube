import api from "./axios";

// Fetch all comments for a specific video
export const getComments = (videoId) =>
  // Send GET request to retrieve comments by video ID
  api.get(`/comments/${videoId}`);

// Add a new comment to a video
export const addComment = (videoId, text) =>
  // Send POST request with comment text
  api.post(`/comments/${videoId}`, { text });

// Update an existing comment
export const updateComment = (id, text) =>
  // Send PUT request with updated comment text
  api.put(`/comments/${id}`, { text });

// Delete a comment using comment ID
export const deleteComment = (id) =>
  // Send DELETE request to remove the comment
  api.delete(`/comments/${id}`);