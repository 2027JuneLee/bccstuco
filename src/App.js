import "./App.css";
import MainPage from "./MainPage";
import FleaMarket from "./FleaMarket";
import WeeklyReports from "./WeeklyReports";
import Events from "./Events";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reports" element={<WeeklyReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
