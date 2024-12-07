import { createAsyncThunk } from '@reduxjs/toolkit';
import {fetchUsers} from "./fetchUsers";
import {setNotMore, setPage} from "../slice/userFormSlice";
import {RootState} from "../../../../app/store";
import {getPageNum, getTotalPage, getUserIsLoading} from "../selectors/formUserSelectors";

export const fetchNextPortionUsers = createAsyncThunk<
    void,
    void,
    { state: RootState }
>(
    'form/fetchNextPostsPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const totalPage = getTotalPage(getState());
        const page = getPageNum(getState());
        const isLoading = getUserIsLoading(getState());

        if (page < totalPage && !isLoading) {
            dispatch(setPage(page + 1));
            dispatch(fetchUsers());
        } else {
            dispatch(setNotMore())
        }
    },
);
