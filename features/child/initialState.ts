import { IChildrenResponse } from "./types";

interface ChildState {
    child: IChildrenResponse | null;
    loading: boolean;
    error: string | null;
}

export const initialState: ChildState = {
    child: null,
    loading: false,
    error: null,
};