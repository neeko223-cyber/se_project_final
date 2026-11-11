import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ theme, isLoggedIn, userName, onSignIn, onSignOut }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, isLoggedIn]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`header header_theme_${theme}${isMenuOpen ? " header_menu-open" : ""}`}
    >
      <div className="header__bar">
        <Link className="header__logo" to="/">
          NewsExplorer
        </Link>
        <Navigation
          theme={theme}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((open) => !open)}
          onSignIn={() => {
            setIsMenuOpen(false);
            onSignIn();
          }}
          onSignOut={() => {
            setIsMenuOpen(false);
            onSignOut();
          }}
        />
      </div>
    </header>
  );
}

export default Header;
