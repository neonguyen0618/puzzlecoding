import { Link } from "react-router-dom";

export default function PathSelect() {
  return (
    <div className="page-container">
      <h2>Select a Learning Path</h2>

      <div className="card-grid">
        <Link to="/levels/html-basics" className="card">
          <h3>HTML Basics</h3>
          <p>Learn the structure of a simple web page.</p>
        </Link>

        <div className="card card-disabled">
          <h3>Card Game (Coming Soon)</h3>
          <p>Build a small interactive game.</p>
        </div>

        <div className="card card-disabled">
          <h3>Simple Website (Coming Soon)</h3>
          <p>Create a simple multi-section site.</p>
        </div>
      </div>
    </div>
  );
}
