const USERS_KEY = "news-explorer-users";
const ARTICLES_KEY = "news-explorer-articles";
const TOKEN_KEY = "jwt";
const RESPONSE_DELAY = 300;

function respond(produce) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(produce());
      } catch (error) {
        reject(error);
      }
    }, RESPONSE_DELAY);
  });
}

function readJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function readUsers() {
  const users = readJson(USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

function readArticlesByEmail() {
  const articles = readJson(ARTICLES_KEY, {});
  return articles && typeof articles === "object" ? articles : {};
}

function findUser(email) {
  const normalized = email.trim().toLowerCase();
  return readUsers().find((user) => user.email === normalized) ?? null;
}

function createToken(email) {
  return `stub.${btoa(JSON.stringify({ email }))}`;
}

function emailFromToken(token) {
  if (typeof token !== "string" || !token.startsWith("stub.")) {
    throw new Error("Invalid token");
  }

  const payload = JSON.parse(atob(token.slice(5)));
  if (!payload?.email) {
    throw new Error("Invalid token");
  }

  return payload.email;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function register({ email, password, name }) {
  return respond(() => {
    const normalized = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((user) => user.email === normalized)) {
      throw new Error("This email is not available");
    }

    const user = { email: normalized, password, name: name.trim() };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { email: user.email, name: user.name };
  });
}

export function authorize({ email, password }) {
  return respond(() => {
    const user = findUser(email);
    if (!user || user.password !== password) {
      throw new Error("Incorrect email or password");
    }

    const token = createToken(user.email);
    localStorage.setItem(TOKEN_KEY, token);
    return { token, email: user.email, name: user.name };
  });
}

export function checkToken(token) {
  return respond(() => {
    const user = findUser(emailFromToken(token));
    if (!user) {
      throw new Error("Invalid token");
    }

    return { email: user.email, name: user.name };
  });
}

export function getSavedArticles(token) {
  return respond(() => {
    const email = emailFromToken(token);
    if (!findUser(email)) {
      throw new Error("Invalid token");
    }

    const articles = readArticlesByEmail()[email];
    return Array.isArray(articles) ? articles : [];
  });
}

export function saveArticle(token, article) {
  return respond(() => {
    const email = emailFromToken(token);
    if (!findUser(email)) {
      throw new Error("Invalid token");
    }

    const articlesByEmail = readArticlesByEmail();
    const saved = Array.isArray(articlesByEmail[email]) ? articlesByEmail[email] : [];
    const existing = saved.find((item) => item.url === article.url);
    if (existing) {
      return existing;
    }

    const stored = {
      _id: crypto.randomUUID(),
      keyword: article.keyword || "",
      source: article.source,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    };
    articlesByEmail[email] = [stored, ...saved];
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articlesByEmail));
    return stored;
  });
}

export function deleteArticle(token, articleId) {
  return respond(() => {
    const email = emailFromToken(token);
    if (!findUser(email)) {
      throw new Error("Invalid token");
    }

    const articlesByEmail = readArticlesByEmail();
    const saved = Array.isArray(articlesByEmail[email]) ? articlesByEmail[email] : [];
    articlesByEmail[email] = saved.filter((item) => item._id !== articleId);
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articlesByEmail));
  });
}
