import './ModalHappy.scss';
import Modal from '../modal/Modal.jsx';

export default function ModalHappy({ onClose, isOpen, event }) {
    let start = '';
    let location = '';
    if (event.hasOwnProperty('extendedProps')) {
        start = new Date(event.extendedProps.dateStart);
        location = event.extendedProps.location;
    } else {
        start = new Date(event.dateStart);
        location = event.location;
    }
    const weekday = start.toLocaleString('ru-RU', { weekday: 'long' });
    const date = start.toLocaleDateString();
    const time = start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Modal onClose={onClose} isOpen={isOpen} id="modal-happy">
            <div className="modal-happy__block">
                <h1 className="modal-happy__title">Поздравляем!</h1>
                <p className="modal-happy__subtitle">Вы теперь участник события</p>
                <p className="modal-happy__event-title">{event.title}</p>
                <ul className="modal-happy__list">
                    <li className="modal-happy__item">{weekday}</li>
                    <li className="modal-happy__item">{date}</li>
                    <li className="modal-happy__item">{time}</li>
                </ul>
                <p className="modal-happy__address">{location}</p>
                <button
                    className="modal-happy__button"
                    onClick={() => {
                        onClose();
                    }}
                >
                    Отлично
                </button>
            </div>
        </Modal>
    );
}
