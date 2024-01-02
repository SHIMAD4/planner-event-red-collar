import { useEffect, useState } from 'react';
import { api } from '../../shared/api';
import './ModalEvent.scss';
import ModalAuth from '../auth-modal/modalAuth.jsx';
import ModalError from '../error-modal/modalError.jsx';
import ModalHappy from '../happy-modal/modalHappy.jsx';
import Modal from '../modal/Modal.jsx';
import ModalEventGallery from './modalEventGallery.jsx';
import ModalEventInfo from './modalEventInfo.jsx';
import ModalEventParticipants from './modalEventParticipants.jsx';

export default function ModalEvent({ event, onClose, isOpen }) {
    const [openAuth, setOpenAuth] = useState(false);
    const [auth, setAuth] = useState(false);
    const [firstModalOpen, setFirstModalOpen] = useState(true);
    const [happyModal, setHappyModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setAuth(true);
        }
    }, []);

    if (!event) {
        return null;
    }

    const closeFirstModal = () => {
        setFirstModalOpen(false);
    };

    const joinToEvent = () => {
        api.event
            .join(+event.id, {}, { flag: true })
            .then(() => setHappyModal(true))
            .catch((error) => {
                if (error.response.status > 299 || error.response.status < 200) {
                    setErrorModal(true);
                }
            });
    };

    return (
        <>
            {firstModalOpen && (
                <Modal onClose={onClose} isOpen={isOpen} title={event.title}>
                    <ModalEventInfo event={event} />
                    <ModalEventParticipants event={event} />
                    <ModalEventGallery event={event} />
                    {!auth ? (
                        <p className="modal__auth">
                            <a
                                onClick={() => {
                                    setOpenAuth(true);
                                    closeFirstModal();
                                }}
                            >
                                Войдите
                            </a>
                            , чтобы присоединиться к событию
                        </p>
                    ) : (
                        <div className="modal-event__button">
                            <button
                                className="modal-event__button--join"
                                onClick={(e) => {
                                    joinToEvent(e);
                                    closeFirstModal();
                                }}
                            >
                                Присоединиться к событию
                            </button>
                        </div>
                    )}
                </Modal>
            )}
            {happyModal ? (
                <ModalHappy
                    onClose={() => {
                        setHappyModal(false);
                        setFirstModalOpen(true);
                    }}
                    isOpen={isOpen}
                    event={event}
                />
            ) : null}
            {errorModal ? (
                <ModalError
                    onClose={() => {
                        setErrorModal(false);
                        setFirstModalOpen(true);
                    }}
                    isOpen={isOpen}
                />
            ) : null}
            {openAuth && (
                <ModalAuth
                    onClose={() => {
                        setOpenAuth(false);
                        setFirstModalOpen(true);
                    }}
                    isOpen
                />
            )}
        </>
    );
}
