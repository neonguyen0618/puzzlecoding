import { importJSONFile } from "../utils/fileImport.js";

export default function FileImportButton({ onImport }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const json = await importJSONFile(file);
    onImport(json);
  };

  return (
    <label className="btn">
      Import Puzzle JSON
      <input type="file" accept="application/json" hidden onChange={handleFile} />
    </label>
  );
}
