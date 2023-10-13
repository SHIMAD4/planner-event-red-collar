import "../../shared/scss/Modal/ModalQuestion/ModalQuestion.scss"
import Modal from "../Modal"

export default function ModalQuestion({ onClose, isOpen }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} id="modal-question" title="Передумали создавать событие?">
      <div className="modal-question__buttons">
        <button
          className="modal-question__button--first"
          onClick={() => {
            onClose(true)
          }}>
          Нет
        </button>
        <button
          className="modal-question__button--second"
          onClick={() => {
            onClose(false)
          }}>
          Да
        </button>
      </div>
    </Modal>
  )
}
