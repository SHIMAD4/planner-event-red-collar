import { useEffect, useState } from "react"
import "../../shared/scss/Modal/ModalEvent/ModalEvent.scss"
import Modal from "../Modal"
import ModalAuth from "../ModalAuth/modalAuth"
import ModalEventGallery from "./modalEventGallery"
import ModalEventInfo from "./modalEventInfo"
import ModalEventParticipants from "./modalEventParticipants"

export default function ModalEvent({ event, onClose, isOpen }) {
  const [openAuth, setOpenAuth] = useState(false)
  const [auth, setAuth] = useState(false)
  const [firstModalOpen, setFirstModalOpen] = useState(true)

  useEffect(() => {
    if (localStorage.getItem("access_token")) setAuth(true)
  }, [])

  if (!event) return null

  const closeFirstModal = () => {
    setFirstModalOpen(false)
  }

  return (
    <>
      {firstModalOpen && (
        <Modal onClose={onClose} isOpen={isOpen} title={event.title}>
          <ModalEventInfo event={event} />
          <ModalEventParticipants event={event} />
          <ModalEventGallery event={event} />
          {!auth ? (
            <p className="modal__auth">
              <a
                onClick={() => {
                  setOpenAuth(true)
                  closeFirstModal()
                }}>
                Войдите
              </a>
              , чтобы присоединиться к событию
            </p>
          ) : (
            <div className="modal-event__button">
              <button>Присоединиться к событию</button>
            </div>
          )}
        </Modal>
      )}
      {openAuth && (
        <ModalAuth
          onClose={() => {
            setOpenAuth(false)
            setFirstModalOpen(true)
          }}
          isOpen={true}
        />
      )}
    </>
  )
}
