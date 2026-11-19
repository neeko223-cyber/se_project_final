import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import {
  authorize,
  checkToken,
  deleteArticle,
  getSavedArticles,
  getToken,
  register,
  removeToken,
  saveArticle,
} from "../../utils/mainApi";
import { searchNews } from "../../utils/newsApi";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(() => Boolean(getToken()));
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchState, setSearchState] = useState("idle");
  const [activeKeyword, setActiveKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const searchAbort = useRef(null);

  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    return () => searchAbort.current?.abort();
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAuthChecking(false);
      return undefined;
    }

    let cancelled = false;
    checkToken(token)
      .then((user) => {
        if (cancelled) {
          return null;
        }
        setCurrentUser(user);
        return getSavedArticles(token);
      })
      .then((articles) => {
        if (!cancelled && articles) {
          setSavedArticles(articles);
        }
      })
      .catch(() => {
        if (!cancelled) {
          removeToken();
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsAuthChecking(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSearch(keyword) {
    const term = keyword.trim();
    searchAbort.current?.abort();
    const controller = new AbortController();
    searchAbort.current = controller;

    setActiveKeyword(term);
    setArticles([]);
    setVisibleCount(3);
    setSearchState("loading");

    searchNews(term, controller.signal)
      .then((nextArticles) => {
        if (searchAbort.current !== controller) {
          return;
        }

        setArticles(nextArticles);
        setSearchState(nextArticles.length > 0 ? "results" : "nothing");
      })
      .catch((error) => {
        if (error.name === "AbortError" || searchAbort.current !== controller) {
          return;
        }

        setArticles([]);
        setSearchState("error");
      });
  }

  function handleToggleSave(article) {
    const token = getToken();
    if (!currentUser || !token) {
      setModal("login");
      return;
    }

    const alreadySaved = savedArticles.find((item) => item.url === article.url);
    const request = alreadySaved
      ? deleteArticle(token, alreadySaved._id).then(() => {
          setSavedArticles((current) => current.filter((item) => item._id !== alreadySaved._id));
        })
      : saveArticle(token, { ...article, keyword: activeKeyword }).then((stored) => {
          setSavedArticles((current) => [stored, ...current.filter((item) => item.url !== stored.url)]);
        });

    request.catch(() => {
      removeToken();
      setCurrentUser(null);
      setSavedArticles([]);
      setModal("login");
    });
  }

  function handleDelete(article) {
    const token = getToken();
    if (!token) {
      return;
    }

    deleteArticle(token, article._id)
      .then(() => {
        setSavedArticles((current) => current.filter((item) => item._id !== article._id));
      })
      .catch(() => {
        removeToken();
        setCurrentUser(null);
        setSavedArticles([]);
        navigate("/");
      });
  }

  function handleLogin({ email, password }) {
    return authorize({ email, password }).then((user) => {
      setCurrentUser({ email: user.email, name: user.name });
      setModal(null);
      return getSavedArticles(user.token).then(setSavedArticles);
    });
  }

  function handleRegister({ email, password, username }) {
    return register({ email, password, name: username }).then(() => {
      setModal("success");
    });
  }

  function handleSignOut() {
    removeToken();
    setCurrentUser(null);
    setSavedArticles([]);
    setModal(null);
    navigate("/");
  }

  const isLoggedIn = Boolean(currentUser);
  const onSavedNews = location.pathname === "/saved-news";

  return (
    <div className="page">
      <Header
        theme={onSavedNews && (isLoggedIn || isAuthChecking) ? "solid" : "overlay"}
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
            isAuthChecking ? null : isLoggedIn ? (
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
