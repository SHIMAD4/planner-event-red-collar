import { useState } from "react"
import { api } from "../../shared/api"
import clear from "../../shared/icons/clear.svg"
import "../../shared/scss/Modal/ModalAuth/ModalAuth.scss"
import Modal from "../Modal"

export default function ModalAuth({ onClose, isOpen }) {
  const [emailToCheck, setEmailToCheck] = useState("")
  const [emailInDB, setEmailInDB] = useState(false)
  const [passToCheck, setPassToCheck] = useState("")
  const [hide, setHide] = useState(false)

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelector(".valid-error")
  const clearIcon = document.querySelector(".clear-icon")

  const isEmailValid = (value) => {
    if (!EMAIL_REGEXP.test(value) && value !== "") {
      input.classList.add("isInvalid")
      if (validError && clearIcon) {
        validError.classList.remove("hide")
        clearIcon.classList.remove("hide")
      }
    } else {
      input.classList.remove("isInvalid")
      validError.classList.add("hide")
      clearIcon.classList.add("hide")
    }
  }
  const checkEmail = (e) => {
    e.preventDefault()
    api.check
      .email(emailToCheck, { flag: false })
      .then((res) => {
        if (res.status === 204) {
          setEmailInDB(true)
          setHide(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("Нет в базе")
        }
      })
  }
  const checkPass = (e) => {
    e.preventDefault()
    api.user
      .login({
        flag: false,
        identifier: `${emailToCheck}`,
        password: `${passToCheck}`,
      })
      .then((res) => {
        console.log("user: ", res.data.user)
        console.log("token: ", res.data.jwt)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Неправильный пароль")
        }
      })
  }
  const clearInput = () => {
    input.value = ""
    isEmailValid(input.value)
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} title="Вход">
        <div className="modal-auth__form-block">
          <form action="#" className="modal-auth__form">
            <div
              className={
                hide
                  ? "modal-auth__input-block hide"
                  : "modal-auth__input-block"
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
                className="clear-icon hide"
                src={clear}
                alt=""
                onClick={() => clearInput()}
              />
              <p className="valid-error hide">Некорректный e-mail</p>
            </div>
            <button
              type="submit"
              className={
                hide ? "modal-auth__button hide" : "modal-auth__button"
              }
              onClick={(e) => checkEmail(e)}>
              Далее
            </button>
            {emailInDB ? (
              <>
                <div className="modal-auth__input-block">
                  <input
                    className="modal-auth__input"
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="true"
                    onChange={(e) => setPassToCheck(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
                <button
                  type="submit"
                  className="modal-auth__button"
                  onClick={(e) => checkPass(e)}>
                  Вход
                </button>
              </>
            ) : null}
          </form>
        </div>
      </Modal>
    </>
  )
}
