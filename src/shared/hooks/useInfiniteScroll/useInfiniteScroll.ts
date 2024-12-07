import { MutableRefObject, useEffect } from 'react';

interface useInfiniteScrollOption {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: useInfiniteScrollOption) {
    useEffect(() => {
        if (callback) {
            const options = {
                root: wrapperRef.current,
                rootMargin: '0px',
                threshold: 1.0,
            };

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            if (triggerRef.current) {
                observer.observe(triggerRef.current);
            }

            return () => {
                if (triggerRef.current && observer) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    observer.unobserve(triggerRef.current);
                }
            };
        }

        return undefined;
    }, [callback, triggerRef, wrapperRef]);
}
