export type TFormState = {
    fullName: string | null;
    gender: string | null;
    birthDate: string | null;
    profession: string | null;
    university: string | null;
    graduationYear: string | null;
    workplace: string | null;
    jobResponsibilities: string | null;
    avatar?: string;
    email?: string;
    id?: number;
};

export type TFetchUser = {
    first_name: string;
    last_name: string;
    birthDate?: string | null;
    profession?: string | null;
    university?: string | null;
    graduationYear?: string | null;
    workplace?: string | null;
    jobResponsibilities?: string | null;
    avatar?: string;
    email?: string;
    id?: number;
    gender?: string | null;
};

export interface TFormSchema {
    fetchUsers: TFetchUser[];
    data: TFormState;
    isLoading: boolean;
    error?: string;
    errorSaveUser?: string;
    deleteError: string | null;
    isLoadingDeleting: boolean;
    totalPages: number;
    page: number,
    isDropdownVisible: boolean,
    filterUsers: TFetchUser[],
    searchValue: string,
    editUser: TFetchUser | null,
    isLoadingSaveUser: boolean,
    notMore: boolean;
}

export type TResponse = {
    data: TFetchUser[];
    total_pages: number;
}

export type TSortKey = 'fullName' | 'gender' | 'birthDate' | 'profession' | 'university';