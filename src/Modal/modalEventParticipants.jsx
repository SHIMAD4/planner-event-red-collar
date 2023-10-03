export default function Participants({ event }) {
  const participants = event.extendedProps.participants
  if (participants.length === 0) return null
  console.log("participants", participants)
  return (
    <>
      <h2 className="modal__people__desc">Участники</h2>
      <ul className="modal__people" role="list">
        {participants.map((item, index) => {
          return <li key={index}>{item.username}</li>
        })}
      </ul>
    </>
  )
}
