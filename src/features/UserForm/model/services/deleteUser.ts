import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUser = createAsyncThunk(
    'form/deleteUser',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Ошибка удаления');
            }
            return userId;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
        }
    }
);
