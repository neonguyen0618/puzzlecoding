export default function MiniShowcase() {
  const example = `
    <html>
      <body style="font-family: Arial; padding: 20px;">
        <h1 style="color: green;">You built your first HTML structure!</h1>
        <p>This is a mini example of what HTML can do.</p>
        <button onclick="alert('You clicked a button!')">Click Me</button>
      </body>
    </html>
  `;

  return (
    <div className="preview-container">
      <h3>Mini Web App Example</h3>
      <iframe
        title="Mini App Showcase"
        srcDoc={example}
        className="preview-frame"
        sandbox="allow-scripts"
      />
    </div>
  );
}
