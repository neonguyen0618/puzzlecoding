import { useEffect, useState } from "react";
import AnimateFade from "./AnimateFade.jsx";
import SoundPlayer from "./SoundPlayer.jsx";
import soundAchievement from "../sounds/achievement.mp3";

export default function AchievementPopup({ achievement }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <>
      <SoundPlayer src={soundAchievement} />

      <AnimateFade duration={300}>
        <div className="achievement-popup">
          <h3>🏆 Achievement Unlocked!</h3>
          <h4>{achievement.title}</h4>
          <p>{achievement.description}</p>
        </div>
      </AnimateFade>
    </>
  );
}
