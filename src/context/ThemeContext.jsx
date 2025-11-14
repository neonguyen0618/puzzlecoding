import { createContext, useState, } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("puzzle_theme") || "light";
  });

  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    setTheme(t);
    localStorage.setItem("puzzle_theme", t);
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "light" ? "theme-light" : "theme-dark"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
