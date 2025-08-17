import About from "./components/About";
import Banner from "./components/Banner/index";
import Courses from "./components/Courses/index";
import Newsletter from "./components/Newsletter/Newsletter";
import Services from "./components/Services";

export default function Home() {
  return (
    <main>
      <Banner />
      <About />
      <Services />
      <Courses />
      <Newsletter />
    </main>
  );
}
