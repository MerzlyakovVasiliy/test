import cls from "./WrapperInfinityScroll.module.css"
import {
    memo, MutableRefObject, ReactNode, useRef
} from 'react';
import {useInfiniteScroll} from "../../shared/hooks/useInfiniteScroll/useInfiniteScroll";


interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

const WrapperInfinityScroll = (props: PageProps) => {
    const {children, onScrollEnd } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });


    return (
        <section
            ref={wrapperRef}
            className={cls.WrapperInfinityScroll}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    );
};

export default memo(WrapperInfinityScroll);
