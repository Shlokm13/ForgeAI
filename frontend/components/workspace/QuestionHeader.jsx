import { X } from "lucide-react";
import IntentBadge from "./IntentBadge";

export default function QuestionHeader({ question, intent, onClear }) {
  return (
    <div className="px-5 py-4 border-b border-border-subtle">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase">
          Engineering Question
        </p>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text-secondary transition-colors"
        >
          <X size={12} />
          Clear Analysis
        </button>
      </div>

      <h1 className="mt-2 text-[15px] leading-snug text-text-primary font-medium">
        {question}
      </h1>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase">
          Intent
        </span>
        <IntentBadge intent={intent} />
      </div>
    </div>
  );
}
