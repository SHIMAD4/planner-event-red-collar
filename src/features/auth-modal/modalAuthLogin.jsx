import { Index } from '../../shared/ui/atoms/input/index.tsx'

export function ModalAuthLogin({ checkEmail, hide, setEmailToCheck }) {
    return (
        <>
            <Index
                className={hide ? 'hide modal-auth__input' : 'modal-auth__input'}
                title="Email"
                type="text"
                id="email"
                onChange={(e) => {
                    setEmailToCheck(e.target.value)
                }}
                required
                errorSymbols="Некорректный e-mail"
            />
            <button
                type="submit"
                className={hide ? 'modal-auth__button hide' : 'modal-auth__button'}
                onClick={(e) => {
                    checkEmail(e)
                }}>
                Далее
            </button>
        </>
    )
}
