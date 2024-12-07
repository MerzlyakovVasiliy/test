import cls from "./SelectField.module.css";
import {FormControl, MenuItem, Select} from "@mui/material";
import { Controller } from 'react-hook-form';
import {memo} from "react";

interface TProps {
    control: any;
    name: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
    className?: string;
    label: string;
    rules?: any
}

export const SelectField = memo((props: TProps) => {
    const { name, options, disabled, className, control, label, rules } = props;


    return (
        <div className={cls.SelectFormWrapper}>
            <FormControl fullWidth disabled={disabled}>
                <p className={cls.label}>
                    {label}
                </p>

                <Controller
                    name={name}
                    control={control}
                    defaultValue=""
                    rules={rules}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Select {...field} className={className} error={!!error}>
                                {options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {error && <p className={cls.error}>{error.message}</p>}
                        </>
                    )}
                />
            </FormControl>
        </div>
    );
});