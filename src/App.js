import "./App.css";
import MainPage from "./MainPage";
import FleaMarket from "./Flea Market";
import Gallery from "./Gallery";
import Archive from "./Previous Work";
import Raffle from "./Raffle";
import WeeklyReports from "./Weekly Reports";
import Roster from "./Roster";
import Community from "./Community";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/flea" element={<FleaMarket />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/raffle" element={<Raffle />} />
          <Route path="/weekly" element={<WeeklyReports />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
