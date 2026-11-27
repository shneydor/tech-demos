import assert from "node:assert/strict";
import test from "node:test";
import { archiveArticle, saveArticle, visibleInbox, type Article } from "./inbox.ts";

const older: Article = {
  id: "a",
  title: "Older",
  url: "https://example.com/older",
  savedAt: "2026-11-01T10:00:00.000Z",
  status: "inbox",
};

const newer: Article = {
  id: "b",
  title: "Newer",
  url: "https://example.com/newer",
  savedAt: "2026-11-02T10:00:00.000Z",
  status: "inbox",
};

test("inbox lists newest save first and hides archived articles", () => {
  const saved = saveArticle(saveArticle([], older), newer);
  const archived = archiveArticle(saved, newer.id);
  assert.deepEqual(
    visibleInbox(archived).map((article) => article.id),
    ["a"],
  );
});
