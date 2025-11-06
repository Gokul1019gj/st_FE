import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/taskApi";
import { toast } from "react-toastify";

/* ----------------------------------------
   FETCH ALL TASKS (with filters & pagination)
---------------------------------------- */
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await api.getTasks(params);
      return {
        list: data.data || [],
        meta: data.meta || {
          total: data.data?.length || 0,
          page: 1,
          pages: 1,
          limit: 10,
        },
      };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch tasks");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   FETCH SINGLE TASK
---------------------------------------- */
export const fetchTaskById = createAsyncThunk(
  "tasks/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.getTask(id);
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load task");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   CREATE TASK
---------------------------------------- */
export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.createTask(payload);
      toast.success(" Task created successfully!");
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Task creation failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   UPDATE TASK (Full)
---------------------------------------- */
export const updateTaskFull = createAsyncThunk(
  "tasks/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.updateTask(id, payload);
      toast.success(" Task updated");
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   DELETE TASK
---------------------------------------- */
export const removeTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteTask(id);
      toast.info(" Task deleted");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   UPDATE STATUS (PATCH)
---------------------------------------- */
export const setStatus = createAsyncThunk(
  "tasks/setStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patchStatus(id, status);
      toast.success(`Status updated to ${status}`);
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   FETCH STATS
---------------------------------------- */
export const getStats = createAsyncThunk(
  "tasks/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.getStats();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------------------------
   SLICE
---------------------------------------- */
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    selected: null,
    stats: { pending: 0, inProgress: 0, completed: 0 },
    loading: false,
    meta: { total: 0, page: 1, pages: 1, limit: 10 },
    filters: { page: 1, limit: 10, status: "", priority: "", search: "" },
  },

  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = { ...state.filters, ...payload };
    },
    resetFilters: (state) => {
      state.filters = {
        page: 1,
        limit: 10,
        status: "",
        priority: "",
        search: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload.list; // ✅ corrected key name
        state.meta = payload.meta;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })

      // 🔹 Create new task
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.list.unshift(payload);
      })

      // 🔹 Update full task
      .addCase(updateTaskFull.fulfilled, (state, { payload }) => {
        const index = state.list.findIndex((t) => t.id === payload.id);
        if (index > -1) state.list[index] = payload;
        if (state.selected?.id === payload.id) state.selected = payload;
      })

      // 🔹 Delete task
      .addCase(removeTask.fulfilled, (state, { payload: id }) => {
        state.list = state.list.filter((t) => t.id !== id);
        if (state.selected?.id === id) state.selected = null;
      })

      // 🔹 Update status
      .addCase(setStatus.fulfilled, (state, { payload }) => {
        const index = state.list.findIndex((t) => t.id === payload.id);
        if (index > -1) state.list[index] = payload;
        if (state.selected?.id === payload.id) state.selected = payload;
      })

      // 🔹 Fetch single task
      .addCase(fetchTaskById.fulfilled, (state, { payload }) => {
        state.selected = payload;
      })

      // 🔹 Stats
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.stats = payload || { pending: 0, inProgress: 0, completed: 0 };
      });
  },
});

export const { setFilters, resetFilters } = taskSlice.actions;
export default taskSlice.reducer;
