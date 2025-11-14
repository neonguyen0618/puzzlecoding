export default function PuzzleEditorBlock({ block }) {
  return (
    <div className="editor-block">
      <strong>{block.id}</strong>
      <pre>{block.code}</pre>
    </div>
  );
}
