import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ---- ACTIONS (async) -------------------------------------------------------
// createAsyncThunk generates three actions per thunk:
//   auth/login/pending, auth/login/fulfilled, auth/login/rejected
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) return rejectWithValue(data.message);
  return data; // { token, user }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { getState, rejectWithValue }) => {
  const { token } = getState().auth;
  const res = await fetch("/api/profile", {
    headers: { Authorization: `Bearer ${token}` }, // JWT sent on every protected request
  });
  const data = await res.json();
  if (!res.ok) return rejectWithValue(data.message);
  return data;
});

// ---- STATE -----------------------------------------------------------------
const initialState = {
  user: null,
  token: null, // JWT is kept in memory only (see README for the tradeoffs)
  profile: null,
  isAuthenticated: false,
  status: "idle", // "idle" | "loading"
  error: null,
};

// ---- REDUCER + ACTIONS (sync) ----------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState, // returning initialState wipes the token
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload || "Login failed.";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        // Expired or invalid token: drop the session and show why.
        return { ...initialState, error: action.payload || "Could not load profile." };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
