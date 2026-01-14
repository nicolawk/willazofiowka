import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./components/jsfiles/mainpage/Main";    // Home page
import Main2 from "./components/jsfiles/aboutus/Main";   // About Us page
import Main3 from "./components/jsfiles/locations/Main";
import Main4 from "./components/jsfiles/offer/Main";
import Main5 from "./components/jsfiles/booking/Main";
import Payment from "./components/jsfiles/PaymentSuccess";
import "./i18n";
import LanguageSync from "./LanguageSync";


function App() {
  return (
    <Router>
                    <LanguageSync />
      <Routes>
        <Route path="/" element={<Main />} />         {/* Home */}
        <Route path="/aboutus" element={<Main2 />} /> {/* About Us */}
                <Route path="/locations" element={<Main3/>} /> {/* About Us */}
                <Route path="/offer" element={<Main4/>} /> {/* About Us */}
                <Route path="/booking" element={<Main5/>} />
                                <Route path="/PaymentSuccess" element={<Payment/>} />
      </Routes>
    </Router>
  );
}

export default App;
