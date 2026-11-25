import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main({
  searchState,
  articles,
  hasMore,
  savedArticles,
  isLoggedIn,
  onSearch,
  onShowMore,
  onToggleSave,
}) {
  return (
    <main className="main">
      <SearchForm onSearch={onSearch} />
      {searchState !== "idle" && (
        <section className="main__results" aria-live="polite">
          {searchState === "results" ? (
            <NewsCardList
              articles={articles}
              hasMore={hasMore}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
              onShowMore={onShowMore}
              onToggleSave={onToggleSave}
            />
          ) : (
            <Preloader status={searchState} />
          )}
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
