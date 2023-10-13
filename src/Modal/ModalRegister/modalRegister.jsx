import { useState } from "react"
import { Input } from "../../Input/Input"
import { api } from "../../shared/api"
import infoIcon from "../../shared/icons/info-icon.svg"
import "../../shared/scss/Modal/ModalRegister/ModalRegister.scss"
import Modal from "../Modal"
import ModalError from "../ModalError/modalError"

export default function ModalAuthRegister({ onClose, isOpen, email }) {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [passRepeat, setPassRepeat] = useState("")
  const [modalOpen, setModalOpen] = useState(true)
  const [modalError, setModalError] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const bc = new BroadcastChannel("token_channel")

  const info =
    "В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } /  _ {} $ # )"

  const PASS_REGEXP = /^[A-Za-z0-9.,:;?!*+%\-<>@[\]{}_{}$#]{8,32}$/
  const isPasswordValid = PASS_REGEXP.test(pass)

  const handleSubmit = (e) => {
    e.preventDefault()
    const validErrorEquality = document.querySelector(".valid-error-equality")
    const validErrorSymbol = document.querySelector(".valid-error-symbols")
    const validErrorRequired = document.querySelectorAll(".valid-error-required")
    const inputs = document.querySelectorAll(".modal-register__input")

    if (username === "") {
      validErrorRequired[0].classList.remove("hide")
      inputs[0].classList.add("isInvalid")
    } else {
      validErrorRequired[0].classList.add("hide")
      inputs[0].classList.remove("isInvalid")
    }

    if (pass === "") {
      validErrorRequired[1].classList.remove("hide")
      validErrorSymbol.classList.add("hide")
      inputs[1].classList.add("isInvalid")
      inputs[1].classList.remove("isValid")
    } else if (!isPasswordValid) {
      validErrorSymbol.classList.remove("hide")
      validErrorRequired[1].classList.add("hide")
      inputs[1].classList.remove("isValid")
      inputs[1].classList.add("isInvalid")
    } else {
      validErrorRequired[1].classList.add("hide")
      validErrorSymbol.classList.add("hide")
      inputs[1].classList.remove("isInvalid")
      inputs[1].classList.add("isValid")
    }

    if (passRepeat === "") {
      validErrorRequired[2].classList.remove("hide")
      validErrorEquality.classList.add("hide")
      inputs[2].classList.remove("isValid")
      inputs[2].classList.add("isInvalid")
    } else if (pass !== passRepeat) {
      validErrorRequired[2].classList.add("hide")
      validErrorEquality.classList.remove("hide")
      inputs[2].classList.remove("isValid")
      inputs[2].classList.add("isInvalid")
    } else {
      validErrorRequired[2].classList.add("hide")
      validErrorEquality.classList.add("hide")
      inputs[2].classList.remove("isInvalid")
      inputs[2].classList.add("isValid")
    }

    if (isPasswordValid && pass !== "" && pass === passRepeat) {
      api.user
        .register({ username, email, password: passRepeat }, { flag: false })
        .then((res) => {
          localStorage.setItem("access_token", res.data.jwt)
          bc.postMessage("Token")
          bc.close()
        })
        .catch((err) => {
          if (err.response.status > 299 || err.response.status < 200) {
            console.log("Ошибка сервера")
            setModalError(true)
          }
        })
      setModalOpen(false)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)

    const inputs = document.querySelectorAll(".modal-register__input")
    for (let i = 1; i < inputs.length; i++) {
      if (inputs[i].type === "password") {
        inputs[i].type = "text"
      } else {
        inputs[i].type = "password"
      }
    }
  }

  return modalOpen ? (
    <Modal onClose={onClose} isOpen={isOpen} title="Регистрация">
      <div className="modal-register__form-block">
        <div className="info-block">
          <img src={infoIcon} alt="infoIcon" />
          <p>{info}</p>
        </div>
        <form action="#" className="modal-register__form" onSubmit={(e) => handleSubmit(e)}>
          <Input
            className="modal-register__input"
            title="Имя"
            type="text"
            id="username"
            errorRequired="Обязательное поле"
            number={1}
          />
          <Input
            className="modal-register__input"
            title="Пароль"
            type="password"
            id="password"
            errorSymbols="Используйте латинские буквы, цифры и спец символы"
            errorRequired="Обязательное поле"
            number={2}
            isPasswordVisible={!isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <Input
            className="modal-register__input"
            title="Повторить пароль"
            type="password"
            id="password2"
            errorEquality="Пароли не совпадают"
            errorRequired="Обязательное поле"
            number={3}
            isPasswordVisible={!isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <button
            type="submit"
            className="modal-register__button"
            onClick={() => {
              const inputs = document.querySelectorAll(".modal-register__input")
              setUsername(inputs[0].value)
              setPass(inputs[1].value)
              setPassRepeat(inputs[2].value)
            }}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </Modal>
  ) : modalError ? (
    <ModalError onClose={onClose} isOpen={isOpen} />
  ) : null
}
