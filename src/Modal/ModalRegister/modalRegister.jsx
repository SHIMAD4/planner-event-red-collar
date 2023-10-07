import infoIcon from "../../shared/icons/info-icon.svg"
import "../../shared/scss/Modal/ModalRegister/ModalRegister.scss"
import Modal from "../Modal"

export default function ModalAuthRegister({ onClose, isOpen }) {
  const info =
    "В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } /  _ {} $ # )"

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Регистрация">
      <div className="modal-register__form-block">
        <div className="info-block">
          <img src={infoIcon} alt="" />
          <p>{info}</p>
        </div>
        <form action="#" className="modal-register__form">
          <div className="modal-register__input-block">
            <input
              className="modal-register__input"
              type="text"
              id="username"
              name="username"
              autoComplete="true"
              required
            />
            <label htmlFor="username">Имя</label>
          </div>
          <div className="modal-register__input-block">
            <input
              className="modal-register__input"
              type="pass"
              id="pass"
              name="pass"
              autoComplete="true"
              required
            />
            <label htmlFor="pass">Пароль</label>
          </div>
          <div className="modal-register__input-block">
            <input
              className="modal-register__input"
              type="pass"
              id="pass2"
              name="pass2"
              autoComplete="true"
              required
            />
            <label htmlFor="pass2">Повторить пароль</label>
          </div>
          <button
            type="submit"
            className="modal-register__button"
            onClick={() => {
              console.log("Регистрация")
            }}
            disabled>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </Modal>
  )
}
