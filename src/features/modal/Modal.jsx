import { useEffect, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { Icons } from '../../shared/ui';
import './Modal.scss';

export default function Modal({ onClose, isOpen, children, title, id }) {
    const [activeTrap, setActiveTrap] = useState(false);

    useEffect(() => {
        if (isOpen) {
            mountTrap();
        }
    }, [isOpen]);

    const mountTrap = () => setActiveTrap(true);
    const unmountTrap = () => setActiveTrap(false);

    return activeTrap ? (
        <FocusTrap focusTrapOptions={{ onDeactivate: unmountTrap }}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal__title"
                className="modal"
                id={id}
            >
                <div className="modal__bg" onClick={(e) => onClose(e)} />
                <div className="modal__body">
                    <h1 id="modal__title" className="modal__title">
                        {title}
                    </h1>
                    <button
                        className="modal__close-icon"
                        onClick={(e) => onClose(e)}
                        aria-label="Закрыть"
                        role="button"
                    >
                        <Icons.Close />
                    </button>
                    {children}
                </div>
            </div>
        </FocusTrap>
    ) : (
        false
    );
}
