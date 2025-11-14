import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function PuzzleBlock({ id, code, isIncorrect }) {
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
    border: isIncorrect ? "2px solid #e53935" : "1px solid var(--primary)",
    background: isDragging ? "rgba(0,0,0,0.1)" : "var(--card-bg-light)",
    cursor: "grab",
    whiteSpace: "pre",
    animation: isIncorrect ? "shake 0.3s" : "none"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <code>{code}</code>
    </div>
  );
}
