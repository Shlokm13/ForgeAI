// Maps file extensions found in repository evidence to
// react-syntax-highlighter language identifiers.
const EXTENSION_LANGUAGE_MAP = {
  py: "python",
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  json: "json",
  css: "css",
  html: "html",
  md: "markdown",
  java: "java",
  cpp: "cpp",
  c: "c",
  sh: "bash",
  yml: "yaml",
  yaml: "yaml",
  sql: "sql",
  go: "go",
  rs: "rust",
};

export function getLanguageFromFileName(fileName = "") {
  const parts = fileName.split(".");
  if (parts.length < 2) return "text";
  const ext = parts[parts.length - 1].toLowerCase();
  return EXTENSION_LANGUAGE_MAP[ext] || "text";
}
