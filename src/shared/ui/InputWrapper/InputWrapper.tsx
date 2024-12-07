import cls from "./InputWrapper.module.css";
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import {memo} from "react";

interface TProps {
    control: any;
    label: string;
    placeholder: string;
    className?: string;
    name: string;
    rules?: any
    onChange?: (value: string) => void;
}

const InputWrapper = memo((props: TProps) => {
    const { label, className, placeholder, name, control, rules, onChange } = props;

    return (
        <div className={cls.FieldFormWrapper}>
            <p className={cls.label}>
                {label}
            </p>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={rules}
                render={({ field: { ref, onChange: fieldOnChange, ...field }, fieldState: { error } }) => (
                    <>
                        <TextField
                            {...field}
                            inputRef={ref}
                            placeholder={placeholder}
                            variant="outlined"
                            InputProps={{
                                className: className,
                            }}
                            onChange={(event) => {
                                const value = event.target.value;
                                fieldOnChange(value);
                                onChange?.(value);
                            }}
                            className={className}
                            error={!!error}
                            helperText={error ? error.message : ""}
                        />
                    </>
                )}
            />
        </div>
    );
});

export default InputWrapper;