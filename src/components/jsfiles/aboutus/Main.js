import Header from "./Header";
import Nav from "./Nav";
import Line from "../mainpage/Line";
import Intro from "./Intro";
import Strength from "./Strength";
import Changing from "./Changing";
import Footer from "../mainpage/Footer";
import "../../cssfiles/aboutus/Main.css";

const Main2 = () => {
  return (
    <div className="main-container">
      <Header />
      <Nav/>
      <Intro />
      <Line />
      <Strength />
      <Line />
      <Changing />
      <Footer />
    </div>
  );
};
export default Main2;
