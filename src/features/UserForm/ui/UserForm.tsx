import {Alert, Box, Snackbar} from "@mui/material";
import FormWrapper from "../../../shared/ui/FormWrapper/FormWrapper";
import cls from './UserForm.module.css';
import InputWrapper from "../../../shared/ui/InputWrapper/InputWrapper";
import {BlockFormWrapper} from "../../../shared/ui/BlockFormWrapper/BlockFormWrapper";
import {DateField} from "../../../shared/ui/DateField/DateField";
import {SelectField} from "../../../shared/ui/SelectField/SelectField";
import {useCallback, useEffect, useState} from "react";
import {TFetchUser, TFormState} from "../model/types/types";
import {useForm, useWatch} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchUsers} from "../model/services/fetchUsers";
import {getEditUser, getErrorSaveUser, getIsisLoadingSaveUser, getUser} from "../model/selectors/formUserSelectors";
import UserDropdown from "./UserSelect/UserSelect";
import {setFilterUsers} from "../model/slice/userFormSlice";
import {saveUser} from "../model/services/saveUser";
import {LoadingButton} from "@mui/lab";


export const UserForm = () => {
    const dispatch = useAppDispatch()
    const {
        control,
        handleSubmit,
        setValue,
        setFocus,
        reset
    } = useForm<TFormState>({
        mode: "onBlur",
    });

    const gender = useWatch({ control, name: "gender", defaultValue: "" });
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'error' as 'success' | 'error',
    });

    const users = useAppSelector(getUser)
    const editUser = useAppSelector(getEditUser)
    const isLoadingSaveUser = useAppSelector(getIsisLoadingSaveUser)
    const errorSaveUser = useAppSelector(getErrorSaveUser)

    const getProfessionOptions = useCallback(() => {
        const baseOptions = [
            { value: 'Доктор', label: 'Доктор' },
            { value: 'Админ', label: 'Админ' },
        ];
        const genderSpecificOptions =
            gender === 'Мужской'
                ? [{ value: 'Медбрат', label: 'Медбрат' }]
                : gender === 'Женский'
                    ? [{ value: 'Медсестра', label: 'Медсестра' }]
                    : [];
        return [...genderSpecificOptions, ...baseOptions];
    }, [gender]);

    useEffect(() => {
        setValue("profession", "");
    }, [gender, setValue]);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    useEffect(() => {
        if (editUser) {
            reset({
                fullName: `${editUser.first_name} ${editUser.last_name}`,
                // Больше никаких полей от сервера не приходит
            });
        }
    }, [editUser, reset]);

    const genderOptions = [
        {value: 'Мужской', label: 'Мужской'},
        {value: 'Женский', label: 'Женский'},
    ];

    const onSubmit = (data: TFormState) => {
        const [first_name = '', last_name = ''] = data.fullName?.split(' ') || [];
        const mapData: TFetchUser = {
            first_name,
            last_name,
            gender: data.gender,
            birthDate: data.birthDate,
            graduationYear: data.graduationYear,
            jobResponsibilities: data.jobResponsibilities,
            profession: data.profession,
            university: data.university,
            workplace: data.workplace,
        }
        dispatch(saveUser({userData: mapData, id: editUser?.id})).finally(() => {
            if (!errorSaveUser) {
                setSnackbarState({
                    open: true,
                    message: 'Успешно',
                    severity: 'success',
                });
            } else {
                setSnackbarState({
                    open: true,
                    message: 'Ошибка - попробуйте позже',
                    severity: 'error',
                });
            }
        });
    };

    const onError = useCallback((errorFields: Record<string, any>) => {
        const errorField = Object.keys(errorFields)[0];
        if (errorField) {
            setFocus(errorField as keyof TFormState);
        }
    }, [setFocus]);

    const handleChange = useCallback((value: string) => {
        dispatch(setFilterUsers(value));
    }, [dispatch]);

    return (
        <>
        <FormWrapper name="Регистрация">
            <form className={cls.UserForm} onSubmit={handleSubmit(onSubmit, onError)}>

                <BlockFormWrapper name="О себе">
                    <UserDropdown
                        onChange={handleChange}
                        name={'fullName'}
                        control={control}
                        label="ФИО"
                        placeholder="Введите ФИО"
                        className={cls.input}
                        rules={{ required: "Обязательное поле" }}
                        users={users}
                    />

                    <Box className={cls.formRow}>
                        <SelectField
                            label={"Пол"}
                            control={control}
                            name="gender"
                            options={genderOptions}
                            className={cls.input}
                            rules={{ required: "Обязательное поле" }}
                        />

                        <DateField
                            control={control}
                            name={'birthDate'}
                            label="Дата рождения"
                            rules={{ required: "Обязательное поле" }}
                        />
                    </Box>

                    <SelectField
                        control={control}
                        name="profession"
                        label={"Роль"}
                        options={getProfessionOptions()}
                        disabled={!gender}
                        className={cls.input}
                        rules={{ required: "Обязательное поле" }}
                    />
                </BlockFormWrapper>

                <BlockFormWrapper name="Образование">
                    <Box className={cls.formRow}>
                        <InputWrapper
                            name={'university'}
                            control={control}
                            label="ВУЗ"
                            placeholder="Введите ВУЗ"
                            className={cls.input}
                            rules={{ required: "Обязательное поле" }}
                        />

                        <DateField
                            control={control}
                            name="graduationYear"
                            label="Год окончания"
                            typeDate="year"
                            rules={{ required: "Обязательное поле" }}
                        />
                    </Box>
                </BlockFormWrapper>

                <BlockFormWrapper name="Работа">
                    <InputWrapper
                        name={'workplace'}
                        control={control}
                        label="Место работы"
                        placeholder="Место работы"
                        className={cls.input}
                        rules={{ required: "Обязательное поле" }}
                    />

                    <InputWrapper
                        name={'jobResponsibilities'}
                        control={control}
                        label="Должностные обязанности"
                        placeholder="Должностные обязанности"
                        className={cls.textField}
                        rules={{ required: "Обязательное поле" }}
                    />
                </BlockFormWrapper>

                <LoadingButton
                    className={cls.button}
                    sx={{
                        display: 'flex',
                        margin: '0 auto',
                        backgroundColor: 'black',
                        textTransform: 'none',
                    }}
                    color="secondary"
                    type="submit"
                    loading={isLoadingSaveUser}
                    variant="contained"
                >
                    Сохранить
                </LoadingButton>
            </form>
        </FormWrapper>
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => setSnackbarState({
                    open: false,
                    message: '',
                    severity: 'success',
                })}
            >
                <Alert
                    severity={snackbarState.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbarState.message}
                </Alert>
            </Snackbar>
            </>
    );
};

export default UserForm;