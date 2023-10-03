import avatar from "../assets/icons/avatar.png"

export default function Participants({ event }) {
  const participants = event.extendedProps.participants
  const participantsCount = participants.length

  if (participants.length === 0) return null

  console.log("participants", participants)

  return (
    <>
      <h2 className="modal__people__desc">Участники</h2>
      <ul className="modal__people" role="list">
        {participants.map((item, index) => {
          return index < 4 ? (
            <li key={index}>
              <img src={avatar} alt="" />
              <div className="">
                <p className="modal__people__username">{item.username}</p>
                {+event.id === item.id ? (
                  <p className="modal__people__role">Организатор</p>
                ) : null}
              </div>
            </li>
          ) : index > 4 ? (
            // for(let i = 0; i <= 3; i++) {
            //   participants[i].photos
            // }
            <>
              <img className="photo1" src={avatar} alt="" />
              <img className="photo2" src={avatar} alt="" />
              <img className="photo3" src={avatar} alt="" />
              <p className="count">Eще +{participantsCount - 4}</p>
            </>
          ) : null
        })}
      </ul>
    </>
  )
}
