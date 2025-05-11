import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { createChild } from "./thunkApi";
import { IChildResponse } from "./types";

const childSlice = createSlice({
    name: "child",
    initialState,
    reducers: {
        setChild(state, action) {
            state.child = action.payload;
        },
        clearChild(state) {
            state.child = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChild.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createChild.fulfilled, (state, action) => {
                state.loading = false;
                state.child = action.payload as IChildResponse;
            })
            .addCase(createChild.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail?: string })?.detail || "Failed to create child";
            });
    },
});

export const { setChild, clearChild } = childSlice.actions;
export default childSlice.reducer;
