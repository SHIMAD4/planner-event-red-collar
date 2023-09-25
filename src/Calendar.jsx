import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

export default function Calendar() {
  const events = [
    { title: 'Final deadline', start: new Date(2023, 9, 20) }
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
  return (
    <div className="event">
      <p>{ eventInfo.event.title }</p>
    </div>
  )
}