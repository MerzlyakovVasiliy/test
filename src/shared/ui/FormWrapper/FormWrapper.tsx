import {HTMLAttributes, memo, ReactNode} from 'react';
import cls from './FormWrapper.module.css'

interface TProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    name: string;
}

export const FormWrapper = memo(({children, name}: TProps) => {
    return (
        <div className={cls.formWrapper}>
            <h2 className={cls.header}>
                {name}
            </h2>
            {children}
        </div>
    );
});

export default FormWrapper;