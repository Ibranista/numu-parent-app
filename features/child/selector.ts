import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: RootState) => state;

export const selectChild = createSelector(
    [selectSlice],
    (child) => child.children
)