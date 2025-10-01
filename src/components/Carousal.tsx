import  { useState,useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HeroCarouselButton } from "./FormButton";

const carouselItems = [
  {
    src: "/carousel/car 1.jpg",
    alt: "Elegant event setup with clear chairs",
    logoSrc: "/alive-logo.png",
    title: "Where every event lives in memory",
    subtitle:
      "Bringing your events to life with unforgettable experiences, seamless planning, and exceptional catering.",
  },
  {
    src: "/carousel/car 2.jpg",
    alt: "Guests enjoying a catered event",
    logoSrc: "/alive-logo.png",
    title: "Unforgettable Culinary Experiences",
    subtitle:
      "From intimate gatherings to grand celebrations, our catering is designed to impress.",
  },
  {
    src: "/carousel/car 3.jpg",
    alt: "Beautifully decorated wedding venue",
    logoSrc: "/alive-logo.png",
    title: "Seamless & Stress-Free Planning",
    subtitle:
      "Our expert team handles every detail, so you can enjoy the moment.",
  },
];

export function HeroCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-screen"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[100vh]">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-[100%]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-[100%] object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 pt-16 sm:pt-20 md:pt-24">
                  <img
                    src={item.logoSrc}
                    alt="Alive Events & Catering"
                    className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 mb-2 xs:mb- sm:mb-4 md:mb-5"
                  />
                  <h1 className="text-[12px] xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight xs:leading-snug sm:leading-snug mb-2 xs:mb-2 sm:mb-3 md:mb-4 max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] px-1">
                    {item.title}
                  </h1>


                  <p className="text-[9px] xs:text-xs sm:text-sm md:text-base lg:text-lg max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-relaxed px-2">
                    {item.subtitle}
                  </p>

                  <HeroCarouselButton isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                    <button
                      className="px-2 xs:px-3 sm:px-2 md:px-6 py-1.5 xs:py-2 sm:py-2.5 text-xs xs:text-sm sm:text-base bg-transparent border-white border-[1.5px] xs:border-2 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium rounded-lg min-h-0 whitespace-nowrap"
                    >
                      Start Planning Today
                    </button>
                  </HeroCarouselButton>
                </div>
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
