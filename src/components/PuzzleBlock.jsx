import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function PuzzleBlock({ id, code, isIncorrect, isSolved }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    background: isDragging ? "rgba(0,0,0,0.1)" : "",
    cursor: isSolved ? "default" : "grab",
    whiteSpace: "pre",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    border: "1px solid var(--primary)"
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`puzzle-block ${isIncorrect && !isSolved ? "hint" : ""}`}
      style={style}
    >
      <code>{code}</code>

      {isIncorrect && !isSolved && (
        <span className="incorrect-label">Incorrect</span>
      )}
    </div>
  );
}
