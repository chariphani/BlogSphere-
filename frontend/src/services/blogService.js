import api from "./api";
export const getBlogs = async (params = {}) =>
  (await api.get("/blogs", { params })).data;
export const getBlog = async (id) => (await api.get(`/blogs/${id}`)).data;
export const createBlog = async (data) => (await api.post("/blogs", data)).data;
export const updateBlog = async (id, data) =>
  (await api.put(`/blogs/${id}`, data)).data;
export const deleteBlog = async (id) => (await api.delete(`/blogs/${id}`)).data;
export const toggleLike = async (id) =>
  (await api.post(`/blogs/${id}/like`)).data;
export const addComment = async (id, content) =>
  (await api.post(`/blogs/${id}/comments`, { content })).data;
export const deleteComment = async (id, commentId) =>
  (await api.delete(`/blogs/${id}/comments/${commentId}`)).data;
