import ru from "date-fns/locale/ru"
import { useState } from "react"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "../../Input/Input"
import { api } from "../../shared/api"
import "../../shared/scss/Modal/ModalCreateEvent/ModalCreateEvent.scss"
import Modal from "../Modal"
import ModalError from "../ModalError/modalError"
import ModalQuestion from "../ModalQuestion/modalQuestion"
import DropZone from "./modalCreateEventDropzone"
import UserInfo from "./modalCreateEventInfo"
import ParticipantsComponent from "./modalCreateEventParticipants"

registerLocale("ru", ru)

export default function ModalCreateEvent({ onClose, isOpen }) {
  const [photos, setPhotos] = useState([])
  const [occupancy, setOccupancy] = useState(false)
  const [firstModalOpen, setFirstModalOpen] = useState(true)
  const [modalErrorOpen, setModalErrorOpen] = useState(false)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedDescription, setSelectedDescription] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const selectedUsersId = selectedUsers.map((user) => user.id)
  setDefaultLocale("ru")

  const sendPhotos = async (array) => {
    if (array.getAll("files").length !== 0) {
      return await api.uploads
        .post(array, { flag: true })
        .then((res) => {
          const selectedPhotosId = res.data.map((photo) => photo.id)
          setSelectedPhotos(selectedPhotosId)
          return selectedPhotosId
        })
        .catch((err) => console.log(err.response.data.error))
    } else {
      console.log("Файлов нет")
    }
  }

  const formattedTime = (selectedTime) => {
    if (selectedTime) {
      const time = selectedTime.split(":")
      startDate.setHours(time[0], time[1], 0)
    }
  }

  const createEvent = (e) => {
    e.preventDefault()

    const formData = new FormData()
    Array.from([...photos]).forEach((file) => {
      formData.append("files", file)
    })

    sendPhotos(formData).then((selectedPhotosId) => {
      formattedTime(selectedTime)
      const errorRequired = document.querySelectorAll(".valid-error-required")

      if (selectedTitle.length < 140 && selectedTitle !== "") {
        errorRequired[0].classList.add("hide")
        if (selectedDescription.length < 1000 && selectedDescription !== "") {
          errorRequired[1].classList.add("hide")
          if (selectedTime.length < 140 && selectedTime !== "") {
            errorRequired[2].classList.add("hide")
            if (selectedLocation.length < 140 && selectedLocation !== "") {
              errorRequired[3].classList.add("hide")
              if (startDate < endDate) {
                if (convertPhotosSize(photos)) {
                  api.event
                    .create(
                      {
                        title: selectedTitle,
                        description: selectedDescription,
                        dateStart: startDate.toISOString(),
                        dateEnd: endDate ? endDate.toISOString() : null,
                        location: selectedLocation,
                        participants: selectedUsersId ?? null,
                        photos: selectedPhotosId ?? null,
                      },
                      { flag: true }
                    )
                    .then((res) => {
                      console.log(res)
                      onClose()
                    })
                    .catch((err) => console.log(err))
                } else {
                  firstModalOpen(false)
                  setModalErrorOpen(true)
                }
              }
            } else {
              errorRequired[3].classList.remove("hide")
            }
          } else {
            errorRequired[2].classList.remove("hide")
          }
        } else {
          errorRequired[1].classList.remove("hide")
        }
      } else {
        errorRequired[0].classList.remove("hide")
      }
    })
  }

  const convertPhotosSize = (photos) => {
    if (photos.length !== 0) {
      return photos.every((photo) => photo.size / 1000 / 1000 < 5)
    } else return true
  }

  const setActiveQuestion = () => {
    const modal = document.querySelector("#modal-create-event")

    if (modal) {
      const modalCloseIcon = modal.querySelector(".modal__close-icon")
      const modalCloseBg = modal.querySelector(".modal__bg")

      modalCloseIcon.addEventListener("click", () => {
        setFirstModalOpen(false)
        setOccupancy(true)
      })
      modalCloseBg.addEventListener("click", () => {
        setFirstModalOpen(false)
        setOccupancy(true)
      })
    }
  }

  return (
    <>
      {firstModalOpen && (
        <Modal onClose={onClose} isOpen={isOpen} id="modal-create-event" title="Создание события">
          <div className="modal-create-event__block">
            <form action="#" className="modal-create-event__form" onSubmit={(e) => createEvent(e)}>
              <div className="modal-create-event__form--inner">
                <div className="modal-create-event__form__row">
                  <Input
                    className="modal-create-event__input"
                    id="title"
                    title="Название"
                    type="text"
                    func={setSelectedTitle}
                    errorRequired="Обязательное поле"
                    number={1}
                    onChange={(e) => {
                      setActiveQuestion()
                      if (e.target.value !== "") {
                        document.querySelector(".modal-create-event__button").removeAttribute("disabled")
                      }
                    }}
                  />
                  <div className="modal-create-event__input-block--datePicker">
                    <DatePicker
                      className="inputDate"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      locale="ru"
                      required
                    />
                    <DatePicker
                      className="inputDate"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      locale="ru"
                      required
                    />
                  </div>
                </div>
                <div className="modal-create-event__form__row">
                  <Input
                    className="modal-create-event__input"
                    id="description"
                    title="Описание"
                    type="text"
                    func={setSelectedDescription}
                    errorRequired="Обязательное поле"
                    number={2}
                    onChange={(e) => {
                      setActiveQuestion()
                      if (e.target.value !== "") {
                        document.querySelector(".modal-create-event__button").removeAttribute("disabled")
                      }
                    }}
                  />
                  <div className="">
                    <Input
                      className="time modal-create-event__input"
                      id="dateTime"
                      title="Время"
                      type="text"
                      func={setSelectedTime}
                      errorRequired="Обязательное поле"
                      number={3}
                      onChange={(e) => {
                        setActiveQuestion()
                        if (e.target.value !== "") {
                          document.querySelector(".modal-create-event__button").removeAttribute("disabled")
                        }
                      }}
                    />
                    <Input
                      className="location modal-create-event__input"
                      id="location"
                      title="Место проведения"
                      type="text"
                      func={setSelectedLocation}
                      errorRequired="Обязательное поле"
                      number={4}
                      onChange={(e) => {
                        setActiveQuestion()
                        if (e.target.value !== "") {
                          document.querySelector(".modal-create-event__button").removeAttribute("disabled")
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="modal-create-event__form__row">
                  <ParticipantsComponent setSelectedUsers={setSelectedUsers} />
                  <UserInfo />
                </div>
                <DropZone photos={photos} setPhotos={setPhotos} />
              </div>
              <button type="submit" className="modal-create-event__button" disabled>
                Создать
              </button>
            </form>
          </div>
        </Modal>
      )}
      {occupancy ? (
        <ModalQuestion
          onClose={(e) => {
            setFirstModalOpen(e)
            setOccupancy(false)
          }}
          isOpen={isOpen}
        />
      ) : null}
      {modalErrorOpen && <ModalError onClose={onClose} isOpen={isOpen} />}
    </>
  )
}
