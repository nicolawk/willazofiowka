import Header from "./Header";
import Nav from "./Nav";
import Intro from "./Intro";
import Line from "../mainpage/Line";
import Footer from "../mainpage/Footer";
import Locations from "./Locations";
import Maps from "../mainpage/Maps";
import "../../cssfiles/locations/Main.css";

const Main3 = () => {
  return (
    <div className="main-container">
      <Header />
      <Nav />
      <Intro />
      <Line />
      <Locations />
      <Maps />
      <Line/>
      <Footer />
    </div>
  );
};
export default Main3;
