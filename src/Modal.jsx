import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import arrow from './assets/icons/arrow.svg';
import closeIcon from './assets/icons/close.svg';
import './assets/scss/Modal.scss';
import './assets/scss/Slider.scss';

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

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  if(event.extendedProps.photos) {
    event.extendedProps.photos.forEach(elem => {
      elem.src = 'https://planner.rdclr.ru' + elem.url
      photos.push(elem)
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
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            slidesPerView={3.3}
          >
            {
              photos.map((item, key) => {
                return <SwiperSlide key={key}><li><img src={item.src} alt="" width={item.width} height={item.height}/></li></SwiperSlide>
              })
            }
          </Swiper>
          <div className="next" ref={navigationNextRef}>
            <img src={arrow} alt="" />
          </div>
          <div className="prev" ref={navigationPrevRef}>
            <img src={arrow} alt="" />
          </div>
        </ul>
        <p className='modal__auth'><a href=''>Войдите</a>, чтобы присоединиться к событию</p>
      </div>
    </div>
  )
}