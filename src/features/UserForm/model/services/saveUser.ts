import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from "../../../../app/store";
import {TFetchUser} from "../types/types";

interface SaveUserPayload {
    id?: number;
    userData: TFetchUser;
}

export const saveUser = createAsyncThunk<
    void,
    SaveUserPayload,
    { state: RootState }
>(
    'form/saveUser',
    async ({userData, id}, {rejectWithValue}) => {
        console.log(userData)
        try {
            const url = id
                ? `https://reqres.in/api/users/${id}`
                : `https://reqres.in/api/users`;

            const method = id ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                // используем userData при отправке
            });

            if (!response.ok) {
                throw new Error(`Ошибка при ${id ? 'изменении' : 'создании'} пользователя`);
            }
        } catch (e) {
            return rejectWithValue(`Не удалось ${id ? 'изменить' : 'создать'} пользователя`);
        }
    },
);
