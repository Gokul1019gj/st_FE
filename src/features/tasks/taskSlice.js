import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/taskApi";
import { toast } from "react-toastify";

// Query params: { page, limit, status, priority, search }
export const fetchTasks = createAsyncThunk("tasks/fetch", async (params) => {
  const { data } = await api.getTasks(params);
  return { rows: data.data, meta: data.meta || { total: data.data.length, page:1, pages:1, limit:10 } };
});

export const fetchTaskById = createAsyncThunk("tasks/getById", async (id) => {
  const { data } = await api.getTask(id);
  return data.data;
});

export const createTask = createAsyncThunk("tasks/create", async (payload) => {
  const { data } = await api.createTask(payload);
  toast.success("Task created");
  return data.data;
});

export const updateTaskFull = createAsyncThunk("tasks/update", async ({ id, payload }) => {
  const { data } = await api.updateTask(id, payload);
  toast.success("Task updated");
  return data.data;
});

export const removeTask = createAsyncThunk("tasks/delete", async (id) => {
  await api.deleteTask(id);
  toast.info("Task deleted");
  return id;
});

export const setStatus = createAsyncThunk("tasks/setStatus", async ({ id, status }) => {
  const { data } = await api.patchStatus(id, status);
  return data.data;
});

export const getStats = createAsyncThunk("tasks/stats", async () => {
  const { data } = await api.getStats();
  return data.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    selected: null,
    stats: { pending:0, inProgress:0, completed:0 },
    loading: false,
    meta: { total:0, page:1, pages:1, limit:10 },
    filters: { page:1, limit:10, status:"", priority:"", search:"" }
  },
  reducers: {
    setFilters: (s, { payload }) => { s.filters = { ...s.filters, ...payload }; },
    resetFilters: (s) => { s.filters = { page:1, limit:10, status:"", priority:"", search:"" }; },
  },
  extraReducers: (b) => {
    b.addCase(fetchTasks.pending, (s)=>{s.loading=true;})
     .addCase(fetchTasks.fulfilled, (s,{payload})=>{s.loading=false; s.list=payload.rows; s.meta=payload.meta;})
     .addCase(fetchTasks.rejected, (s)=>{s.loading=false;})
     .addCase(createTask.fulfilled, (s,{payload})=>{s.list.unshift(payload);})
     .addCase(updateTaskFull.fulfilled, (s,{payload})=>{
        const i = s.list.findIndex(t=>t.id===payload.id);
        if(i>-1) s.list[i]=payload;
        if (s.selected?.id===payload.id) s.selected = payload;
     })
     .addCase(removeTask.fulfilled, (s,{payload:id})=>{
        s.list = s.list.filter(t=>t.id!==id);
        if (s.selected?.id===id) s.selected=null;
     })
     .addCase(setStatus.fulfilled, (s,{payload})=>{
        const i = s.list.findIndex(t=>t.id===payload.id);
        if(i>-1) s.list[i]=payload;
        if (s.selected?.id===payload.id) s.selected = payload;
     })
     .addCase(fetchTaskById.fulfilled, (s,{payload})=>{ s.selected = payload; })
     .addCase(getStats.fulfilled, (s,{payload})=>{ s.stats = payload; });
  }
});

export const { setFilters, resetFilters } = taskSlice.actions;
export default taskSlice.reducer;
