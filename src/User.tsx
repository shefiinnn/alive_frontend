
import { HomePage } from "./components/Home/HomePage";

export const HomePageLayout = () => (
  <main className="relative w-full min-h-screen">
    <div className="absolute top-0 left-0 right-0 z-20">
      <HomePage />
    </div>   


  </main>
);