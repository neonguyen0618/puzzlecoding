export default function PuzzleAdminItem({ puzzle, onDelete }) {
  return (
    <div className="card admin-item">
      <h3>{puzzle.title}</h3>
      <p>{puzzle.instructions}</p>

      <pre className="admin-code">
        Blocks: {puzzle.blocks.length}
        <br />
        Solution: [{puzzle.solution.join(", ")}]
      </pre>

      <button className="btn secondary" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
