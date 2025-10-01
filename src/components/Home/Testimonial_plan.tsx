import { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroCarouselButton } from '../FormButton';


const testimonials = [
  {
    rating: 5,
    text: "Amazing experience! Everything was well organized and beautiful.",
    name: "Ben Green",
    role: "CEO, Company",
    image: '/avatars/av (1).jpg',
  },
  {
    rating: 5,
    text: "Professional team and wonderful events. Highly recommended!",
    name: "Liam Brown",
    role: "Manager, Business",
    image: '/avatars/av (2).jpg',
  },
  {
    rating: 5,
    text: "The best planners in the city. Impeccable service every time.",
    name: "Sophia Blue",
    role: "Director, Corp",
    image: '/avatars/av (3).jpg',
  },
  {
    rating: 5,
    text: "The best planners in the city. Impeccable service every time.",
    name: "Sophia Blue",
    role: "Director, Corp",
    image: '/avatars/av (4).jpg',
  },
  {
    rating: 5,
    text: "The best planners in the city. Impeccable service every time.",
    name: "Sophia Blue",
    role: "Director, Corp",
    image: '/avatars/av (5).jpg',
  },
  {
    rating: 5,
    text: "The best planners in the city. Impeccable service every time.",
    name: "Sophia Blue",
    role: "Director, Corp",
    image: '/avatars/av (6).jpg',
  },
  {
    rating: 5,
    text: "The best planners in the city. Impeccable service every time.",
    name: "Sophia Blue",
    role: "Director, Corp",
    image: '/avatars/av (7).jpg',
  }
];

export function PlanAndTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>

      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fffdf9]">
        <h1 className="text-3xl font-semibold mb-6">Book Your Perfect Event Today</h1>
        <img
          src="/plan/plan.jpg"
          alt="Event Planning Illustration"
          className="mx-auto mb-6 max-w-xs"
        />
        <p className="max-w-md mx-auto mb-6 text-lg">
          Ready to elevate your next gathering? Book a consultation to discover how we can bring your vision to life.
        </p>
        <HeroCarouselButton isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
          <button className="inline-block px-5 py-2 border border-dashed border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition font-semibold mb-4">
            Plan With Us
          </button>
        </HeroCarouselButton>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <h2 className="text-2xl font-bold text-center mb-10">Customer Testimonials</h2>
        <div className="max-w-5xl mx-auto relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full sm:w-1/3 px-2"
                >
                  <div className="rounded-lg bg-white p-6 shadow-md h-full">
                    <div className="flex mb-4 text-yellow-400">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 mb-6 text-sm sm:text-base">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </section>
    </>
  );
}
