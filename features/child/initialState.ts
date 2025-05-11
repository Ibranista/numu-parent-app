import { IChildResponse } from "./types";

interface ChildState {
    child: IChildResponse | null;
    loading: boolean;
    error: string | null;
}

export const initialState: ChildState = {
    child: null,
    loading: false,
    error: null,
};