import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { htmlBasicsPuzzles } from "../../data/puzzles/htmlBasics.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function LevelSelect() {
  const { pathId } = useParams();
  const { user } = useContext(AuthContext);

  let puzzles = [];

  if (pathId === "html-basics") {
    puzzles = htmlBasicsPuzzles;
  }

  const progressForPath =
    (user && user.progress && user.progress[pathId]) || {};

  return (
    <div className="page-container">
      <h2>Levels – {pathId}</h2>

      {puzzles.length === 0 && <p>No levels found yet.</p>}

      <div className="card-grid">
        {puzzles.map((puzzle, index) => {
          const completed = !!progressForPath[puzzle.id];

          return (
            <Link
              key={puzzle.id}
              to={`/puzzle/${pathId}/${puzzle.id}`}
              className={`card level-card ${completed ? "completed" : ""}`}
            >
              <h3>
                Level {index + 1}: {puzzle.title}
              </h3>
              <p>{puzzle.instructions}</p>
              {completed && <span className="badge">Completed</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
