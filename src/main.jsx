import ReactDOM from 'react-dom/client';
import Calendar from './Calendar.jsx';
import Header from './Header.jsx';
import Modal from './Modal.jsx';
import './assets/css/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Modal />
    <Calendar />
  </>
)
