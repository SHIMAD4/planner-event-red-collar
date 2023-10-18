import avatar from '../../shared/icons/avatar.png'
import '../../shared/scss/Modal/ModalEvent/ModalEventParticipants.scss'

export default function ModalEventParticipants({ event }) {
    const participants = event.extendedProps.participants
    const participantsCount = participants.length

    if (participants.length === 0) return null

    const organizer = participants.find((item) => +event.id === item.id)
    const otherParticipants = participants.filter((item) => +event.id !== item.id)

    return (
        <>
            <h2 className="modal__people__desc">Участники</h2>
            <ul className="modal__people__list" role="list">
                {organizer && (
                    <li key={self.crypto.randomUUID()}>
                        <img className="modal__people__avatar" src={avatar} alt="avatar" />
                        <div className="modal__people__info">
                            <p className="modal__people__username">{organizer.username}</p>
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
