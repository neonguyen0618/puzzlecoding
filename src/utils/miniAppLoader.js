export async function loadMiniApp(path, id) {
  const url = `/miniapps/${path}/${id}.html`;
  const res = await fetch(url);
  return await res.text();
}
