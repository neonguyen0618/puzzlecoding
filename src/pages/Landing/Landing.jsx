import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="page-container center">
      <h2>Welcome to PuzzleCoding</h2>
      <p>Learn HTML, CSS, and React by solving code puzzles.</p>

      <div className="button-row">
        <Link to="/login" className="btn">
          Login
        </Link>
        <Link to="/register" className="btn secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
