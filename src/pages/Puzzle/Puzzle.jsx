import { useState, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";

import { htmlBasicsPuzzles } from "../../data/puzzles/htmlBasics.js";
import { achievements } from "../../data/achievements.js";

import DragDropBoard from "../../components/DragDropBoard.jsx";
import LivePreview from "../../components/LivePreview.jsx";
import MiniShowcase from "../../components/MiniShowcase.jsx";
import AchievementPopup from "../../components/AchievementPopup.jsx";

import { AuthContext } from "../../context/AuthContext.jsx";

import SoundPlayer from "../../components/SoundPlayer.jsx";

import soundCorrect from "../../sounds/correct.mp3";
import soundWrong from "../../sounds/wrong.mp3";
import soundDrop from "../../sounds/drop.mp3";

export default function PuzzlePage() {
  const { pathId, levelId } = useParams();
  const { addXP, addAchievement, markLevelCompleted } = useContext(AuthContext);

  const puzzle = useMemo(() => {
    if (pathId === "html-basics") {
      return htmlBasicsPuzzles.find((p) => p.id === levelId) || htmlBasicsPuzzles[0];
    }
    return htmlBasicsPuzzles[0];
  }, [pathId, levelId]);

  const [order, setOrder] = useState(() => {
    const initial = [...puzzle.solution];
    for (let i = initial.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initial[i], initial[j]] = [initial[j], initial[i]];
    }
    return initial;
  });

  const [tries, setTries] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState(null);
  const [soundToPlay, setSoundToPlay] = useState(null);

  const previewHtml = useMemo(() => {
    const map = {};
    puzzle.blocks.forEach((b) => (map[b.id] = b.code));
    return order.map((id) => map[id]).join("\n");
  }, [order, puzzle.blocks]);

  const handleReorder = (newOrder) => {
    setOrder(newOrder);
    setSoundToPlay(soundDrop);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleSubmit = () => {
    if (isSolved) return;

    const correct = puzzle.solution.join("|") === order.join("|");

    if (correct) {
      setIsSolved(true);
      addXP(puzzle.rewardXP);
      markLevelCompleted(pathId, puzzle.id);

      const a = achievements["first-html"];
      addAchievement(a.id);
      setAchievementUnlocked(a);

      setSoundToPlay(soundCorrect);
      if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
    } else {
      const next = tries + 1;
      setTries(next);

      setSoundToPlay(soundWrong);
      if (navigator.vibrate) navigator.vibrate(40);

      if (next >= 3) setShowHints(true);
    }
  };

  return (
    <div className="page-container">
      {soundToPlay && <SoundPlayer src={soundToPlay} />}

      <h2>{puzzle.title}</h2>
      <p>{puzzle.instructions}</p>

      <div className="puzzle-layout">
        <div className="puzzle-left">
          <DragDropBoard
            blocks={puzzle.blocks}
            order={order}
            solution={puzzle.solution}
            onReorder={handleReorder}
            showHints={showHints}
          />

          <button className="btn" onClick={handleSubmit} disabled={isSolved}>
            {isSolved ? "Solved!" : "Submit"}
          </button>
          <p>Tries: {tries}</p>
        </div>

        <div className="puzzle-right">
          <LivePreview html={previewHtml} />
        </div>
      </div>

      {isSolved && (
        <div className="puzzle-complete">
          <h3>Level Complete!</h3>
          <MiniShowcase />
        </div>
      )}

      {achievementUnlocked && (
        <AchievementPopup achievement={achievementUnlocked} />
      )}
    </div>
  );
}
