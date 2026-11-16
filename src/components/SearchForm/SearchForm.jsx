import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (topic.trim() === "") {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(topic);
  }

  return (
    <section className="search">
      <div className="search__content">
        <h1 className="search__title">What&apos;s going on in the world?</h1>
        <p className="search__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <form className="search__form" role="search" noValidate onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="search-topic">
            Search topic
          </label>
          <input
            className="search__input"
            id="search-topic"
            name="topic"
            type="text"
            placeholder="Enter topic"
            value={topic}
            aria-invalid={error !== ""}
            aria-describedby={error ? "search-keyword-error" : undefined}
            onChange={(event) => {
              setTopic(event.target.value);
              if (error) {
                setError("");
              }
            }}
          />
          {error && (
            <p className="search__error" id="search-keyword-error" role="alert">
              {error}
            </p>
          )}
          <button className="search__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
