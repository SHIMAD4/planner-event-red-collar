import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import "./assets/scss/Calendar.scss"

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

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
  const getAllData = axios.create({
    baseURL: "https://planner.rdclr.ru/api/",
    headers: {
      post: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  })

  useEffect(() => {
    getAllData
      .get("events?populate=*&")
      .then((res) => res.data.data)
      .then((data) => {
        if (!data) return null
        data.forEach((elem) => {
          const elemDate = new Date(elem.start)
          const dateNow = new Date()
          elem.start = elem.dateStart.split("T")[0]
          if (elemDate < dateNow) elem.className = "past"
        })
        setEvents(data)
      })
      .catch((err) => console.log(err))
  }, [getAllData])

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
