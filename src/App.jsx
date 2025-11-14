import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PathSelect from "./pages/PathSelect.jsx";
import LevelSelect from "./pages/LevelSelect.jsx";
import PuzzlePage from "./pages/Puzzle.jsx";
import AchievementsPage from "./pages/Achievements.jsx";
import PuzzleEditor from "./pages/PuzzleEditor.jsx";
import PuzzleAdmin from "./pages/PuzzleAdmin.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />

            <Route
              path="/paths"
              element={<ProtectedRoute><PathSelect /></ProtectedRoute>}
            />

            <Route
              path="/levels/:pathId"
              element={<ProtectedRoute><LevelSelect /></ProtectedRoute>}
            />

            <Route
              path="/puzzle/:pathId/:levelId"
              element={<ProtectedRoute><PuzzlePage /></ProtectedRoute>}
            />

            <Route
              path="/achievements"
              element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>}
            />

            <Route
              path="/editor"
              element={<ProtectedRoute><PuzzleEditor /></ProtectedRoute>}
            />

            <Route
              path="/admin"
              element={<ProtectedRoute><PuzzleAdmin /></ProtectedRoute>}
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} PuzzleCoding</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
