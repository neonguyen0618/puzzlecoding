export default function PuzzlePreview({ html }) {
  return (
    <iframe
      title="Puzzle Preview"
      className="preview-frame"
      srcDoc={html}
      sandbox="allow-scripts"
    />
  );
}
