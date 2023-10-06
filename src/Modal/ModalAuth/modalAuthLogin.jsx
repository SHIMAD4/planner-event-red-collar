import clearError from "../../shared/icons/clear-alt.svg"
import clear from "../../shared/icons/clear.svg"

export function ModalAuthLogin({
  clearInput,
  checkEmail,
  hide,
  setEmailToCheck,
  isEmailValid,
}) {
  return (
    <>
      <div
        className={
          hide ? "modal-auth__input-block hide" : "modal-auth__input-block"
        }>
        <input
          className="modal-auth__input"
          type="text"
          id="email"
          name="email"
          autoComplete="true"
          onChange={(e) => {
            setEmailToCheck(e.target.value)
            isEmailValid(e.target.value)
          }}
          required
        />
        <label htmlFor="email">Email</label>
        <img
          className="clear-icon"
          src={clear}
          alt=""
          onClick={() => clearInput()}
        />
        <img
          className="clear-icon-alt hide"
          src={clearError}
          alt=""
          onClick={() => clearInput()}
        />
        <p className="valid-error hide">Некорректный e-mail</p>
      </div>
      <button
        type="submit"
        className={hide ? "modal-auth__button hide" : "modal-auth__button"}
        onClick={(e) => checkEmail(e)}>
        Далее
      </button>
    </>
  )
}
