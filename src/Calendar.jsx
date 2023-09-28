import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import './assets/css/Calendar.css';

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const headerToolbar = {
    start: '',
    center: '',
    end: 'title prev next authButton'
  }
  const authButton = {
    text: 'Войти',
    click: function() {
      console.log('Вход')
    }
  }

  useEffect(() => {
    getEventsData().then(data => {
      if(!data) return null
      data.forEach(elem => {
        elem.start = elem.dateStart.split('T')[0]
        if(new Date(elem.start) < new Date()) elem.className = 'past'
      })
      setEvents(data)
    })
  }, [])

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
      headerToolbar={ headerToolbar }
      customButtons={{ authButton }}
      titleFormat={{ month: 'long' }}
      locale="ru"
      firstDay={ 1 }

      selectable={ true }

      events={ events }
      eventContent={ renderEventContent }

      dateClick={ handleDateClick }
      eventClick={ handleEventClick }
    />
    {selectedEvent && <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  )
}

async function getEventsData() {
  axios.defaults.baseURL = 'https://planner.rdclr.ru/api/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  return axios()
    .then(res => res.data.data)
    .catch(err => console.log(err))
}

function renderEventContent(eventInfo) {
  if(eventInfo.event.start < new Date()) {
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