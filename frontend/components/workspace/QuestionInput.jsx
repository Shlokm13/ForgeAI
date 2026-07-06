"use client";

import { useRef, useEffect } from "react";
import { ScanSearch } from "lucide-react";

const MAX_TEXTAREA_HEIGHT = 160;

export default function QuestionInput({
  question,
  loading,
  onQuestionChange,
  onSubmit,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [question]);

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!loading && question.trim()) {
        onSubmit();
      }
    }
  }

  return (
    <div className="px-5 py-3.5 bg-bg-nav border-t border-border-subtle">
      <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-2">
        Ask ForgeAI
      </p>

      <div className="flex items-end gap-3">
        <label htmlFor="forgeai-question-input" className="sr-only">
          Ask an engineering question about the active repository
        </label>
        <textarea
          id="forgeai-question-input"
          ref={textareaRef}
          rows={1}
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about architecture, implementation, code flow, or debugging..."
          className="flex-1 resize-none bg-panel-primary border border-border-DEFAULT focus:border-forge-purple/60 rounded-lg px-3.5 py-2.5 text-[13.5px] text-text-primary placeholder:text-text-muted outline-none transition-colors overflow-y-auto"
          style={{ maxHeight: MAX_TEXTAREA_HEIGHT }}
          disabled={loading}
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || !question.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-forge-purple text-white text-[13px] font-medium hover:bg-forge-purpleLight disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <ScanSearch size={15} />
          Analyze
        </button>
      </div>

      <p className="mt-2 text-[11px] text-text-muted">
        Enter to analyze · Shift + Enter for new line
      </p>
    </div>
  );
}
