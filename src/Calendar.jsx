import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { useCallback, useEffect, useState } from "react"
import ModalAuth from "./Modal/ModalAuth/modalAuth"
import ModalEvent from "./Modal/ModalEvent/modalEvent"
import { api } from "./shared/api"
import "./shared/scss/Calendar.scss"

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [auth, setAuth] = useState(false)

  const headerToolbar = {
    start: "",
    center: "",
    end: "title prev next authButton",
  }
  const authButton = {
    text: "Войти",
    click: function () {
      setAuth(true)
    },
  }

  const getEvents = useCallback(() => {
    api.event
      .list({ flag: false })
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

  useEffect(() => {
    if (loaded) return
    getEvents()
    setLoaded(true)
  }, [getEvents, loaded])

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
        eventClick={handleEventClick}
      />
      {selectedEvent && <ModalEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} isOpen={true} />}
      {auth && <ModalAuth onClose={() => setAuth(false)} isOpen={true} />}
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
