import FocusTrap from "focus-trap-react"
import { useEffect, useState } from "react"
import Gallery from "./Modal/modalEventGallery"
import ModalEventInfo from "./Modal/modalEventInfo"
import Participants from "./Modal/modalEventParticipants"
import closeIcon from "./assets/icons/close.svg"
import "./assets/scss/Modal.scss"

export default function Modal({ event, onClose, isOpen }) {
  const [activeTrap, setActiveTrap] = useState(false)

  useEffect(() => {
    if (isOpen) {
      mountTrap()
    }
  }, [isOpen])

  const mountTrap = () => setActiveTrap(true)
  const unmountTrap = () => setActiveTrap(false)

  if (!event) return null

  return (
    <>
      <FocusTrap focusTrapOptions={{ onDeactivate: unmountTrap }}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal__title"
          className="modal">
          <div className="modal__bg" onClick={(e) => onClose(e)}></div>
          <div className="modal__body">
            <h2 id="modal__title" className="modal__title">
              {event.title}
            </h2>
            <button
              className="modal__close-icon"
              onClick={(e) => onClose(e)}
              aria-label="Закрыть"
              role="button">
              <img src={closeIcon} alt="close" />
            </button>
            <ModalEventInfo event={event} />
            <Participants />
            <Gallery event={event} />
            <p className="modal__auth">
              <a href="">Войдите</a>, чтобы присоединиться к событию
            </p>
          </div>
        </div>
      </FocusTrap>
    </>
  )
}
