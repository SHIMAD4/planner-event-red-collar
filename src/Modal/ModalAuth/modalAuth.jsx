import { useState } from "react"
import { api } from "../../shared/api"
import "../../shared/scss/Modal/ModalAuth/ModalAuth.scss"
import Modal from "../Modal"

export default function ModalAuth({ onClose, isOpen }) {
  const [emailToCheck, setEmailToCheck] = useState("")
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passToCheck, setPassToCheck] = useState("")
  const [hide, setHide] = useState(false)

  const checkEmail = (e) => {
    e.preventDefault()
    api.check
      .email(emailToCheck, {
        flag: false,
      })
      .then((res) => {
        if (res.status === 204) {
          setEmailIsValid(true)
          setHide(true)
        }
      })
      .catch((err) => console.log(err.response.data.error))
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
      .catch((err) => console.log(err.response.data.error))
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} title="Вход">
        <div className="modal-auth__form-block">
          <form action="#" className="modal-auth__form">
            <div
              className={hide ? "modal-auth__input hide" : "modal-auth__input"}>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="true"
                onChange={(e) => setEmailToCheck(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <button
              type="submit"
              className={
                hide ? "modal-auth__button hide" : "modal-auth__button"
              }
              onClick={(e) => checkEmail(e)}>
              Далее
            </button>
            {emailIsValid ? (
              <>
                <div className="modal-auth__input">
                  <input
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
