import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { createChild, getChildren } from "./thunkApi";
import { IChildrenResponse } from "./types";

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
                state.child = action.payload as IChildrenResponse;
            })
            .addCase(createChild.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail?: string })?.detail || "Failed to create child";
            })
            .addCase(getChildren.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChildren.fulfilled, (state, action) => {
                state.loading = false;
                state.child = action.payload;
            })
            .addCase(getChildren.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail?: string })?.detail || "Failed to fetch children";
            });
    },
});

export const { setChild, clearChild } = childSlice.actions;
export default childSlice.reducer;
