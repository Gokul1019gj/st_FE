import api from "./axiosClient";
export const register = (body) => api.post("/auth/register", body);
export const login    = (body) => api.post("/auth/login", body);
export const logoutUser = (refreshToken) => api.post("/auth/logout", { refreshToken });
