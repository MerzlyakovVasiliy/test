import {
    Avatar,
    Button,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {TFetchUser} from "../../model/types/types";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {setEditUser, setIsDropdownVisible} from "../../model/slice/userFormSlice";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteUser} from "../../model/services/deleteUser";
import {memo, useCallback, useState} from "react";
import {getErrorDeleteUser, getIsLoadingDeleteUser} from "../../model/selectors/formUserSelectors";
import {Modal} from "../../../../shared/ui/Modal/Modal";

type TProps = {
    user: TFetchUser
}

export const RowUser = memo(({user}: TProps) => {
    const dispatch = useAppDispatch();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const errorDeleteUser = useAppSelector(getErrorDeleteUser);
    const isLoadingDeleteUser = useAppSelector(getIsLoadingDeleteUser);

    const handleUserSelect = useCallback((user: TFetchUser) => {
        dispatch(setEditUser(user));
        dispatch(setIsDropdownVisible());
    }, [dispatch]);

    const handleDeleteClick = useCallback(() => {
        setDialogOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        dispatch(deleteUser(user.id!));
    }, [dispatch, user.id]);

    return (
        <>
            <TableRow>
                <TableCell sx={{padding: '5px'}}>
                    <Avatar alt={user.first_name} src={user.avatar}/>
                </TableCell>
                <TableCell sx={{padding: '5px'}}>{`${user.last_name} ${user.first_name[0]}.`}</TableCell>
                <TableCell sx={{padding: '5px'}}>{user.email}</TableCell>
                <TableCell sx={{padding: '5px'}}>{user.gender}</TableCell>
                <TableCell sx={{padding: '5px'}}>{user.birthDate}</TableCell>
                <TableCell sx={{padding: '5px'}}>
                    <Button
                        sx={{ minWidth: 0, width: 'auto' }}
                        onClick={() => handleUserSelect(user)}
                        size="small"
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        sx={{ minWidth: 0, width: 'auto' }}
                        onClick={handleDeleteClick}
                        size="small"
                    >
                        <DeleteIcon color="warning" />
                    </Button>
                </TableCell>
            </TableRow>
            <Modal isOpen={isDialogOpen} onClose={handleCloseDialog}>
                <Typography variant="h6">Подтверждение удаления</Typography>
                {errorDeleteUser && (
                    <Typography color="error">{errorDeleteUser}</Typography>
                )}
                {!errorDeleteUser && (
                    <Typography>Вы уверены, что хотите удалить пользователя?</Typography>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button onClick={handleCloseDialog} disabled={isLoadingDeleteUser}>
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" disabled={isLoadingDeleteUser}>
                        {isLoadingDeleteUser ? 'Удаление...' : 'Удалить'}
                    </Button>
                </div>
            </Modal>
        </>
    );
});
