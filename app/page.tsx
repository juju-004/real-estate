import Banner from "./components/Banner/index";
import Courses from "./components/Courses/index";
import Newsletter from "./components/Newsletter/Newsletter";

export default function Home() {
  return (
    <main>
      <Banner />
      <Courses />
      <Newsletter />
    </main>
  );
}
