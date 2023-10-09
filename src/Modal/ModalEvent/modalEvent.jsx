import { useEffect, useState } from "react"
import { api } from "../../shared/api"
import "../../shared/scss/Modal/ModalEvent/ModalEvent.scss"
import Modal from "../Modal"
import ModalAuth from "../ModalAuth/modalAuth"
import ModalError from "../ModalError/modalError"
import ModalEventGallery from "./modalEventGallery"
import ModalEventInfo from "./modalEventInfo"
import ModalEventParticipants from "./modalEventParticipants"

export default function ModalEvent({ event, onClose, isOpen }) {
  const [openAuth, setOpenAuth] = useState(false)
  const [auth, setAuth] = useState(false)
  const [firstModalOpen, setFirstModalOpen] = useState(true)
  const [happyModal, setHappyModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("access_token")) setAuth(true)
  }, [])

  if (!event) return null

  const closeFirstModal = () => {
    setFirstModalOpen(false)
  }

  const joinToEvent = () => {
    api.event
      .join(+event.id, { flag: true })
      .then(() => setHappyModal(true))
      .catch((err) => {
        if (err.response.status > 299 || err.response.status < 200) {
          setErrorModal(true)
        }
      })
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
              <button onClick={(e) => joinToEvent(e)}>Присоединиться к событию</button>
              {errorModal ? <ModalError onClose={onClose} isOpen={isOpen} /> : null}
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
