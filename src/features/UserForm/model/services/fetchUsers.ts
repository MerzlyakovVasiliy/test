import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from "../../../../app/store";
import {getPageNum} from "../selectors/formUserSelectors";
import {TResponse} from "../types/types";


export const fetchUsers = createAsyncThunk<
    TResponse,
    void,
    { state: RootState }
>(
    'form/fetchUser',
    async (_props, thunkApi) => {
        const {rejectWithValue, getState} = thunkApi;
        const page = getPageNum(getState());

        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);

            if (!response.ok) {
                throw new Error('Ошибка при загрузке пользователей');
            }

            return await response.json();
        } catch (e) {
            return rejectWithValue('Не удалось загрузить пользователей');
        }
    },
);