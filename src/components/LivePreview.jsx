export default function LivePreview({ html }) {
  return (
    <div className="preview-container">
      <h3>Live Preview</h3>
      <iframe
        title="Puzzle Preview"
        srcDoc={html}
        className="preview-frame"
        sandbox="allow-scripts"
      />
    </div>
  );
}
