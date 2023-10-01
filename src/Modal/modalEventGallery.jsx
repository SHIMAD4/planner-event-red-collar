import Slider from "../Slider"

export default function Gallery({ event }) {
  return (
    <>
      {event.extendedProps.photos ? (
        <>
          <h2 className="modal__gallery__desc">Галерея</h2>
          <ul className="modal__gallery__list" role="list">
            <Slider event={event.extendedProps ? event.extendedProps : null} />
          </ul>
        </>
      ) : null}
    </>
  )
}
