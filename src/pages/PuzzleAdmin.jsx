import { useState } from "react";
import PuzzleAdminItem from "../components/PuzzleAdminItem.jsx";
import FileImportButton from "../components/FileImportButton.jsx";

export default function PuzzleAdmin() {
  // FIX: Load from localStorage using lazy initializer instead of useEffect
  const [puzzles, setPuzzles] = useState(() => {
    const saved = localStorage.getItem("puzzlecoding_custom_puzzles");
    return saved ? JSON.parse(saved) : [];
  });

  const deletePuzzle = (id) => {
    const newList = puzzles.filter((p) => p.id !== id);
    setPuzzles(newList);
    localStorage.setItem("puzzlecoding_custom_puzzles", JSON.stringify(newList));
  };

  const handleImport = (newPuzzle) => {
    const updated = [...puzzles, newPuzzle];
    setPuzzles(updated);
    localStorage.setItem("puzzlecoding_custom_puzzles", JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <h2>Puzzle Admin Hub</h2>

      <p>Manage, import, or delete your created puzzles.</p>

      <FileImportButton onImport={handleImport} />

      <div className="admin-grid">
        {puzzles.length === 0 && <p>No custom puzzles yet.</p>}

        {puzzles.map((p) => (
          <PuzzleAdminItem
            key={p.id}
            puzzle={p}
            onDelete={() => deletePuzzle(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
