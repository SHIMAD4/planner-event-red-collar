import "../../shared/scss/Modal/ModalEvent/ModalEvent.scss"
import Modal from "../Modal"
import ModalEventGallery from "./modalEventGallery"
import ModalEventInfo from "./modalEventInfo"
import ModalEventParticipants from "./modalEventParticipants"

export default function ModalEvent({ event, onClose, isOpen }) {
  if (!event) return null

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={event.title}>
      <ModalEventInfo event={event} />
      <ModalEventParticipants event={event} />
      <ModalEventGallery event={event} />
      <p className="modal__auth">
        <a href="">Войдите</a>, чтобы присоединиться к событию
      </p>
    </Modal>
  )
}
