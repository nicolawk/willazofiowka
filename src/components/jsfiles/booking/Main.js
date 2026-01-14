import Header from "./Header";
import Nav from "./Nav";
import Intro from "./Intro";
import Footer from "../mainpage/Footer";
import Line from "../mainpage/Line";
import BookingForm from "./Form";
import Maps from '../mainpage/Maps';
import "../../cssfiles/booking/Main.css";

const Main5 = () => {
  return (
    <div className="main-container">
      <Header />
      <Nav />
      <Intro />
      <Line />
      <BookingForm />
      <Maps />
      <Footer />
    </div>
  );
};
export default Main5;
