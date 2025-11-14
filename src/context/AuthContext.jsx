import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("puzzlecoding_user");
    return saved ? JSON.parse(saved) : null;
  });

  const register = (username, password) => {
    const stored = JSON.parse(localStorage.getItem("puzzlecoding_users") || "{}");

    if (stored[username]) {
      return { success: false, message: "Username already exists." };
    }

    const newUser = {
      username,
      password,
      xp: 0,
      achievements: [],
      progress: {} // e.g. { "html-basics": { "html-1": true } }
    };

    stored[username] = newUser;

    localStorage.setItem("puzzlecoding_users", JSON.stringify(stored));
    localStorage.setItem("puzzlecoding_user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const login = (username, password) => {
    const stored = JSON.parse(localStorage.getItem("puzzlecoding_users") || "{}");

    if (!stored[username] || stored[username].password !== password) {
      return { success: false, message: "Invalid username or password." };
    }

    localStorage.setItem("puzzlecoding_user", JSON.stringify(stored[username]));
    setUser(stored[username]);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("puzzlecoding_user");
  };

  const persistUser = (updatedUser) => {
    const stored = JSON.parse(localStorage.getItem("puzzlecoding_users") || "{}");
    stored[updatedUser.username] = updatedUser;
    localStorage.setItem("puzzlecoding_users", JSON.stringify(stored));
    localStorage.setItem("puzzlecoding_user", JSON.stringify(updatedUser));
  };

  const addXP = (amount) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, xp: prev.xp + amount };
      persistUser(updated);
      return updated;
    });
  };

  const addAchievement = (id) => {
    setUser((prev) => {
      if (!prev || prev.achievements.includes(id)) return prev;

      const updated = {
        ...prev,
        achievements: [...prev.achievements, id]
      };

      persistUser(updated);
      return updated;
    });
  };

  const markLevelCompleted = (pathId, levelId) => {
    setUser((prev) => {
      if (!prev) return prev;

      const prevProgress = prev.progress || {};
      const pathProgress = prevProgress[pathId] || {};

      if (pathProgress[levelId]) return prev; // already completed

      const newPathProgress = {
        ...pathProgress,
        [levelId]: true
      };

      const updated = {
        ...prev,
        progress: {
          ...prevProgress,
          [pathId]: newPathProgress
        }
      };

      persistUser(updated);
      return updated;
    });
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
      addXP,
      addAchievement,
      markLevelCompleted
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
