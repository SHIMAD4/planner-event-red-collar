import { useState } from "react"
import { api } from "../../shared/api"
import eyeClose from "../../shared/icons/eye-icon-close.svg"
import eyeOpen from "../../shared/icons/eye-icon-open.svg"
import infoIcon from "../../shared/icons/info-icon.svg"
import "../../shared/scss/Modal/ModalRegister/ModalRegister.scss"
import Modal from "../Modal"

export default function ModalAuthRegister({ onClose, isOpen, email }) {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [passRepeat, setPassRepeat] = useState("")
  const [modalOpen, setModalOpen] = useState(true)
  const [isPasswordVisible, setPasswordVisible] = useState(false)

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
        .register({ username, email, password: passRepeat })
        .then((res) => localStorage.setItem("access_token", res.data.jwt))
      setModalOpen(false)
    }
  }

  const changePassView = () => {
    setPasswordVisible(!isPasswordVisible)
    const inputs = document.querySelectorAll(".modal-register__input")

    for (let i = 1; i < inputs.length; i++) {
      if (!isPasswordVisible) {
        inputs[i].type = `text`
      } else {
        inputs[i].type = `password`
      }
    }
  }

  return modalOpen ? (
    <Modal onClose={onClose} isOpen={isOpen} title="Регистрация">
      <div className="modal-register__form-block">
        <div className="info-block">
          <img src={infoIcon} alt="" />
          <p>{info}</p>
        </div>
        <form action="#" className="modal-register__form" onSubmit={(e) => handleSubmit(e)}>
          <div className="modal-register__input-block">
            <input
              className="modal-register__input"
              type="text"
              id="username"
              name="username"
              autoComplete="true"
            />
            <label htmlFor="username">Имя</label>
            <p className="valid-error valid-error-required valid-error-required-1 hide">Обязательное поле</p>
          </div>
          <div className="modal-register__input-block">
            <input className="modal-register__input" type="password" id="pass" name="pass" autoComplete="true" />
            <label htmlFor="pass">Пароль</label>
            <img
              className="icon1 eye-close"
              src={isPasswordVisible ? eyeOpen : eyeClose}
              alt=""
              onClick={(e) => changePassView(e)}
            />
            <p className="valid-error valid-error-symbols hide">
              Используйте латинские буквы, цифры и спец символы
            </p>
            <p className="valid-error valid-error-required valid-error-required-2 hide">Обязательное поле</p>
          </div>
          <div className="modal-register__input-block">
            <input className="modal-register__input" type="password" id="pass2" name="pass2" autoComplete="true" />
            <label htmlFor="pass2">Повторить пароль</label>
            <img
              className="icon2 eye-close"
              src={isPasswordVisible ? eyeOpen : eyeClose}
              alt=""
              onClick={(e) => changePassView(e)}
            />
            <p className="valid-error valid-error-equality hide">Пароли не совпадают</p>
            <p className="valid-error valid-error-required valid-error-required-3 hide">Обязательное поле</p>
          </div>
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
  ) : null
}
