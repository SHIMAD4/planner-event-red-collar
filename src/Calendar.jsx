import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import FullCalendar from "@fullcalendar/react"
import { useCallback, useEffect, useState } from "react"
import ModalAuth from "./Modal/ModalAuth/modalAuth"
import ModalCreateEvent from "./Modal/ModalCreateEvent/modalCreateEvent"
import ModalEvent from "./Modal/ModalEvent/modalEvent"
import { api } from "./shared/api"
import avatarIcon from "./shared/icons/avatar.png"
import "./shared/scss/Calendar.scss"

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [auth, setAuth] = useState(false)
  const [authToken, setAuthToken] = useState(false)
  const [createEvent, setCreateEvent] = useState(false)
  const [myEmail, setMyEmail] = useState(false)

  const bc = new BroadcastChannel("token_channel")
  bc.onmessage = () => {
    setAuthToken(localStorage.getItem("access_token") ? true : false)
  }

  const createAvatar = useCallback(() => {
    const avatarButton = document.querySelector(".fc-avatarButton-button")
    if (avatarButton) {
      const img = document.createElement("img")
      img.src = avatarIcon
      avatarButton.appendChild(img)
      for (let i = 1; i < avatarButton.childNodes.length; i++) {
        if (avatarButton.childNodes[i + 1]) {
          avatarButton.childNodes[i + 1].remove()
        }
      }
    }
    if (authToken) avatarButton.style.display = "flex"
  }, [authToken])

  const headerToolbar = {
    start: "",
    center: "",
    end: `title prev next ${authToken ? "createEventButton avatarButton" : "authButton avatarButton"}`,
  }

  const authButton = {
    text: "Войти",
    click: function () {
      setAuth(true)
    },
  }
  const createEventButton = {
    text: "+",
    click: function () {
      setCreateEvent(true)
    },
  }
  const avatarButton = {}

  const getEvents = useCallback(() => {
    api.event
      .list({ flag: false })
      .then((res) => res.data.data)
      .then((data) => {
        if (!data) return null
        data.forEach((elem) => {
          elem.start = elem.dateStart.split("T")[0]
          if (new Date(elem.start) < new Date()) elem.className = "past"
          elem.participants.forEach((user) => {
            if (myEmail) {
              if (myEmail === user.email) {
                elem.className = "joined"
              }
              if (myEmail === elem.createdBy) {
                elem.className = "created-by"
              }
            }
          })
        })

        setEvents(data)
      })
      .catch((err) => console.log(err.response.data.error))
  }, [myEmail])

  const getMe = () => {
    api.user.me({ flag: true }).then((res) => {
      setMyEmail(res.data.email)
    })
  }

  useEffect(() => {
    getEvents()
    setTimeout(() => {
      createAvatar()
    }, 0)
    getMe()
    setAuthToken(localStorage.getItem("access_token") ? true : false)
  }, [getEvents, createAvatar])

  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event)
  }

  return authToken ? (
    <>
      <FullCalendar
        height={851}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        customButtons={{ createEventButton, avatarButton }}
        titleFormat={{ month: "long" }}
        locale="ru"
        firstDay={1}
        selectable={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventOrder="dateStart"
      />
      {selectedEvent && <ModalEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} isOpen={true} />}
      {auth && <ModalAuth onClose={() => setAuth(false)} isOpen={true} />}
      {createEvent && <ModalCreateEvent onClose={() => setCreateEvent(false)} isOpen={true} />}
    </>
  ) : (
    <>
      <FullCalendar
        height={851}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        customButtons={{ authButton, createEventButton, avatarButton }}
        titleFormat={{ month: "long" }}
        locale="ru"
        firstDay={1}
        selectable={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventOrder="dateStart"
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
