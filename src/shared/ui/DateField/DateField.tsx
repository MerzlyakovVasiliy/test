import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import cls from "./DateField.module.css";
import {memo} from "react";
import {Controller} from "react-hook-form";

interface TProps {
    control: any;
    name: string;
    label: string;
    typeDate?: 'year' | 'month' | 'day';
    rules?: any
}

export const DateField = memo((props: TProps) => {

    const { typeDate, label, control, name, rules } = props;

    return (
        <div className={cls.DateField}>
            <p className={cls.label}>
                {label}
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={null}
                    rules={rules}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <DatePicker
                                {...field}
                                className={'custom-datepicker'}
                                views={typeDate ? [typeDate] : ["year", "month", "day"]}
                                onChange={(date) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        error: !!error,
                                        helperText: error ? error.message : "",
                                    },
                                }}
                            />
                        </>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
});