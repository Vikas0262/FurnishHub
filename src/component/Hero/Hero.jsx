import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    { img: "https://images.pexels.com/photos/6588579/pexels-photo-6588579.jpeg", text: "End of Season Sale – Up to 50% Off!" },
    { img: "https://images.pexels.com/photos/6782346/pexels-photo-6782346.jpeg", text: "New Arrivals Just Landed!" },
    { img: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg", text: "Shop the Latest Fashion Trends!" },
    { img: "https://images.pexels.com/photos/7031874/pexels-photo-7031874.jpeg", text: "Shop the Latest Fashion Trends!" },
    { img: "https://images.pexels.com/photos/6263036/pexels-photo-6263036.jpeg", text: "Shop the Latest Fashion Trends!" },
  ];

  return (
    <div className="relative container mx-auto mt-5 overflow-hidden h-[65vh] rounded-xl shadow-lg">
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        speed={400} // Faster transition speed
        autoplay={{ delay: 1000, disableOnInteraction: false }} // Faster autoplay
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Image */}
            <img src={slide.img} alt="Slide" className="w-full h-full absolute inset-0 object-cover object-center" />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-4xl font-bold">
              {slide.text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 p-3 rounded-full bg-white text-black transition-all hover:bg-[#ff5252] hover:text-white hover:shadow-lg hover:scale-110"
      >
        <TfiAngleLeft size={24} />
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 p-3 rounded-full bg-white text-black transition-all hover:bg-[#ff5252] hover:text-white hover:shadow-lg hover:scale-110"
      >
        <TfiAngleRight size={24} />
      </button>
    </div>
  );
};

export default Hero;
