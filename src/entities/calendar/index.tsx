import {
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import avatarIcon from '../../../public/images/avatar.png';
import ModalAuth from '../../features/auth-modal/modalAuth.jsx';
import ModalCreateEvent from '../../features/create-event-modal/modalCreateEvent.jsx';
import ModalEvent from '../../features/event-modal/modalEvent.jsx';
import { api } from '../../shared/api';
import './styles.scss';

export const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [auth, setAuth] = useState(false);
    const [authToken, setAuthToken] = useState(false);
    const [createEvent, setCreateEvent] = useState(false);
    const [myEmail, setMyEmail] = useState(false);

    const bc = new BroadcastChannel('token_channel');
    bc.addEventListener('message', () => {
        setAuthToken(!!localStorage.getItem('access_token'));
    });

    const createAvatar = useCallback(() => {
        const avatarButton = document.querySelector('.fc-avatarButton-button');
        if (avatarButton) {
            const img = document.createElement('img');
            img.src = avatarIcon;
            avatarButton.append(img);
            for (let i = 1; i < avatarButton.childNodes.length; i++) {
                if (avatarButton.childNodes[i + 1]) {
                    avatarButton.childNodes[i + 1].remove();
                }
            }
        }
        if (authToken && avatarButton) {
            avatarButton.style.display = 'flex';
        }
    }, [authToken]);

    const avatarButton = {};

    const headerToolbar = {
        start: '',
        center: '',
        end: `title prev next ${
            authToken ? 'createEventButton avatarButton' : 'authButton avatarButton'
        }`,
    };

    const authButton = {
        text: 'Войти',
        click() {
            setAuth(true);
        },
    };
    const createEventButton = {
        text: '+',
        click() {
            setCreateEvent(true);
        },
    };

    const getEvents = useCallback(() => {
        api.event
            .list({ flag: false })
            .then((res) => res.data.data)
            .then((data) => {
                if (!data) {
                    return null;
                }
                data.forEach(
                    (elem: {
                        start: string | number | Date;
                        dateStart: string;
                        className: string;
                        participants: any[];
                        owner: { email: boolean } | null;
                    }) => {
                        elem.start = elem.dateStart.split('T')[0];
                        if (new Date(elem.start) < new Date()) {
                            elem.className = 'past';
                        }
                        elem.participants.forEach((user) => {
                            if (myEmail) {
                                if (myEmail === user.email) {
                                    elem.className = 'joined';
                                }
                                if (elem.owner !== null && myEmail === elem.owner.email) {
                                    elem.className = 'created-by';
                                }
                            }
                        });
                    },
                );

                setEvents(data);
            })
            .catch((error) => console.log(error.response.data.error));
    }, [myEmail]);

    const getMe = () => {
        api.user.me({ flag: true }).then((res) => {
            setMyEmail(res.data.email);
        });
    };

    useEffect(() => {
        getEvents();
        setTimeout(() => {
            createAvatar();
        }, 0);
        getMe();
        setAuthToken(!!localStorage.getItem('access_token'));
    }, [getEvents, createAvatar]);

    const handleEventClick = (eventInfo: { event: SetStateAction<null> }) => {
        setSelectedEvent(eventInfo.event);
    };

    return authToken ? (
        <>
            <FullCalendar
                height={851}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={headerToolbar}
                customButtons={{ createEventButton, avatarButton }}
                titleFormat={{ month: 'long' }}
                locale="ru"
                firstDay={1}
                selectable
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventOrder="dateStart"
            />
            {selectedEvent && (
                <ModalEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} isOpen />
            )}
            {auth && <ModalAuth onClose={() => setAuth(false)} isOpen />}
            {createEvent && <ModalCreateEvent onClose={() => setCreateEvent(false)} isOpen />}
        </>
    ) : (
        <>
            <FullCalendar
                height={851}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={headerToolbar}
                customButtons={{ authButton, createEventButton, avatarButton }}
                titleFormat={{ month: 'long' }}
                locale="ru"
                firstDay={1}
                selectable
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventOrder="dateStart"
            />
            {selectedEvent && (
                <ModalEvent event={selectedEvent} onClose={() => setSelectedEvent(null)} isOpen />
            )}
            {auth && <ModalAuth onClose={() => setAuth(false)} isOpen />}
        </>
    );
};

function renderEventContent(eventInfo: {
    event: {
        start: number;
        title:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined;
    };
}) {
    if (new Date(eventInfo.event.start) < new Date()) {
        return (
            <div className="event past">
                <p className="event__title">{eventInfo.event.title}</p>
            </div>
        );
    }

    return (
        <div className="event">
            <p className="event__title">{eventInfo.event.title}</p>
        </div>
    );
}
