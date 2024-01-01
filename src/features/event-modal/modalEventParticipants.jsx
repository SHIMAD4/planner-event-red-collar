import avatar from '../../../public/images/avatar.png'
import './ModalEventParticipants.scss'

export default function ModalEventParticipants({ event }) {
    const participants = event.extendedProps.participants
    const participantsCount = participants.length
    let organizer = undefined

    if (participants.length === 0) return null

    if (event.extendedProps.owner !== null) organizer = event.extendedProps.owner.username

    const otherParticipants = participants.filter((item) => +event.id !== item.id)

    return (
        <>
            <h2 className="modal__people__desc">Участники</h2>
            <ul className="modal__people__list" role="list">
                {organizer && (
                    <li key={self.crypto.randomUUID()}>
                        <img className="modal__people__avatar" src={avatar} alt="avatar" />
                        <div className="modal__people__info">
                            <p className="modal__people__username">{organizer}</p>
                            <p className="modal__people__role">Организатор</p>
                        </div>
                    </li>
                )}
                {otherParticipants.slice(0, 4).map((item) => (
                    <li key={self.crypto.randomUUID()}>
                        <img className="modal__people__avatar" src={avatar} alt="avatar" />
                        <div className="modal__people__info">
                            <p className="modal__people__username">{item.username}</p>
                        </div>
                    </li>
                ))}
                {participantsCount > 4 && (
                    <div key={self.crypto.randomUUID()}>
                        <img className="photo1" src={avatar} alt="avatar" />
                        <img className="photo2" src={avatar} alt="avatar" />
                        <img className="photo3" src={avatar} alt="avatar" />
                        <p className="count">Еще +{participantsCount - 4}</p>
                    </div>
                )}
            </ul>
        </>
    )
}
