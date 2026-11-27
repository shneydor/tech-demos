export type ArticleStatus = "inbox" | "archived";

export type Article = {
  id: string;
  title: string;
  url: string;
  savedAt: string;
  status: ArticleStatus;
};

export function visibleInbox(articles: readonly Article[]): Article[] {
  return articles
    .filter((article) => article.status === "inbox")
    .sort((a, b) => (a.savedAt < b.savedAt ? 1 : a.savedAt > b.savedAt ? -1 : 0));
}

export function saveArticle(
  articles: readonly Article[],
  input: { id: string; title: string; url: string; savedAt: string },
): Article[] {
  return [...articles, { ...input, status: "inbox" }];
}

export function archiveArticle(articles: readonly Article[], id: string): Article[] {
  return articles.map((article) =>
    article.id === id ? { ...article, status: "archived" } : article,
  );
}
