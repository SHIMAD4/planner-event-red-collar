import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import './assets/css/Calendar.css';
import closeModal from './utils';

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
      data.forEach(elem => elem.start = elem.dateStart.split('T')[0])
      setEvents(data)
    })
  }, [])

  const handleDateClick = (arg) => {
    console.log(arg)
  }
  const handleEventClick = (eventInfo) => {
    console.log(eventInfo)
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
      editable={ true }

      events={ events }
      eventContent={ renderEventContent }

      dateClick={ handleDateClick }
      eventClick={ handleEventClick }
    />
    {selectedEvent && <Modal event={selectedEvent} />}
    </>
  )
}

async function getEventsData() {
  axios.defaults.baseURL = 'https://planner.rdclr.ru/api/events'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  return axios()
    .then(res => res.data.data)
    .catch(err => console.log(err))
}

function renderEventContent(eventInfo) {
  if(eventInfo.event.start < new Date()) {
    return (
      <div className="event past" onClick={(e) => closeModal(e)}>
        <p className="event__title">{eventInfo.event.title}</p>
      </div>
    )
  } else {
    return (
      <div className="event" onClick={(e) => closeModal(e)}>
        <p className="event__title">{eventInfo.event.title}</p>
      </div>
    )
  }
}