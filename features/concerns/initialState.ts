import type { IConcernState } from "./types";

export const initialState: IConcernState = {
    concerns: {
        results: [],
    },
    loading: false,
    error: null,
};
