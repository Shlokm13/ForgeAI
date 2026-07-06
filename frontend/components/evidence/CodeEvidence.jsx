"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { getLanguageFromFileName } from "@/utils/languageMap";

const codeStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "#080D13",
    margin: 0,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "#080D13",
  },
};

export default function CodeEvidence({ content, fileName }) {
  const [copied, setCopied] = useState(false);
  const language = getLanguageFromFileName(fileName);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permissions may be unavailable; fail silently in UI.
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border-subtle bg-panel-code">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border-subtle">
        <span className="text-[11px] font-mono text-text-muted uppercase tracking-wide">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-text-secondary transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} className="text-evidence-source" />
              <span className="text-evidence-source">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto text-[12.5px]">
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          customStyle={{
            margin: 0,
            padding: "14px",
            background: "#080D13",
            fontSize: "12.5px",
          }}
          wrapLongLines={false}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
