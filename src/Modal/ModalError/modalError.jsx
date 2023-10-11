import "../../shared/scss/Modal/ModalError/ModalError.scss"
import Modal from "../Modal"

export default function ModalError({ onClose, isOpen }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} id="modal-error">
      <div className="modal-error__block">
        <h1 className="modal-error__title">Что-то пошло не так</h1>
        <p className="modal-error__subtitle">Попробуйте позже</p>
        <button
          className="modal-error__button"
          onClick={() => {
            onClose()
          }}>
          Хорошо
        </button>
      </div>
    </Modal>
  )
}
