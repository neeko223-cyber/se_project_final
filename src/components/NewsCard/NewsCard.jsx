import { formatArticleDate, formatKeyword } from "../../utils/format";
import "./NewsCard.css";

function BookmarkIcon({ filled }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 3h6l1 2h5v2H3V5h5l1-2zm0 6h2v9H9V9zm4 0h2v9h-2V9zM6 9h2v9H6V9z"
      />
    </svg>
  );
}

function NewsCard({ article, isSaved, isSavedPage, isLoggedIn, onAction }) {
  let label = "Save article";

  if (isSavedPage) {
    label = "Remove from saved";
  } else if (!isLoggedIn) {
    label = "Sign in to save articles";
  } else if (isSaved) {
    label = "Remove from saved";
  }

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img className="card__image" src={article.image} alt={article.title} />
        {isSavedPage && article.keyword && (
          <span className="card__keyword">{formatKeyword(article.keyword)}</span>
        )}
        <button
          className={`card__action${isSaved ? " card__action_saved" : ""}`}
          type="button"
          aria-label={label}
          onClick={() => onAction(article)}
        >
          <span className="card__tooltip">{label}</span>
          {isSavedPage ? <TrashIcon /> : <BookmarkIcon filled={isSaved} />}
        </button>
      </div>
      <div className="card__body">
        <time className="card__date" dateTime={article.publishedAt}>
          {formatArticleDate(article.publishedAt)}
        </time>
        <h3 className="card__title">
          <a className="card__link" href={article.url} target="_blank" rel="noreferrer">
            {article.title}
          </a>
        </h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
