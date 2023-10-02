import { useCallback, useRef, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/scss"
import "swiper/scss/navigation"
import arrow from "./assets/icons/arrow.svg"
import "./assets/scss/Slider.scss"

export default function Slider({ event }) {
  const [pastPrev, setPastPrev] = useState(false)
  const [pastNext, setPastNext] = useState(true)
  const sliderRef = useRef(null)
  const photos = []

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  if (event.photos) {
    event.photos.forEach((elem) => {
      elem.src = "https://planner.rdclr.ru" + elem.url
      photos.push(elem)
    })
  }

  return (
    <>
      <Swiper
        modules={[Navigation]}
        ref={sliderRef}
        navigation={{
          prevEl: document.querySelector(".prev"),
          nextEl: document.querySelector(".next"),
        }}
        slidesPerView={photos.length >= 4 ? 3.3 : 1}
        slideToClickedSlide={true}
        onSlideChange={(swiper) => {
          const lastSlideIndex = swiper.realIndex
          lastSlideIndex > 0 ? setPastPrev(true) : setPastNext(true)
        }}>
        {photos.map((item, key) => {
          return (
            <SwiperSlide key={key}>
              <li>
                <img
                  className="slide-photo"
                  src={item.src}
                  alt=""
                  width={268}
                  height={160}
                />
              </li>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {photos.length >= 4 ? (
        <>
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
        </>
      ) : null}
    </>
  )
}
