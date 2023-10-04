import FocusTrap from "focus-trap-react"
import { useEffect, useState } from "react"
import closeIcon from "../shared/icons/close.svg"
import "../shared/scss/ModalEvent.scss"
import ModalEventGallery from "./modalEventGallery"
import ModalEventInfo from "./modalEventInfo"
import ModalEventParticipants from "./modalEventParticipants"

export default function ModalEvent({ event, onClose, isOpen }) {
  const [activeTrap, setActiveTrap] = useState(false)

  useEffect(() => {
    if (isOpen) {
      mountTrap()
    }
  }, [isOpen, event])

  const mountTrap = () => setActiveTrap(true)
  const unmountTrap = () => setActiveTrap(false)

  if (!event) return null

  return (
    <>
      {activeTrap ? (
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
              <ModalEventParticipants event={event} />
              <ModalEventGallery event={event} />
              <p className="modal__auth">
                <a href="">Войдите</a>, чтобы присоединиться к событию
              </p>
            </div>
          </div>
        </FocusTrap>
      ) : (
        false
      )}
    </>
  )
}
