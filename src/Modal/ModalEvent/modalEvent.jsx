import { useState } from "react"
import "../../shared/scss/Modal/ModalEvent/ModalEvent.scss"
import Modal from "../Modal"
import ModalAuth from "../ModalAuth/modalAuth"
import ModalEventGallery from "./modalEventGallery"
import ModalEventInfo from "./modalEventInfo"
import ModalEventParticipants from "./modalEventParticipants"

export default function ModalEvent({ event, onClose, isOpen }) {
  const [auth, setAuth] = useState(false)
  const [firstModalOpen, setFirstModalOpen] = useState(true)

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
          <p className="modal__auth">
            <a
              onClick={() => {
                setAuth(true)
                closeFirstModal()
              }}>
              Войдите
            </a>
            , чтобы присоединиться к событию
          </p>
        </Modal>
      )}
      {auth && (
        <ModalAuth
          onClose={() => {
            setAuth(false)
            setFirstModalOpen(true)
          }}
          isOpen={true}
        />
      )}
    </>
  )
}
