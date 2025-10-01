import { Button } from '@/components/ui/button';
import { Users, Zap } from 'lucide-react';

const images = {
  img1: '/second/pic5.jpg',
  img2: '/second/pic4.jpg',
};

const avatars = {
  avatar1: '/avatars/av (1).jpg',
  avatar2: '/avatars/av (2).jpg',
  avatar3: '/avatars/av (3).jpg',
  avatar4: '/avatars/av (4).jpg',
  avatar5: '/avatars/av (5).jpg',
  avatar6: '/avatars/av (6).jpg',
  avatar7: '/avatars/av (7).jpg',
  avatar8: '/avatars/av (1).png',
  avatar9: '/avatars/av (2).png',
  avatar10: '/avatars/av (3).png',
  avatar11: '/avatars/av (4).png',
  avatar12: '/avatars/av (5).png',
  avatar13: '/avatars/av (6).png',
  avatar14: '/avatars/av (7).png',
};

export function AboutUs() {
  return (
    <section className="bg-[#FEFBF0] py-12 md:py-20 px-4 sm:px-6  lg:px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <div className="lg:pl-8 lg:order-last">
          <p className="text-sm font-semibold text-yellow-500 tracking-wider uppercase mb-2">A Bit</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            With over 25 years of experience, a powerhouse of 100+ talented team members, and 25,000+ happy customers, Alive has been at the heart of creating unforgettable event experiences. From concept to execution, we bring passion, precision, and creativity to every occasion.
          </p>
          <Button
            variant="outline"
            className="px-8 py-3 text-base bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-full shadow-sm"
          >
            Explore More
          </Button>
        </div>

        <div className="relative h-auto w-full grid grid-cols-2 grid-rows-3 gap-2 md:gap-4 ">
          <div className="relative col-span-1 row-span-2">
            <img
              src={images.img1}
              alt="Dining table with pink flowers"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
       
 <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-5 md:-left-5 bg-white p-1.5 sm:p-2 md:p-3 rounded-xl shadow-xl flex items-start gap-1.5 sm:gap-2 w-24 sm:w-32 md:w-40">
  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400 mt-1" />
  <div>
    <p className="font-bold text-xs sm:text-sm md:text-base text-gray-800">25+</p>
    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 leading-tight">
      Of Experience in event management
    </p>
  </div>
</div>
</div>
          <div className="relative col-span-1 row-span-1">
            <div className="bg-white rounded-2xl p-3 md:p-6 shadow-lg h-full">
              <div className="flex items-start justify-between mb-2 md:mb-4">
                <div>
                  <p className="text-2xl md:text-4xl font-bold text-gray-800">25,000+</p>
                  <p className="text-sm md:text-lg text-gray-500">Happy Customers</p>
                </div>
                <div className="text-2xl md:text-4xl">
                  <span role="img" aria-label="happy face">😊</span>
                </div>
              </div>
              <div className="border-t-2 border-yellow-400 my-2 md:my-4"></div>
              <div className="flex flex-wrap gap-y-1 md:gap-y-2 -space-x-2 md:-space-x-3">
                {Object.values(avatars).map((avatar, index) => (
                  <img key={index} src={avatar} alt={`Customer ${index + 1}`} className="w-6 h-6 md:w-9 md:h-9 rounded-full border-2 border-white object-cover"/>
                ))}
              </div>
            </div>
          </div>

          <div className="relative col-span-1 row-span-2 ">
            <img
              src={images.img2}
              alt="Close-up of empty event chairs"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />

            <div className="absolute -bottom-3 -left-3 md:-bottom-5 md:-left-5 bg-white p-2 md:p-3 rounded-xl shadow-xl flex items-center gap-2 md:gap-3 w-36 md:w-44">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              <div>
                <p className="font-bold text-sm md:text-base text-gray-800">100+</p>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Talented Team Members</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
