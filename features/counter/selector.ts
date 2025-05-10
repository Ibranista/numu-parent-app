import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (state: RootState) => state?.counter;

export const selectCount = createSelector(
    [selectSlice],
    state => state.value
)