import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Home from "./pages/Home";
import Library from "./pages/Library";
import Music from "./pages/Music";
import Notes from "./pages/Notes";
import Ai from "./pages/Ai";
import Lesson from "./pages/lesson";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-gray-100">
          <Header />
          <Routes>
            <Route path="lesson" element={<Lesson />} />
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/music" element={<Music />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/ai" element={<Ai />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
