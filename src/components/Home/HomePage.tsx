import { AppNavbar } from "../Navbar";
import { HeroCarousel } from "../Carousal";
import { AboutUs } from "./AboutUs";
import { PhotoGallery } from "./Gallery";
import { PlanAndTestimonials } from "./Testimonial_plan";
import { Footer } from "../Footer";


export function HomePage() {
  return (
    <div className="relative w-full min-h-screen ">
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-screen">
        <AppNavbar />
      </div>
      <section id="home" className="relative w-full">
        <HeroCarousel />
      </section>
      <section id="about" className="relative w-full">
        <AboutUs />
      </section>
      <section id="gallery" className="relative w-full">
        <PhotoGallery />
      </section>
      <section id="contact" className="relative w-full">
        <PlanAndTestimonials />
      </section>
      <div className="relative w-full">
        <Footer />
      </div>
    </div>
  );
}
