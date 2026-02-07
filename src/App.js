import "./App.css";
import MainPage from "./MainPage";
import WeeklyReports from "./WeeklyReports";
import Events from "./Events";
import EventDetails from "./EventDetails";
import About from "./About";
import QnA from "./QnA";
import Admin from "./Admin";
import SecretPage from "./SecretPage";
import Archives from "./Archives";
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
          <Route path="/forum" element={<QnA />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/secret_valentines" element={<SecretPage />} />
          <Route path="/archives" element={<Archives />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
