import Header from "./Header";
import Nav from "./Nav";
import Line from "./Line";
import Intro from "./Intro";
import More from "./More";
import PhotoSlider from "./PhotoSlider";
import Ad from "./Ad";
import Amenities from "./Amenities";
import Feedback from "./Feedback";
import Maps from "./Maps";
import Footer from "./Footer";
import "../../cssfiles/mainpage/Main.css";

const Main = () => {
  return (
      <div className="main-container">
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap" rel="stylesheet"></link>
        <Header />
        <Nav />
        <Line />
        <Intro />
        <Line />
        <More />
        <PhotoSlider />
        <Ad/>
        <Amenities />
        <Line/>
        <Feedback />
        <Maps />
        <Footer />
      </div>
  );
};

export default Main;
