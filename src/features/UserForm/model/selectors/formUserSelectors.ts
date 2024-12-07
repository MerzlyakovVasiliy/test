import {RootState} from "../../../../app/store";

export const getPageNum = (state: RootState) => state.form.page;
export const getTotalPage = (state: RootState) => state.form.totalPages;
export const getUserIsLoading = (state: RootState) => state.form.isLoading;
export const getUser = (state: RootState) => state.form.filterUsers;
export const getIsDropdownVisible = (state: RootState) => state.form.isDropdownVisible;
export const getIsLoading = (state: RootState) => state.form.isLoading;
export const getEditUser = (state: RootState) => state.form.editUser;
export const getNotMore = (state: RootState) => state.form.notMore;
export const getIsisLoadingSaveUser = (state: RootState) => state.form.isLoadingSaveUser;
export const getErrorSaveUser = (state: RootState) => state.form.errorSaveUser;
export const getErrorDeleteUser = (state: RootState) => state.form.deleteError;
export const getIsLoadingDeleteUser = (state: RootState) => state.form.isLoadingDeleting;