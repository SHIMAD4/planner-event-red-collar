import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import './assets/css/Calendar.css';
import closeModal from './utils';

export default function Calendar() {
  const [events, setEvents] = useState([])
  const headerToolbar = {
    start: '',
    center: '',
    end: 'title prev next authButton'
  }
  const authButton = {
    text: 'Войти',
    click: function() {
      console.log()
    }
  }

  useEffect(() => {
    getData().then(data => {
      data.forEach(elem => {
        elem.start = elem.dateStart.split('T')[0]
      })
      setEvents(data)
    })
  }, [])

  const handleDateClick = (arg) => {
    console.log(arg)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      initialView="dayGridMonth"
      selectable={true}
      editable={true}
      events={events}
      eventContent={renderEventContent}
      headerToolbar={headerToolbar}
      titleFormat={{ month: 'long' }}
      locale="ru"
      height={851}
      customButtons={{ authButton }}
      firstDay={1}
    />
  )
}

async function getData() {
  try {
    const response = await fetch('https://planner.rdclr.ru/api/events', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer e856de606d770bc1f0441a0c7fd8dc5297f855a8b96a00924fe2f1640ed949162dadbe0339a70e3e1717231d87c5e3328715a00f86aa21bf355a7f8146f1ad0287c5731f1a751dab6410d6afffe0909c7acaefdd639d89f6ab23a0e2b282ad3c85dd55bee58fe544ad112e7c683b6ff8db39cff814770f9d1a1d6ba4e3851d5e',
      },
    })
    const json = await response.json()
    return json.data
  } catch (err) {
    console.log(err)
    return []
  }
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