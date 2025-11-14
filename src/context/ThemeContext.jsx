import { createContext, useState, useMemo, useEffect } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("puzzle_theme") || "light";
  });

  useEffect(() => {
    // Remove both classes
    document.body.classList.remove("light", "dark");

    // Add current theme
    document.body.classList.add(theme);

    // Save preference
    localStorage.setItem("puzzle_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
