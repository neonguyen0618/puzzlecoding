export default function XPBar({ xp }) {
  const xpPerLevel = 100;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXP = xp % xpPerLevel;
  const percent = Math.min(100, Math.round((currentLevelXP / xpPerLevel) * 100));

  return (
    <div className="xp-container">
      <div className="xp-info">
        <span>Level {level}</span>
        <span>{currentLevelXP} / {xpPerLevel} XP</span>
      </div>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
