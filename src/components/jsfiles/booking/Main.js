import Header from "./Header";
import Nav from "./Nav";
import Intro from "./Intro";
import Footer from "../mainpage/Footer";
import Line from "../mainpage/Line";
import BookingCalendar from "./BookingCalendar";
import Maps from '../mainpage/Maps';
import "../../cssfiles/booking/Main.css";

const Main5 = () => {
  return (
    <div className="main-container">
      <Header />
      <Nav />
      <Intro />
      <Line />
      <BookingCalendar />
      <Maps />  
      <Footer />
    </div>
  );
};
export default Main5;
