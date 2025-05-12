import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getUserProfile, loginUser, registerUser } from "./thunkApi";

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = {
                ...action.payload,
                email: action.payload.email ?? "",
            };
        },
        clearAuth(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...action.payload,
                    email: action.payload.email ?? "",
                };
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to register user";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...action.payload,
                    email: action.payload.email ?? "",
                };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Login failed";
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to fetch user profile";
            });
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;