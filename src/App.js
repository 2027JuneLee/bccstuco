import "./App.css";
import MainPage from "./MainPage";
import FleaMarket from "./FleaMarket";
import WeeklyReports from "./WeeklyReports";
import Events from "./Events";
import EventDetails from "./EventDetails";
import About from "./About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/reports" element={<WeeklyReports />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
