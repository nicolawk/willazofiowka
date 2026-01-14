import Header from "./Header";
import Nav from "./Nav";
import Line from "../mainpage/Line";
import Footer from "../mainpage/Footer";
import OfferIntro from "./Intro";
import Amenities from "./Amenities";
import RoomTab from "./Room";
import Maps from "../mainpage/Maps";
import "../../cssfiles/offer/Main.css";

const Main4 = () => {
  return (
    <div className="main-container">
      <Header />
      <Nav />
      <OfferIntro />
      <Line />
      <Amenities /> 
      <Line />
      <RoomTab/>
      <Maps />
      <Footer />
    </div>
  );
};
export default Main4;
