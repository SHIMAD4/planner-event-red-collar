import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { useCallback, useEffect, useState } from "react"
import Modal from "./Modal"
import "./assets/scss/Calendar.scss"
import { baseRequestURL } from "./shared/api"

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const headerToolbar = {
    start: "",
    center: "",
    end: "title prev next authButton",
  }
  const authButton = {
    text: "Войти",
    click: function () {
      console.log("Вход")
    },
  }

  const getEvents = useCallback(() => {
    baseRequestURL
      .get("events?populate=*&", {})
      .then((res) => res.data.data)
      .then((data) => {
        if (!data) return null
        data.forEach((elem) => {
          elem.start = elem.dateStart.split("T")[0]
          if (new Date(elem.start) < new Date()) elem.className = "past"
        })
        setEvents(data)
      })
      .catch((err) => console.log(err.response.data.error))
  }, [])
  const getUsers = useCallback(() => {
    baseRequestURL
      .get("users")
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data.error))
  }, [])

  useEffect(() => {
    if (loaded) return
    getEvents()
    getUsers()
    setLoaded(true)
  }, [getEvents, getUsers, loaded])

  const handleDateClick = (arg) => {
    console.log(arg)
  }
  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event)
  }

  return (
    <>
      <FullCalendar
        height={851}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        customButtons={{ authButton }}
        titleFormat={{ month: "long" }}
        locale="ru"
        firstDay={1}
        selectable={true}
        events={events}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <Modal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isOpen={true}
        />
      )}
    </>
  )
}

function renderEventContent(eventInfo) {
  if (eventInfo.event.start < new Date()) {
    return (
      <div className="event past">
        <p className="event__title">{eventInfo.event.title}</p>
      </div>
    )
  } else {
    return (
      <div className="event">
        <p className="event__title">{eventInfo.event.title}</p>
      </div>
    )
  }
}
