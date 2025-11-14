import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="brand">
          PuzzleCoding
        </Link>
      </div>

      <div className="header-right">
        <ThemeToggle />
        {user && <span className="header-user">Hi, {user.username}</span>}
      </div>
    </header>
  );
}
