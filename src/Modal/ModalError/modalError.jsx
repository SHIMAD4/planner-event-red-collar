import pigeon from "../../shared/icons/pigeon.png"
import "../../shared/scss/Modal/ModalError/ModalError.scss"
import Modal from "../Modal"

export default function ModalAuth({ onClose, isOpen }) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <div className="modal-error__block">
          <h1 className="modal-error__title">Что-то пошло не так</h1>
          <p className="modal-error__subtitle">Попробуйте позже</p>
          <img className="modal-error__image" src={pigeon} alt="" />
          <button
            className="modal-error__button"
            onClick={() => {
              onClose()
            }}>
            Хорошо
          </button>
        </div>
      </Modal>
    </>
  )
}
