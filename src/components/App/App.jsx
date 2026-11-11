import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import { nameFromEmail } from "../../utils/format";
import sampleArticles from "../../utils/sampleArticles";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchState, setSearchState] = useState("idle");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const searchTimeout = useRef(null);

  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    return () => clearTimeout(searchTimeout.current);
  }, []);

  function handleSearch(keyword) {
    const term = keyword.trim();
    if (!term) {
      return;
    }

    setActiveKeyword(term);
    setSearchState("loading");
    clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      if (term.toLowerCase() === "error") {
        setArticles([]);
        setSearchState("error");
        return;
      }

      const normalized = term.toLowerCase();
      const matches = sampleArticles.filter((article) =>
        [article.title, article.description, article.source, article.topic]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      );

      setArticles(matches);
      setVisibleCount(3);
      setSearchState(matches.length > 0 ? "results" : "nothing");
    }, 800);
  }

  function handleToggleSave(article) {
    if (!currentUser) {
      setModal("login");
      return;
    }

    setSavedArticles((current) => {
      const alreadySaved = current.some((item) => item.url === article.url);
      if (alreadySaved) {
        return current.filter((item) => item.url !== article.url);
      }

      return [{ ...article, keyword: activeKeyword || article.topic }, ...current];
    });
  }

  function handleDelete(article) {
    setSavedArticles((current) => current.filter((item) => item.url !== article.url));
  }

  function handleLogin({ email }) {
    const matchedRegistration =
      registeredUser && registeredUser.email.toLowerCase() === email.trim().toLowerCase();

    setCurrentUser({
      email: email.trim(),
      name: matchedRegistration ? registeredUser.name : nameFromEmail(email),
    });
    setModal(null);
  }

  function handleRegister({ email, username }) {
    setRegisteredUser({ email: email.trim(), name: username.trim() });
    setModal("success");
  }

  function handleSignOut() {
    setCurrentUser(null);
    setModal(null);
    navigate("/");
  }

  const isLoggedIn = Boolean(currentUser);
  const onSavedNews = location.pathname === "/saved-news";

  return (
    <div className="page">
      <Header
        theme={onSavedNews && isLoggedIn ? "solid" : "overlay"}
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name ?? ""}
        onSignIn={() => setModal("login")}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchState={searchState}
              articles={articles.slice(0, visibleCount)}
              hasMore={visibleCount < articles.length}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
              onSearch={handleSearch}
              onShowMore={() => setVisibleCount((count) => count + 3)}
              onToggleSave={handleToggleSave}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            isLoggedIn ? (
              <SavedNews
                userName={currentUser.name}
                articles={savedArticles}
                onDelete={handleDelete}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      <Footer />
      <LoginModal
        isOpen={modal === "login"}
        onClose={closeModal}
        onLogin={handleLogin}
        onSwitchToRegister={() => setModal("register")}
      />
      <RegisterModal
        isOpen={modal === "register"}
        onClose={closeModal}
        onRegister={handleRegister}
        onSwitchToLogin={() => setModal("login")}
      />
      <ModalWithForm
        name="success"
        title="Registration successfully completed!"
        isOpen={modal === "success"}
        onClose={closeModal}
        redirectLinkText="Sign in"
        redirectAlign="left"
        onRedirect={() => setModal("login")}
      />
    </div>
  );
}

export default App;
