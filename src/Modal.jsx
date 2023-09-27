import './assets/css/Modal.css';
import closeIcon from './assets/icons/close.svg';
import Ilya from './assets/img/1.png';
import Katya from "./assets/img/2.png";
import Denis from "./assets/img/3.png";
import g1 from './assets/img/g1.png';
import g2 from "./assets/img/g2.png";
import g3 from "./assets/img/g3.png";
import closeModal from './utils';

export default function Modal() {
    return (
        <div className="modal">
            <div className="modal__bg" onClick={(e) => closeModal(e)}></div>
            <div className="modal__body">
                <h2 className="modal__title">Фестивать Будущее</h2>
                <img className='modal__close-icon' src={closeIcon} alt="close" onClick={(e) => closeModal(e)}/>
                <div className="modal__event-info">
                <aside>
                    <div className="modal__event-info__day">
                        <p>пятница</p>
                        <p>21 сентября</p>
                        <p>12:00</p>
                    </div>
                    <p className="modal__event-info__address">г.Москва, Ленинградский проспект, 80</p>
                </aside>
                <p className='modal__desc'>Это независимый музыкальный фестиваль талантливых артистов, которые уже собирают крупнейшие залы поклонников по всей России или только начинают свой творческий путь. Главное, что объединяет участников фестиваля — эмоции, которые они передают слушателям, погружая их в особенную атмосферу своего выступления.</p>
                </div>
                <h2 className='modal__people__desc'>Участники</h2>
                <div className="modal__people">
                    <ul className='modal__people__list'>
                        <li>
                            <img src={Ilya} alt="avatar" />
                            <div>
                                <p>Илья</p>
                                <p>Организатор</p>
                            </div>
                        </li>
                        <li>
                            <img src={Katya} alt="avatar" />
                            <p>Екатерина</p>
                        </li>
                        <li>
                            <img src={Denis} alt="avatar" />
                            <p>Денис</p>
                        </li>
                    </ul>
                </div>
                <h2 className='modal__gallery__desc'>Галерея</h2>
                <ul className='modal__gallery__list'>
                    <li>
                        <img src={g1} alt="gallery photo" />
                    </li>
                    <li>
                        <img src={g2} alt="gallery photo" />
                    </li>
                    <li>
                        <img src={g3} alt="gallery photo" />
                    </li>
                </ul>
                <p className='modal__auth'><a href=''>Войдите</a>, чтобы присоединиться к событию</p>
            </div>
        </div>
    )
}