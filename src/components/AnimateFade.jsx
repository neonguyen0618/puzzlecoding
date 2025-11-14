import { useState, useEffect } from "react";

export default function AnimateFade({ children, duration = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`
      }}
    >
      {children}
    </div>
  );
}
