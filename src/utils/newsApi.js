const newsApiBaseUrl = import.meta.env.PROD
  ? "https://news-api-proxy.up.railway.app/news/v2/everything"
  : "https://newsapi.org/v2/everything";

function toApiDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function searchNews(keyword, signal) {
  const to = new Date();
  const from = new Date(to);
  from.setDate(to.getDate() - 7);

  const parameters = new URLSearchParams({
    q: keyword,
    apiKey: import.meta.env.VITE_NEWS_API_KEY ?? "",
    from: toApiDate(from),
    to: toApiDate(to),
    pageSize: "100",
  });

  return fetch(`${newsApiBaseUrl}?${parameters}`, { signal }).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error(`News API error: ${response.status}`));
    }

    return response.json().then((data) => {
      if (data.status !== "ok" || !Array.isArray(data.articles)) {
        return Promise.reject(new Error("News API returned an unexpected response"));
      }

      return data.articles;
    });
  });
}
