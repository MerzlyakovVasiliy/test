import {memo, ReactNode} from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export const Modal = memo(({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                }}
                onClick={(e) => e.stopPropagation()} // Останавливаем всплытие, чтобы клик внутри не закрывал модалку
            >
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
});
