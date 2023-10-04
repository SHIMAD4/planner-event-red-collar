import FocusTrap from "focus-trap-react"
import { useEffect, useState } from "react"
import closeIcon from "../shared/icons/close.svg"
import "../shared/scss/ModalAuth.scss"

export default function ModalAuth({ onClose, isOpen }) {
  const [activeTrap, setActiveTrap] = useState(false)

  useEffect(() => {
    if (isOpen) {
      mountTrap()
    }
  }, [isOpen])

  const mountTrap = () => setActiveTrap(true)
  const unmountTrap = () => setActiveTrap(false)

  return (
    <>
      {activeTrap ? (
        <FocusTrap focusTrapOptions={{ onDeactivate: unmountTrap }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal__title"
            className="modal-auth">
            <div className="modal-auth__bg" onClick={(e) => onClose(e)}></div>
            <div className="modal-auth__body">
              <h2 id="modal__title" className="modal-auth__title">
                Вход
              </h2>
              <button
                className="modal-auth__close-icon"
                onClick={(e) => onClose(e)}
                aria-label="Закрыть"
                role="button">
                <img src={closeIcon} alt="close" />
              </button>
              <div className="modal-auth__form-block">
                <form action="#">
                  <div className="">
                    <input type="text" required />
                    <label htmlFor="">Email</label>
                  </div>
                </form>
                <button className="modal-auth__button">Далее</button>
              </div>
            </div>
          </div>
        </FocusTrap>
      ) : (
        false
      )}
    </>
  )
}
