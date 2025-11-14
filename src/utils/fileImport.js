export function importJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch {
        reject("Invalid JSON file.");
      }
    };

    reader.onerror = () => reject("Could not read file.");
    reader.readAsText(file);
  });
}
