import clearError from "../../shared/icons/clear-alt.svg"
import clear from "../../shared/icons/clear.svg"

export function ModalAuthLogin({ checkEmail, hide, setEmailToCheck }) {
  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelectorAll(".valid-error")
  const clearIconError = document.querySelector(".clear-icon-alt")
  const clearIcon = document.querySelector(".clear-icon")

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const isEmailValid = (value) => {
    if (!EMAIL_REGEXP.test(value) && value !== "") {
      if (input && validError) {
        input.classList.add("isInvalid")
        validError[0].classList.remove("hide")
        clearIconError.classList.remove("hide")
        clearIcon.classList.add("hide")
      }
    } else {
      input.classList.remove("isInvalid")
      validError[0].classList.add("hide")
      clearIconError.classList.add("hide")
      clearIcon.classList.remove("hide")
    }
  }
  const clearInput = () => {
    input.value = ""
    isEmailValid(input.value)
  }

  return (
    <>
      <div className={hide ? "modal-auth__input-block hide" : "modal-auth__input-block"}>
        <input
          className="modal-auth__input"
          type="text"
          id="email"
          name="email"
          autoComplete="true"
          onChange={(e) => {
            setEmailToCheck(e.target.value)
          }}
          required
        />
        <label htmlFor="email">Email</label>
        <img className="clear-icon" src={clear} alt="" onClick={() => clearInput()} />
        <img className="clear-icon-alt hide" src={clearError} alt="" onClick={() => clearInput()} />
        <p className="valid-error hide">Некорректный e-mail</p>
      </div>
      <button
        type="submit"
        className={hide ? "modal-auth__button hide" : "modal-auth__button"}
        onClick={(e) => {
          checkEmail(e)
          isEmailValid(input.value)
        }}>
        Далее
      </button>
    </>
  )
}
