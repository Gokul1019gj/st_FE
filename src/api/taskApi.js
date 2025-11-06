import api from "./axiosClient";
export const createTask   = (payload) => api.post("/tasks", payload);

export const getTasks = (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );
  return api.get("/tasks", { params: cleanParams });
};




export const getTask      = (id)     => api.get(`/tasks/${id}`);
export const updateTask   = (id,p)   => api.put(`/tasks/${id}`, p);
export const patchStatus  = (id,s)   => api.patch(`/tasks/${id}/status`, { status: s });
export const deleteTask   = (id)     => api.delete(`/tasks/${id}`);
export const getStats     = ()       => api.get("/tasks/stats");
export const searchTasks  = (q,p,l)  => api.get(`/tasks/search?q=${encodeURIComponent(q)}&page=${p}&limit=${l}`);
