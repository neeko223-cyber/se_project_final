import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "./SavedNews.css";

function SavedNews({ userName, articles, onDelete }) {
  return (
    <main className="saved">
      <SavedNewsHeader userName={userName} articles={articles} />
      {articles.length > 0 && (
        <section className="saved__results" aria-label="Saved article cards">
          <ul className="saved__list">
            {articles.map((article) => (
              <li className="saved__item" key={article.url}>
                <NewsCard
                  article={article}
                  isSaved
                  isSavedPage
                  isLoggedIn
                  onAction={onDelete}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default SavedNews;
