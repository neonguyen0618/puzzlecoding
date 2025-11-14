import { useState, useMemo } from "react";
import PuzzleEditorBlock from "../components/PuzzleEditorBlock.jsx";
import PuzzlePreview from "../components/PuzzlePreview.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import { saveAsJSON } from "../utils/fileExport.js";

export default function PuzzleEditor() {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");

  const [blocks, setBlocks] = useState([]);
  const [codeText, setCodeText] = useState("");
  const [solution, setSolution] = useState([]);

  // PREVIEW: Derived from blocks + solution (NO useEffect needed)
  const previewHTML = useMemo(() => {
    return solution
      .map((id) => {
        const b = blocks.find((x) => x.id === id);
        return b ? b.code : "";
      })
      .join("\n");
  }, [solution, blocks]);

  const addBlock = () => {
    if (!codeText.trim()) return;
    const id = "b" + (blocks.length + 1);
    const newBlock = { id, code: codeText };

    setBlocks((prev) => [...prev, newBlock]);
    setSolution((prev) => [...prev, id]);
    setCodeText("");
  };

  const shuffleSolution = () => {
    const arr = [...solution];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setSolution(arr);
  };

  const savePuzzle = () => {
    const puzzle = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      instructions,
      blocks,
      solution,
      rewardXP: 20
    };

    const saved = JSON.parse(
      localStorage.getItem("puzzlecoding_custom_puzzles") || "[]"
    );

    localStorage.setItem(
      "puzzlecoding_custom_puzzles",
      JSON.stringify([...saved, puzzle])
    );

    alert("Puzzle saved locally!");
  };

  const exportPuzzle = () => {
    const puzzle = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      instructions,
      blocks,
      solution,
      rewardXP: 20
    };

    saveAsJSON(puzzle, `${puzzle.id}.json`);
  };

  return (
    <div className="page-container">
      <h2>Puzzle Editor</h2>
      <p>Create your own drag-and-drop puzzles easily.</p>

      <div className="editor-layout">

        <div className="editor-left">
          <h3>Puzzle Settings</h3>

          <input
            className="editor-input"
            placeholder="Puzzle title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="editor-textarea"
            placeholder="Puzzle instructions…"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <h3>Add Block</h3>
          <CodeEditor value={codeText} onChange={setCodeText} />

          <button className="btn" onClick={addBlock}>Add Block</button>

          <h3>Blocks</h3>
          <div className="editor-block-list">
            {blocks.map((b) => (
              <PuzzleEditorBlock key={b.id} block={b} />
            ))}
          </div>

          <h3>Solution Order</h3>
          <ol>
            {solution.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ol>

          <button className="btn secondary" onClick={shuffleSolution}>
            Shuffle Order
          </button>
          <br /><br />

          <button className="btn" onClick={savePuzzle}>Save Locally</button>
          <button className="btn secondary" onClick={exportPuzzle}>
            Export JSON
          </button>
        </div>

        <div className="editor-right">
          <h3>Live Preview</h3>
          <PuzzlePreview html={previewHTML} />
        </div>

      </div>
    </div>
  );
}
