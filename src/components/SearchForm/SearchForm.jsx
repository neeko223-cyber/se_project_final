import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [topic, setTopic] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(topic);
  }

  return (
    <section className="search">
      <div className="search__content">
        <h1 className="search__title">What&apos;s going on in the world?</h1>
        <p className="search__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <form className="search__form" role="search" onSubmit={handleSubmit}>
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
            required
            onChange={(event) => setTopic(event.target.value)}
          />
          <button className="search__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
