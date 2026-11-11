import "./Footer.css";

function GithubIcon() {
  return (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.2C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7z"
      />
    </svg>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 Supersite, Powered by News API</p>
      <nav className="footer__nav" aria-label="Footer">
        <button className="footer__link" type="button" onClick={() => onNavigate("home")}>
          Home
        </button>
        <a className="footer__link" href="https://tripleten.com" target="_blank" rel="noreferrer">
          Practicum by Yandex
        </a>
        <a className="footer__social" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon />
        </a>
        <a className="footer__social" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <FacebookIcon />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
