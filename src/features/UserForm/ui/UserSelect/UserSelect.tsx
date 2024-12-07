import {useState, useCallback, useEffect, useRef, memo} from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchNextPortionUsers} from "../../model/services/fetchNextPortionUser";
import {TFetchUser, TSortKey} from "../../model/types/types";
import {getIsDropdownVisible, getIsLoading, getNotMore} from "../../model/selectors/formUserSelectors";
import {RowUser} from "./RowUser";
import InputWrapper from "../../../../shared/ui/InputWrapper/InputWrapper";
import {sortFilterUsers} from "../../model/slice/userFormSlice";

type TUserDropdownProps = {
    users: TFetchUser[];
    control: any;
    label: string;
    placeholder: string;
    className?: string;
    name: string;
    rules?: any;
    onChange: (value: string) => void
};

const UserDropdown = memo((props: TUserDropdownProps) => {

    const {control, users, name, className, placeholder, rules, label, onChange} = props;

    const [isFetching, setIsFetching] = useState(false);
    const isDropdownVisible = useAppSelector(getIsDropdownVisible);
    const listRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getIsLoading);
    const notMore = useAppSelector(getNotMore);

    const sortHandler = useCallback((value: TSortKey) => {
        dispatch(sortFilterUsers(value))
    }, [dispatch])

    const handleScroll = useCallback(() => {
        if (!listRef.current || isFetching) return;

        const {scrollTop, scrollHeight, clientHeight} = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setIsFetching(true);
            dispatch(fetchNextPortionUsers()).finally(() => setIsFetching(false));
        }
    }, [dispatch, isFetching]);

    useEffect(() => {
        if (listRef.current) {
            const {scrollHeight, clientHeight} = listRef.current;
            if (scrollHeight <= clientHeight && !isFetching) {
                setIsFetching(true);
                dispatch(fetchNextPortionUsers()).finally(() => setIsFetching(false));
            }
        }
    }, [dispatch, users, isFetching]);

    return (
        <Box position="relative">
            <InputWrapper
                onChange={onChange}
                name={name}
                control={control}
                label={label}
                placeholder={placeholder}
                className={className}
                rules={rules}
            />

            {isDropdownVisible && !(notMore && users.length === 0) && (
                <Box position="absolute" zIndex={9} sx={{
                    right: 0,
                    left: 0,
                }}>
                    <TableContainer
                        component={Paper}
                        ref={listRef}
                        onScroll={handleScroll}
                        sx={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            position: "relative",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell onClick={() => sortHandler('fullName')}>ФИО</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Пол</TableCell>
                                    <TableCell>Д/Р</TableCell>
                                    <TableCell>Действие</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <RowUser key={user.id} user={user} />
                                ))}
                                {isFetching && (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <CircularProgress size={24} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {isLoading && (
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgcolor="rgba(255, 255, 255, 0.7)"
                            zIndex={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
});

export default UserDropdown;