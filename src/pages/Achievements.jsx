import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { achievements } from "../data/achievements.js";

export default function AchievementsPage() {
  const { user } = useContext(AuthContext);

  const userAchievements = (user && user.achievements) || [];

  const unlocked = userAchievements.map((id) => achievements[id]).filter(Boolean);

  return (
    <div className="page-container">
      <h2>Your Achievements</h2>

      {unlocked.length === 0 && (
        <p>You haven't unlocked any achievements yet. Solve some puzzles!</p>
      )}

      <div className="card-grid">
        {unlocked.map((a) => (
          <div key={a.id} className="card">
            <h3>🏆 {a.title}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
