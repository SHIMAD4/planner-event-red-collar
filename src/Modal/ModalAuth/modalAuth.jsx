import { useState } from "react"
import { api } from "../../shared/api"
import "../../shared/scss/Modal/ModalAuth/ModalAuth.scss"
import Modal from "../Modal"
import { ModalAuthLogin } from "./modalAuthLogin"
import { ModalAuthPass } from "./modalAuthPass"

export default function ModalAuth({ onClose, isOpen }) {
  const [emailToCheck, setEmailToCheck] = useState("")
  const [emailInDB, setEmailInDB] = useState(false)
  const [passToCheck, setPassToCheck] = useState("")
  const [hide, setHide] = useState(false)

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelector(".valid-error")
  const clearIconError = document.querySelector(".clear-icon-alt")
  const clearIcon = document.querySelector(".clear-icon")

  const isEmailValid = (value) => {
    if (!EMAIL_REGEXP.test(value) && value !== "") {
      if (input && validError && clearIcon) {
        input.classList.add("isInvalid")
        validError.classList.remove("hide")
        clearIconError.classList.remove("hide")
        clearIcon.classList.add("hide")
      }
    } else {
      input.classList.remove("isInvalid")
      validError.classList.add("hide")
      clearIconError.classList.add("hide")
      clearIcon.classList.remove("hide")
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
            <ModalAuthLogin
              clearInput={clearInput}
              checkEmail={checkEmail}
              hide={hide}
              setEmailToCheck={setEmailToCheck}
              isEmailValid={isEmailValid}
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
    </>
  )
}
