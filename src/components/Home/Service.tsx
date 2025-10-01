import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Event Planning & Coordination',
    description:
      'End-to-end management for all types of events—weddings, birthdays, corporate gatherings, and private parties.',
    image:'/services/c1.jpg',
  },
  {
    title: 'Catering Services',
    description:
      'Delicious and diverse catering options to delight your guests, tailored to any dietary need or preference.',
    image:'/services/c2.jpg',
  },
  {
    title: 'Themed Decorations',
    description:
      'Transform your venue with our creative and immersive themed decorations that bring your vision to life.',
    image:'/services/c3.jpg',
  },
  {
    title: 'Live Cooking & Food Stations',
    description:
      'Engage your guests with interactive live cooking and food stations, offering a fresh and dynamic dining experience.',
    image:'/services/c4.png',
  },
];

export function ServiceSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Service</h2>
        <div className="flex justify-center border-b border-gray-300 mb-8 overflow-x-auto">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`py-3 px-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-300 border-b-2 ${
                activeIndex === index
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {services.map((service, index) => (
                <div className="flex-shrink-0 w-full min-w-full" key={index}>
                  <div className="relative h-80 md:h-96">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex flex-col justify-center items-center p-6 text-white">
                      <h3 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-4">
                        {service.title}
                      </h3>
                      <p className="max-w-lg text-base md:text-lg">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>


          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
