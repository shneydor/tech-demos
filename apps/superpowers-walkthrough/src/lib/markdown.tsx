import type { ReactNode } from "react";

type MarkdownProps = {
  source: string;
  linkRoot: string;
};

export function Markdown({ source, linkRoot }: MarkdownProps) {
  const blocks = parseBlocks(source);
  return (
    <div className="md">
      {blocks.map((block, index) => renderBlock(block, index, linkRoot))}
    </div>
  );
}

type Block =
  | { type: "code"; text: string }
  | { type: "heading"; level: number; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "rule" }
  | { type: "paragraph"; text: string };

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (index === 0 && line.trim() === "---") {
      const body: string[] = ["---"];
      index = 1;
      while (index < lines.length && (lines[index] ?? "").trim() !== "---") {
        body.push(lines[index] ?? "");
        index += 1;
      }
      if (index < lines.length) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }
    if (line.startsWith("```")) {
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        body.push(lines[index] ?? "");
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)?.[0].length ?? 1;
      blocks.push({ type: "heading", level, text: line.replace(/^#+\s/, "") });
      index += 1;
      continue;
    }
    if (line.trim() === "---" || line.trim() === "***") {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }
    if (line.startsWith(">")) {
      const body: string[] = [];
      while (index < lines.length && (lines[index].startsWith(">") || lines[index].trim() === "")) {
        if (lines[index].trim() === "") break;
        body.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: body.join("\n") });
      continue;
    }
    if (line.startsWith("|") && lines[index + 1]?.includes("|") && lines[index + 1]?.includes("-")) {
      const rows: string[][] = [];
      rows.push(splitRow(line));
      index += 2;
      while (index < lines.length && lines[index].startsWith("|")) {
        rows.push(splitRow(lines[index] ?? ""));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }
    if (/^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      const taken = takeList(lines, index);
      blocks.push({ type: "list", ordered: taken.ordered, items: taken.items });
      index = taken.next;
      continue;
    }
    const body: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].startsWith("```") &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("|") &&
      !lines[index].startsWith(">") &&
      lines[index].trim() !== "---" &&
      lines[index].trim() !== "***" &&
      !/^\s*[-*]\s/.test(lines[index]) &&
      !/^\s*\d+\.\s/.test(lines[index])
    ) {
      body.push(lines[index] ?? "");
      index += 1;
    }
    blocks.push({ type: "paragraph", text: body.join(" ") });
  }
  return blocks;
}

function takeList(lines: string[], start: number): { ordered: boolean; items: string[]; next: number } {
  const ordered = /^\s*\d+\.\s/.test(lines[start] ?? "");
  const marker = ordered ? /^\s*\d+\.\s/ : /^\s*[-*]\s/;
  const items: string[] = [];
  let index = start;
  while (index < lines.length && marker.test(lines[index] ?? "")) {
    let item = (lines[index] ?? "").replace(marker, "");
    index += 1;
    while (index < lines.length && isContinuation(lines[index] ?? "")) {
      item += ` ${(lines[index] ?? "").trim()}`;
      index += 1;
    }
    items.push(item);
  }
  return { ordered, items, next: index };
}

function isContinuation(line: string): boolean {
  if (!/^\s+\S/.test(line)) return false;
  if (/^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) return false;
  if (line.trim() === "---" || line.startsWith("```") || line.startsWith("|")) return false;
  return true;
}

function splitRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderBlock(block: Block, index: number, linkRoot: string): ReactNode {
  const key = `${block.type}-${index}`;
  if (block.type === "code") {
    return (
      <pre key={key}>
        <code>{block.text}</code>
      </pre>
    );
  }
  if (block.type === "heading") {
    const Tag = `h${Math.min(block.level, 4)}` as "h1" | "h2" | "h3" | "h4";
    return <Tag key={key}>{inline(block.text, linkRoot, key)}</Tag>;
  }
  if (block.type === "quote") {
    return <blockquote key={key}>{inline(block.text, linkRoot, key)}</blockquote>;
  }
  if (block.type === "rule") return <hr key={key} />;
  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag key={key}>
        {block.items.map((item, itemIndex) => (
          <li key={`${key}-${itemIndex}`}>{inline(item, linkRoot, `${key}-${itemIndex}`)}</li>
        ))}
      </Tag>
    );
  }
  if (block.type === "table") {
    const [head, ...body] = block.rows;
    return (
      <div key={key} className="table-wrap">
        <table>
          {head ? (
            <thead>
              <tr>
                {head.map((cell, cellIndex) => (
                  <th key={`${key}-h-${cellIndex}`}>{inline(cell, linkRoot, `${key}-h-${cellIndex}`)}</th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`${key}-r-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-c-${rowIndex}-${cellIndex}`}>
                    {inline(cell, linkRoot, `${key}-c-${rowIndex}-${cellIndex}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p key={key}>{inline(block.text, linkRoot, key)}</p>;
}

function inline(text: string, linkRoot: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-i-${index++}`;
    if (match[1] != null) nodes.push(<code key={key}>{match[1]}</code>);
    else if (match[2] != null) nodes.push(<strong key={key}>{match[2]}</strong>);
    else {
      nodes.push(
        <a key={key} href={resolveHref(match[4] ?? "", linkRoot)} target="_blank" rel="noreferrer">
          {match[3]}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function resolveHref(href: string, linkRoot: string): string {
  if (/^(https?:|mailto:)/.test(href)) return href;
  if (href.startsWith("#")) return href;
  const clean = href.replace(/^\.\//, "");
  return `${linkRoot}${clean}`;
}
