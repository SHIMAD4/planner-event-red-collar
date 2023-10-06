export function ModalAuthPass({ checkPass, setPassToCheck }) {
  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelectorAll(".valid-error")
  const clearIconError = document.querySelector(".clear-icon-alt")
  const clearIcon = document.querySelector(".clear-icon")

  const isPassValid = (value) => {
    const isValid = value === ""
    if (input && validError) {
      input.classList.toggle("isInvalid", !isValid)
      validError[1].classList.toggle("hide", isValid)
      clearIconError.classList.toggle("hide", isValid)
      clearIcon.classList.toggle("hide", !isValid)
    }
  }

  return (
    <>
      <div className="modal-auth__input-block">
        <input
          className="modal-auth__input"
          type="password"
          id="password"
          name="password"
          autoComplete="true"
          onChange={(e) => {
            setPassToCheck(e.target.value)
          }}
          required
        />
        <label htmlFor="password">Пароль</label>
        <p className="valid-error hide">Неправильный пароль</p>
      </div>
      <button
        type="submit"
        className="modal-auth__button"
        onClick={(e) => {
          checkPass(e)
          isPassValid(input.value)
        }}>
        Вход
      </button>
    </>
  )
}
