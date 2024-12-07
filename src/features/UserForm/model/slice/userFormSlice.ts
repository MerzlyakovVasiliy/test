import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TFetchUser, TFormSchema, TResponse, TSortKey} from "../types/types";
import {fetchUsers} from "../services/fetchUsers";
import {saveUser} from "../services/saveUser";
import {deleteUser} from "../services/deleteUser";

const initialState: TFormSchema = {
    data: {
        gender: null,
        profession: null,
        fullName: null,
        birthDate: null,
        university: null,
        graduationYear: null,
        workplace: null,
        jobResponsibilities: null,
    },
    fetchUsers: [],
    error: '',
    errorSaveUser: '',
    isLoading: false,
    isLoadingSaveUser: false,
    totalPages: 0,
    page: 1,
    isDropdownVisible: true,
    filterUsers: [],
    searchValue: '',
    editUser: null,
    notMore: false,
    deleteError: null,
    isLoadingDeleting: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setNotMore: (state) => {
            state.notMore = true
        },
        setIsDropdownVisible: (state) => {
            state.isDropdownVisible = !state.isDropdownVisible
        },
        setFilterUsers: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload.trim().toLowerCase();
            state.isDropdownVisible = true;
            const filterValue = action.payload.trim().toLowerCase();
            state.filterUsers = filterValue
                ? state.fetchUsers.filter(user =>
                    user.last_name?.toLowerCase().includes(filterValue)
                )
                : state.fetchUsers;
        },
        setEditUser: (state, action: PayloadAction<TFetchUser>) => {
            state.editUser = {...state.editUser, ...action.payload};
        },
        sortFilterUsers: (state, action: PayloadAction<TSortKey>) => {
            if (action.payload === 'fullName') {
                state.filterUsers.sort((a, b) => {
                    const fullNameA = `${a.last_name ?? ''} ${a.first_name?.charAt(0) ?? ''}`.trim().toLowerCase();
                    const fullNameB = `${b.last_name ?? ''} ${b.first_name?.charAt(0) ?? ''}`.trim().toLowerCase();
                    return fullNameA.localeCompare(fullNameB);
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TResponse>) => {
                state.isLoading = false;
                state.fetchUsers = [...state.fetchUsers, ...action.payload.data];
                state.totalPages = action.payload.total_pages;

                if(state.page === 1) {
                    state.filterUsers = [...state.fetchUsers];
                } else {
                    if (state.searchValue) {
                        const filterArrFromFetch = action.payload.data.filter(user =>
                            user.last_name?.toLowerCase().includes(state.searchValue)
                        );

                        if (filterArrFromFetch.length > 0) {
                            state.filterUsers = [...state.filterUsers, ...filterArrFromFetch];
                        }
                    } else {
                        state.filterUsers = [...state.fetchUsers];
                    }
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(saveUser.pending, (state) => {
                state.isLoadingSaveUser = true;
                state.error = '';
            })
            .addCase(saveUser.fulfilled, (state) => {
                state.isLoadingSaveUser = false;
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.isLoadingSaveUser = false;
                state.error = action.payload as string;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoadingDeleting = true;
                state.deleteError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoadingDeleting = false;
                state.filterUsers = state.filterUsers.filter((user) => user.id !== action.payload);
                state.fetchUsers = state.fetchUsers.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoadingDeleting = false;
                state.deleteError = action.payload as string;
            });
    },
});

export const {
    setPage,
    setIsDropdownVisible,
    setFilterUsers,
    setEditUser,
    setNotMore,
    sortFilterUsers
} = formSlice.actions;
export const {reducer: formReducer} = formSlice;
