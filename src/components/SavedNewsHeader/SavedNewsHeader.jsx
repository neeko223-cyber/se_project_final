import { formatSavedKeywords } from "../../utils/format";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ userName, articles }) {
  const count = articles.length;
  const noun = count === 1 ? "saved article" : "saved articles";
  const keywords = formatSavedKeywords(articles);

  return (
    <section className="saved-header">
      <p className="saved-header__label">Saved articles</p>
      <h1 className="saved-header__title">
        {userName}, you have {count} {noun}
      </h1>
      {keywords && (
        <p className="saved-header__keywords">
          By keywords: <span className="saved-header__keywords-value">{keywords}</span>
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
