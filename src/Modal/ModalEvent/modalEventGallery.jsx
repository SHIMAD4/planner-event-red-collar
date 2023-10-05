import { useCallback, useRef, useState } from "react"
import arrow from "../../shared/icons/arrow.svg"
import "../../shared/scss/Modal/ModalEvent/ModalEventGallery.scss"
import ModalEventSlider from "./modalEventSlider"

export default function ModalEventGallery({ event }) {
  const sliderRef = useRef(null)
  const [pastPrev, setPastPrev] = useState(false)
  const [pastNext, setPastNext] = useState(true)
  let photos = []

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  if (event.extendedProps.photos) {
    event.extendedProps.photos.forEach((elem) => {
      elem.src = "https://planner.rdclr.ru" + elem.url
      photos.push(elem)
    })
  }

  return (
    <>
      {event.extendedProps.photos ? (
        <>
          <div className="modal__gallery__header">
            <h2 className="modal__gallery__desc">Галерея</h2>
            {event.extendedProps.photos.length >= 4 ? (
              <div className="modal__gallery__buttons">
                <button
                  className={pastPrev ? "next swiper-button-disabled" : "next"}
                  onClick={handlePrev}>
                  <img src={arrow} alt="" />
                </button>
                <button
                  className={pastNext ? "prev swiper-button-disabled" : "prev"}
                  onClick={handleNext}>
                  <img src={arrow} alt="" />
                </button>
              </div>
            ) : null}
          </div>
          <ul className="modal__gallery__list" role="list">
            <ModalEventSlider
              ref={sliderRef}
              onSlideChange={(swiper) => {
                const lastSlideIndex = swiper.realIndex
                lastSlideIndex > 0 ? setPastPrev(true) : setPastNext(true)
              }}
              photos={photos}
            />
          </ul>
        </>
      ) : null}
    </>
  )
}
