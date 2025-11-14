import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import XPBar from "../../components/XPBar.jsx";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const getCompletedCount = () => {
    if (!user || !user.progress) return 0;
    let count = 0;
    Object.values(user.progress).forEach((p) => {
      count += Object.values(p).filter(Boolean).length;
    });
    return count;
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h2>Hi, {user.username} 👋</h2>
          <p>Choose what you want to do next!</p>
        </div>
        <button className="btn secondary" onClick={logout}>Logout</button>
      </div>

      <section className="dashboard-section">
        <h3>Your Progress</h3>
        <XPBar xp={user.xp || 0} />
        <p>Completed levels: {getCompletedCount()}</p>
      </section>

      <section className="dashboard-section">
        <h3>Tools</h3>
        <div className="button-row">
          <Link className="btn" to="/paths">Start Learning</Link>
          <Link className="btn secondary" to="/achievements">Achievements</Link>
          <Link className="btn" to="/editor">🛠 Puzzle Editor</Link>
          <Link className="btn secondary" to="/admin">📚 Puzzle Admin Hub</Link>
        </div>
      </section>
    </div>
  );
}
