import { forwardRef } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/scss"
import "swiper/scss/navigation"

const ModalEventSlider = forwardRef((props, ref) => {
  const { photos, onSlideChange } = props

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      ref={ref}
      navigation={{
        prevEl: document.querySelector(".prev"),
        nextEl: document.querySelector(".next"),
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      slidesPerView={photos.length >= 4 ? 3.3 : 1}
      slideToClickedSlide={true}
      onSlideChange={onSlideChange}>
      {photos.map((item, key) => {
        return (
          <SwiperSlide key={key}>
            <li>
              <img className="slide-photo" src={item.src} alt="photo" />
            </li>
          </SwiperSlide>
        )
      })}
      {photos.length >= 4 ? <div className="swiper-pagination"></div> : null}
    </Swiper>
  )
})

ModalEventSlider.displayName = "ModalEventSlider"

export default ModalEventSlider
