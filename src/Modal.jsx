import closeIcon from './assets/icons/close.svg';
import './assets/scss/Modal.scss';

export default function Modal({ event, onClose }) {
  console.log("modal: ", event)
  const start = new Date(event.extendedProps.dateStart)
  const weekday = start.toLocaleString('ru-RU', { weekday: 'long' })
  const date = start.toLocaleDateString()
  const time = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const description = event.extendedProps.description
  const location = event.extendedProps.location
  const photos = []
  let isPast = event.classNames[0] === 'past' ? true : false

  if(event.extendedProps.photos) {
    event.extendedProps.photos.forEach(elem => {
      photos.push('https://planner.rdclr.ru' + elem.url)
    })
  }
  
  if(!event) {
    return null
  }
  return (
    <div className="modal">
      <div className="modal__bg" onClick={(e) => onClose(e)}></div>
      <div className="modal__body">
        <h2 className="modal__title">{event.title}</h2>
        <img className='modal__close-icon' src={closeIcon} alt="close" onClick={(e) => onClose(e)}/>
        <div className={ isPast ? "modal__event-info past" : "modal__event-info" }>
          <aside>
            <div className="modal__event-info__day">
              <p>{weekday}</p>
              <p>{date}</p>
              <p>{time}</p>
            </div>
            <p className="modal__event-info__address">{location}</p>
          </aside>
          <p className='modal__desc'>{description}</p>
        </div>
        <h2 className='modal__people__desc'>Участники</h2>
        <div className="modal__people"></div>
        <h2 className='modal__gallery__desc'>Галерея</h2>
        <ul className='modal__gallery__list'>
          {
            photos.map((item, key) => {
              return <li key={key}><img src={item} alt=""/></li>
            })
          }
        </ul>
        <p className='modal__auth'><a href=''>Войдите</a>, чтобы присоединиться к событию</p>
      </div>
    </div>
  )
}