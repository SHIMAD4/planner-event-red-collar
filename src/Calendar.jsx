import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import './assets/css/Calendar.css';

export default function Calendar() {
  const events = [
    { title: 'Final deadline', start: new Date(2023, 9, 20) },
    { title: 'Final deadliadsadsadsadsadsadsadsasdasadsadsssd', start: new Date(2023, 8, 20) },
    { title: 'Final deadliadsadsadsadsadsadsadsasdasadsadsssd', start: new Date(2023, 8, 19) },
    { title: 'Final deadliadsadsadsadsadsadsadsasdasadsadsssd', start: new Date(2023, 8, 18) },
  ]

  const handleDateClick = (arg) => {
    console.log(arg);
  }
  
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
  
  return (
    <FullCalendar
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
    />
  )
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