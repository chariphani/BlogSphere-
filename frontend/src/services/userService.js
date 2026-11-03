import api from "./api";
export const getUserProfile = async (id) =>
  (await api.get(`/users/${id}`)).data;
export const updateProfile = async (data) =>
  (await api.put("/users/me", data)).data;
export const getMyBlogs = async () => (await api.get("/users/me/blogs")).data;
