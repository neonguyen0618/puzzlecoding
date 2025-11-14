export default function CodeEditor({ value, onChange }) {
  return (
    <textarea
      className="editor-codearea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="<div>Hello</div>"
    />
  );
}
