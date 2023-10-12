import { Input } from "../../Input/Input"

export function ModalAuthLogin({ checkEmail, hide, setEmailToCheck }) {
  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelectorAll(".valid-error")
  const clearIconError = document.querySelector(".clear-icon-alt")
  const clearIcon = document.querySelector(".clear-icon")

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const isEmailValid = (value) => {
    const isValid = EMAIL_REGEXP.test(value) || value === ""
    if (input && validError) {
      input.classList.toggle("isInvalid", !isValid)
      validError[0].classList.toggle("hide", isValid)
      clearIconError.classList.toggle("hide", isValid)
      clearIcon.classList.toggle("hide", !isValid)
    }
  }

  return (
    <>
      <Input
        className={hide ? "hide modal-auth__input" : "modal-auth__input"}
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
        className={hide ? "modal-auth__button hide" : "modal-auth__button"}
        onClick={(e) => {
          checkEmail(e)
          if (input && input.value !== "") isEmailValid(input.value)
        }}>
        Далее
      </button>
    </>
  )
}
