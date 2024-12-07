import {memo, ReactNode} from "react";
import cls from "./BlockFormWrapper.module.css";

interface TProps {
    children: ReactNode;
    name: string;
}

export  const BlockFormWrapper = memo(({children, name}: TProps) => {
    return (
        <div className={cls.BlockFormWrapper}>
            <legend className={cls.subtitleForm}>{name}</legend>
            {children}
        </div>
    );
});