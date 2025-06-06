import api from "@/services/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChildrenResponse, IGetChildrenArgs } from "./types";

const feature = "/children";

export const getChildren = createAsyncThunk<
    IChildrenResponse,
    IGetChildrenArgs | undefined,
    { rejectValue: any }
>(
    "children/getChildren",
    async (args = { page: 1, limit: 5 }, thunkAPI) => {
        try {
            const { page = 1, limit = 5 } = args;
            const response = await api.get(`${feature}/?limit=${limit}&page=${page}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createChild = createAsyncThunk(
    "child/createChild",
    async (childData: any, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/`, childData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateMatchedTherapistStatus = createAsyncThunk(
    "child/updateMatchedTherapistStatus",
    async (args: { matchedTherapistId: string; status: "accepted" | "declined"; decline_reason: string }, thunkAPI) => {
        try {
            const { matchedTherapistId, status, decline_reason } = args;
            const response = await api.patch(
                `/therapistsMatch/${matchedTherapistId}/`,
                { status, decline_reason }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);