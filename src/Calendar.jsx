import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import './assets/css/Calendar.css';

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
      alert('Вход');
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
<<<<<<< Updated upstream
      className="calendar"
      plugins={[ dayGridPlugin, interactionPlugin ]}
      dateClick={ handleDateClick }
      initialView="dayGridMonth"
      selectable= { true }
      editable= { true }
      events={ events }
      eventContent={ renderEventContent }
      headerToolbar={ headerToolbar }
      titleFormat={{ month: 'long' }}
      locale= 'ru'
      height={ 851 }
      customButtons= {{ authButton }}
=======
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
>>>>>>> Stashed changes
    />
  )
}

async function getData() {
  try {
    const response = await fetch('https://planner.rdclr.ru/api/events', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer be60dcc0d4d62b89123c4e982cd40eb40dcc59d58498f5b30df0b4f56ec59e8e1ac1ab912f6cca0fe2a9f6bf6f16c2685a52e92a7f9bcfe92d757d258c19ec495e346577def4052bf3ae917cd95ed3acb7cdb1985e72075770fcab4b13d05dc7301819b735445f29fcb97d6e6927986e34008970bb38c051a8a6a3b9dce5375d',
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