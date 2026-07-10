import api from "./axios";

export const getComments = (videoId) =>
    api.get(`/comments/${videoId}`);

export const addComment = (videoId, text) =>
    api.post(`/comments/${videoId}`, { text });

export const updateComment = (id, text) =>
    api.put(`/comments/${id}`, { text });

export const deleteComment = (id) =>
    api.delete(`/comments/${id}`);