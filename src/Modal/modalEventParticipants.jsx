import avatar from "../assets/icons/avatar.png"

export default function Participants({ event }) {
  const participants = event.extendedProps.participants
  const participantsCount = participants.length

  if (participants.length === 0) return null

  return (
    <>
      <h2 className="modal__people__desc">Участники</h2>
      <ul className="modal__people" role="list">
        {participants.map((item, index) => {
          return index < 4 ? (
            <li key={self.crypto.randomUUID()}>
              <img src={avatar} alt="" />
              <div className="modal__people__info">
                <p className="modal__people__username">{item.username}</p>
                {+event.id === item.id ? (
                  <p className="modal__people__role">Организатор</p>
                ) : null}
              </div>
            </li>
          ) : index > 4 ? (
            <div key={self.crypto.randomUUID()}>
              <img className="photo1" src={avatar} alt="" />
              <img className="photo2" src={avatar} alt="" />
              <img className="photo3" src={avatar} alt="" />
              <p className="count">Eще +{participantsCount - 4}</p>
            </div>
          ) : null
        })}
      </ul>
    </>
  )
}
