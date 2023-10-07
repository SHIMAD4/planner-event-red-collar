import { useState } from "react"
import { api } from "../../shared/api"
import "../../shared/scss/Modal/ModalAuth/ModalAuth.scss"
import Modal from "../Modal"
import ModalAuthRegister from "../ModalRegister/modalRegister"
import { ModalAuthLogin } from "./modalAuthLogin"
import { ModalAuthPass } from "./modalAuthPass"

export default function ModalAuth({ onClose, isOpen }) {
  const [emailToCheck, setEmailToCheck] = useState("")
  const [emailInDB, setEmailInDB] = useState(false)
  const [passToCheck, setPassToCheck] = useState("")
  const [hide, setHide] = useState(false)
  const [registerUser, setRegisterUser] = useState(false)
  const [modalOpen, setModalOpen] = useState(true)
  const bc = new BroadcastChannel("token_channel")

  const input = document.querySelector(".modal-auth__input")
  const validError = document.querySelector(".valid-error")

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
          if (emailToCheck !== "") {
            setRegisterUser(true)
          } else {
            if (input) {
              input.classList.add("isInvalid")
              validError.classList.remove("hide")
            }
          }
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
        localStorage.setItem("access_token", res.data.jwt)
        bc.postMessage("Token")
        setModalOpen(false)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("Неправильный пароль")
        }
      })
  }

  return (
    <>
      {registerUser ? (
        <ModalAuthRegister onClose={onClose} isOpen={isOpen} email={emailToCheck} />
      ) : modalOpen ? (
        <Modal onClose={onClose} isOpen={isOpen} title="Вход">
          <div className="modal-auth__form-block">
            <form action="#" className="modal-auth__form">
              <ModalAuthLogin checkEmail={checkEmail} hide={hide} setEmailToCheck={setEmailToCheck} />
              {emailInDB ? (
                <ModalAuthPass setPassToCheck={(e) => setPassToCheck(e)} checkPass={(e) => checkPass(e)} />
              ) : null}
            </form>
          </div>
        </Modal>
      ) : null}
    </>
  )
}