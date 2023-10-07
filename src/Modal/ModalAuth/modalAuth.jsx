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
  const [firstModalOpen, setFirstModalOpen] = useState(true)

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
          setRegisterUser(true)
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
        setFirstModalOpen(false)
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
        <ModalAuthRegister onClose={onClose} isOpen={isOpen} />
      ) : firstModalOpen ? (
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
