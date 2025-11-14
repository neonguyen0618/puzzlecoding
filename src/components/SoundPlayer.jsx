export default function SoundPlayer({ src }) {
  const audio = new Audio(src);
  audio.volume = 0.4;
  audio.play();
  return null;
}
