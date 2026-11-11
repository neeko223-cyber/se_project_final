import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  hasMore,
  savedArticles,
  isLoggedIn,
  onShowMore,
  onToggleSave,
}) {
  return (
    <div className="cards">
      <h2 className="cards__title">Search results</h2>
      <ul className="cards__list">
        {articles.map((article) => (
          <li className="cards__item" key={article.url}>
            <NewsCard
              article={article}
              isSaved={savedArticles.some((item) => item.url === article.url)}
              isSavedPage={false}
              isLoggedIn={isLoggedIn}
              onAction={onToggleSave}
            />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button className="cards__more" type="button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
