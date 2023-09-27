import './assets/css/Modal.css';
import closeIcon from './assets/icons/close.svg';
import closeModal from './utils';

export default function Modal({ event }) {
  console.log("modal", event)
  // event.weekday = event.start.toLocaleString('ru-RU', { weekday: 'long' })
  // event.date = event.dateStart.toLocaleDateString()
  // event.time = event.dateStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  
  if(!event) {
    return null
  }
  return (
      <div className="modal">
        <div className="modal__bg" onClick={(e) => closeModal(e)}></div>
        <div className="modal__body">
          <h2 className="modal__title">{event.title}</h2>
          <img className='modal__close-icon' src={closeIcon} alt="close" onClick={(e) => closeModal(e)}/>
          <div className="modal__event-info">
            <aside>
              <div className="modal__event-info__day">
                <p>{event.weekday}</p>
                <p>{event.dateStart}</p>
                <p>{event.time}</p>
              </div>
              <p className="modal__event-info__address">{event.location}</p>
            </aside>
            <p className='modal__desc'>{event.description}</p>
          </div>
          <h2 className='modal__people__desc'>Участники</h2>
          <div className="modal__people"></div>
          <h2 className='modal__gallery__desc'>Галерея</h2>
          <ul className='modal__gallery__list'></ul>
          <p className='modal__auth'><a href=''>Войдите</a>, чтобы присоединиться к событию</p>
        </div>
      </div>
    )
}