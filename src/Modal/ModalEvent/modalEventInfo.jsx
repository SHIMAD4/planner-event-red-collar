import "../../shared/scss/Modal/ModalEvent/ModalEventInfo.scss"

export default function modalEventInfo({ event }) {
  const start = new Date(event.extendedProps.dateStart)
  const weekday = start.toLocaleString("ru-RU", { weekday: "long" })
  const date = start.toLocaleDateString()
  const time = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const description = event.extendedProps.description
  const location = event.extendedProps.location

  let isPast = event.classNames[0] === "past" ? true : false
  return (
    <div
      className={
        isPast ? "modal__event-info__block past" : "modal__event-info__block"
      }>
      <aside className="modal__event-info">
        <div className="modal__event-info__day">
          <p>{weekday}</p>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <p className="modal__event-info__address" aria-label="Адрес">
          {location}
        </p>
      </aside>
      <p className="modal__desc">{description}</p>
    </div>
  )
}
