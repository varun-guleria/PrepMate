import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./index.jsx";
import Quizzes from "./pages/Quizzes";
import CuratedContent from "./pages/CuratedContent";
import PersonalizedLearning from "./pages/PersonalizedLearning";
import TimeManagement from  "./pages/TimeManagement.jsx";
import Achievements from "./pages/AchievementSystem";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter basename="/PrepMate">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/content" element={<CuratedContent />} />
        <Route
          path="/personalized-learning"
          element={<PersonalizedLearning />}
        />
        <Route path="/time-management" element={<TimeManagement />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
