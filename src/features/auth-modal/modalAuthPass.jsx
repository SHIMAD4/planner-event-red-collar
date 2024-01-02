import { useState } from 'react';
import { Input } from '../../shared/ui';

export function ModalAuthPass({ checkPass, setPassToCheck }) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const input = document.querySelector('.modal-auth__input');
    const validError = document.querySelectorAll('.valid-error');
    const clearIconError = document.querySelector('.clear-icon-alt');
    const clearIcon = document.querySelector('.clear-icon');

    const isPassValid = (value) => {
        const isValid = value === '';
        if (input && validError) {
            input.classList.toggle('isInvalid', !isValid);
            validError[1].classList.toggle('hide', isValid);
            clearIconError.classList.toggle('hide', isValid);
            clearIcon.classList.toggle('hide', !isValid);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);

        const inputs = document.querySelectorAll('.modal-auth__input');
        for (let i = 1; i < inputs.length; i++) {
            inputs[i].type = inputs[i].type === 'password' ? 'text' : 'password';
        }
    };

    return (
        <>
            <Input
                className="modal-auth__input"
                title="Пароль"
                type="password"
                id="password"
                onChange={(e) => {
                    setPassToCheck(e.target.value);
                }}
                required
                errorSymbols="Неправильный пароль"
                isPasswordVisible={!isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />
            <button
                type="submit"
                className="modal-auth__button"
                onClick={(e) => {
                    checkPass(e);
                    isPassValid(input.value);
                }}
            >
                Вход
            </button>
        </>
    );
}
