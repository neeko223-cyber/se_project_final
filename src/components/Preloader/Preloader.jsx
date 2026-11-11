import "./Preloader.css";

const messages = {
  loading: "Searching for news...",
  nothing: "Sorry, but nothing matched your search terms.",
  error:
    "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.",
};

function StatusIcon({ status }) {
  if (status === "loading") {
    return <span className="preloader__spinner" />;
  }

  return (
    <svg className="preloader__icon" viewBox="0 0 74 74" aria-hidden="true">
      <circle cx="37" cy="37" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="27" cy="32" r="3" fill="currentColor" />
      <circle cx="47" cy="32" r="3" fill="currentColor" />
      <path d="M27 50c4-6 16-6 20 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Preloader({ status }) {
  const title = status === "nothing" ? "Nothing found" : "";

  return (
    <div className={`preloader preloader_status_${status}`} role="status">
      <StatusIcon status={status} />
      {title && <h2 className="preloader__title">{title}</h2>}
      <p className="preloader__text">{messages[status]}</p>
    </div>
  );
}

export default Preloader;
