const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatArticleDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatKeyword(keyword) {
  if (!keyword) {
    return "";
  }

  return keyword
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSavedKeywords(articles) {
  const keywords = [];

  articles.forEach((article) => {
    const keyword = formatKeyword(article.keyword);
    if (keyword && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  });

  if (keywords.length === 0) {
    return "";
  }

  if (keywords.length === 1) {
    return keywords[0];
  }

  if (keywords.length === 2) {
    return `${keywords[0]} and ${keywords[1]}`;
  }

  const remaining = keywords.length - 2;
  const otherLabel = remaining === 1 ? "other" : "others";
  return `${keywords[0]}, ${keywords[1]}, and ${remaining} ${otherLabel}`;
}

export function nameFromEmail(email) {
  const localPart = email.split("@")[0]?.trim() || "Reader";
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}
