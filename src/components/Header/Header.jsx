import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ theme, page, isLoggedIn, userName, onNavigate, onSignIn, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [page, isLoggedIn]);

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

  function handleNavigate(nextPage) {
    setIsMenuOpen(false);
    onNavigate(nextPage);
  }

  return (
    <header
      className={`header header_theme_${theme}${isMenuOpen ? " header_menu-open" : ""}`}
    >
      <div className="header__bar">
        <button className="header__logo" type="button" onClick={() => handleNavigate("home")}>
          NewsExplorer
        </button>
        <Navigation
          theme={theme}
          page={page}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((open) => !open)}
          onNavigate={handleNavigate}
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
