import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Dropzone from "react-dropzone"
import Select from "react-select"
import { Input } from "../../Input/Input"
import { api } from "../../shared/api"
import avatar from "../../shared/icons/avatar.png"
import closeIcon from "../../shared/icons/delete-icon.svg"
import "../../shared/scss/Modal/ModalCreateEvent/ModalCreateEvent.scss"
import Modal from "../Modal"

export default function ModalCreateEvent({ onClose, isOpen }) {
  const [username, setUsername] = useState("")
  const [photos, setPhotos] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedDescription, setSelectedDescription] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const selectedUsersId = selectedUsers.map((user) => user.id)

  useEffect(() => {
    api.user
      .me({ flag: true })
      .then((res) => setUsername(res.data.username))
      .catch((err) => console.log(err))
  })

  const sendPhotos = async (array) => {
    return await api.uploads
      .post(array, { flag: true })
      .then((res) => {
        const selectedPhotosId = res.data.map((photo) => photo.id)
        setSelectedPhotos(selectedPhotosId)
        return selectedPhotosId
      })
      .catch((err) => console.log(err.response.data.error))
  }

  const formattedTime = (selectedTime) => {
    const time = selectedTime.split(":")
    startDate.setHours(time[0], time[1], 0)
  }

  const createEvent = (e) => {
    e.preventDefault()

    const formData = new FormData()
    Array.from([...photos]).forEach((file) => {
      formData.append("files", file)
    })

    sendPhotos(formData).then((selectedPhotosId) => {
      formattedTime(selectedTime)

      api.event
        .create(
          {
            title: selectedTitle,
            description: selectedDescription,
            dateStart: startDate.toISOString(),
            dateEnd: endDate ? endDate.toISOString() : null,
            location: selectedLocation,
            participants: selectedUsersId,
            photos: selectedPhotosId,
          },
          { flag: true }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    })
  }

  const onDelete = (itemToDelete) => {
    const updatedFiles = photos.filter((item) => item !== itemToDelete)
    setPhotos(updatedFiles)
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Создание события">
      <div className="modal-create-event__block">
        <form
          action="#"
          className="modal-create-event__form"
          onSubmit={(e) => {
            createEvent(e)
            onClose()
          }}>
          <div className="modal-create-event__form--inner">
            <div className="modal-create-event__input-block--left">
              <Input
                className="modal-create-event__input"
                id="title"
                title="Название"
                type="text"
                func={setSelectedTitle}
              />
              <Input
                className="modal-create-event__input"
                id="description"
                title="Описание"
                type="text"
                func={setSelectedDescription}
              />
              <ParticipantsComponent setSelectedUsers={setSelectedUsers} />
              <Dropzone onDrop={(acceptedFiles) => setPhotos((prev) => [...prev, ...acceptedFiles])}>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Выберите фото или перетащите сюда</p>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="modal-create-event__input-block--right">
              <div className="modal-create-event__input-block--datePicker">
                <DatePicker className="inputDate" selected={startDate} onChange={(date) => setStartDate(date)} />
                <DatePicker className="inputDate" selected={endDate} onChange={(date) => setEndDate(date)} />
              </div>
              <Input
                className="modal-create-event__input"
                id="dateTime"
                title="Время"
                type="text"
                func={setSelectedTime}
              />
              <Input
                className="modal-create-event__input"
                id="location"
                title="Место проведения"
                type="text"
                func={setSelectedLocation}
              />
              <div className="modal-create-event__info">
                <img className="modal-create-event__avatar" src={avatar} alt="" />
                <div className="">
                  <p className="modal-create-event__username">{username}</p>
                  <p className="modal-create-event__role">Организатор</p>
                </div>
              </div>
              <div className="photo-block">
                {photos.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <img
                        className="photo"
                        src={URL.createObjectURL(item)}
                        alt={item.name}
                        width={134}
                        height={81}
                      />
                      <button
                        className="photo__delete-icon"
                        onClick={() => onDelete(item)}
                        aria-label="Закрыть"
                        role="button"
                        type="button">
                        <img src={closeIcon} alt="close" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <button type="submit" className="modal-create-event__button">
            Создать
          </button>
        </form>
      </div>
    </Modal>
  )
}

function ParticipantsComponent({ setSelectedUsers }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    api.user
      .all({ flag: false })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => console.log(err))
  }

  const selectOptions = users.map((user) => ({
    value: user.username,
    id: user.id,
    label: (
      <div className="modal-create-event__select__option">
        <img
          className="modal-create-event__select__option-avatar"
          src={avatar}
          alt={user.username}
          width={40}
          height={40}
        />
        <p className="modal-create-event__select__option-username">{user.username}</p>
      </div>
    ),
  }))

  return (
    <Select
      className="modal-create-event__select-container"
      classNamePrefix="modal-create-event__select"
      options={selectOptions}
      isMulti
      placeholder="Начните вводить имя"
      onChange={(selectedUsers) => setSelectedUsers(selectedUsers)}
    />
  )
}
