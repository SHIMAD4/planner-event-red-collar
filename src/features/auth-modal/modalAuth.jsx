import { useState } from 'react';
import { api } from '../../shared/api/index';
import './ModalAuth.scss';
import ModalError from '../error-modal/modalError.jsx';
import Modal from '../modal/Modal.jsx';
import ModalAuthRegister from '../register-modal/modalRegister.jsx';
import { ModalAuthLogin } from './modalAuthLogin.jsx';
import { ModalAuthPass } from './modalAuthPass.jsx';

export default function ModalAuth({ onClose, isOpen }) {
    const [emailToCheck, setEmailToCheck] = useState('');
    const [emailInDB, setEmailInDB] = useState(false);
    const [passToCheck, setPassToCheck] = useState('');
    const [hide, setHide] = useState(false);
    const [registerUser, setRegisterUser] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    const [modalError, setModalError] = useState(false);

    const bc = new BroadcastChannel('token_channel');

    const input = document.querySelector('.modal-auth__input');
    const validError = document.querySelector('.valid-error');
    const clearIconError = document.querySelector('.clear-icon-alt');
    const clearIcon = document.querySelector('.clear-icon');

    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const isEmailValid = (value) => {
        const isValid = EMAIL_REGEXP.test(value) || value === '';
        if (input && validError && isValid) {
            input.classList.toggle('isInvalid', !isValid);
            validError.classList.toggle('hide', isValid);
            clearIconError.classList.toggle('hide', isValid);
            clearIcon.classList.toggle('hide', !isValid);

            return true;
        }

        return false;
    };

    const checkEmail = (e) => {
        e.preventDefault();
        api.check
            .email(emailToCheck, { flag: false })
            .then((res) => {
                if (res.status !== 404) {
                    setEmailInDB(true);
                    setHide(true);
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    if (emailToCheck !== '' && isEmailValid(input.value)) {
                        setRegisterUser(true);
                    } else if (input) {
                        input.classList.add('isInvalid');
                        validError.classList.remove('hide');
                    }
                }
            });
    };

    const checkPass = (e) => {
        e.preventDefault();
        api.user
            .login(
                {
                    identifier: `${emailToCheck}`,
                    password: `${passToCheck}`,
                },
                {
                    flag: false,
                },
            )
            .then((res) => {
                localStorage.setItem('access_token', res.data.jwt);
                bc.postMessage('Token', '*');
                bc.close();
                setModalOpen(false);
            })
            .catch((error) => {
                if (error.response.status > 499 && error.response.status < 600) {
                    setModalError(true);
                }
            });
    };

    return registerUser ? (
        <ModalAuthRegister onClose={onClose} isOpen={isOpen} email={emailToCheck} />
    ) : modalOpen ? (
        <Modal onClose={onClose} isOpen={isOpen} title="Вход">
            <div className="modal-auth__form-block">
                <form action="#" className="modal-auth__form">
                    <ModalAuthLogin
                        checkEmail={checkEmail}
                        hide={hide}
                        setEmailToCheck={setEmailToCheck}
                    />
                    {emailInDB ? (
                        <ModalAuthPass
                            setPassToCheck={(e) => setPassToCheck(e)}
                            checkPass={(e) => checkPass(e)}
                        />
                    ) : null}
                </form>
            </div>
        </Modal>
    ) : modalError ? (
        <ModalError onClose={onClose} isOpen={isOpen} />
    ) : null;
}
