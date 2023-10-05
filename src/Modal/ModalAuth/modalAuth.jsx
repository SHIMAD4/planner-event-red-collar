import "../../shared/scss/Modal/ModalAuth/ModalAuth.scss"
import Modal from "../Modal"

export default function ModalAuth({ onClose, isOpen }) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} title="Вход">
        <div className="modal-auth__form-block">
          <form action="#" className="modal-auth__form">
            <div className="modal-auth__input">
              <input
                type="text"
                required
                id="email"
                name="email"
                autoComplete="true"
              />
              <label htmlFor="email">Email</label>
            </div>
          </form>
          <button className="modal-auth__button">Далее</button>
        </div>
      </Modal>
    </>
  )
}
