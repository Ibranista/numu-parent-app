import api from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChild } from "./types";

const feature = "/children";

export const createChild = createAsyncThunk(
    "child/createChild",
    async (childData: IChild, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/`, childData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);