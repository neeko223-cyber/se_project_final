import "./Navigation.css";

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="navigation__logout-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M10 7V5H5v14h5v-2"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 12h9M16 8l4 4-4 4"
      />
    </svg>
  );
}

function Navigation({
  theme,
  page,
  isLoggedIn,
  userName,
  isMenuOpen,
  onToggleMenu,
  onNavigate,
  onSignIn,
  onSignOut,
}) {
  const homeClass = page === "home" ? "navigation__link navigation__link_active" : "navigation__link";
  const savedClass = page === "saved" ? "navigation__link navigation__link_active" : "navigation__link";

  return (
    <nav
      className={`navigation navigation_theme_${theme}${isMenuOpen ? " navigation_open" : ""}`}
      aria-label="Main"
    >
      <button
        className="navigation__menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={onToggleMenu}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div className="navigation__panel">
        <button className={homeClass} type="button" onClick={() => onNavigate("home")}>
          Home
        </button>
        {isLoggedIn && (
          <button className={savedClass} type="button" onClick={() => onNavigate("saved")}>
            Saved articles
          </button>
        )}
        {isLoggedIn ? (
          <button className="navigation__logout" type="button" onClick={onSignOut}>
            <span className="navigation__user">{userName}</span>
            <LogoutIcon />
          </button>
        ) : (
          <button className="navigation__signin" type="button" onClick={onSignIn}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
