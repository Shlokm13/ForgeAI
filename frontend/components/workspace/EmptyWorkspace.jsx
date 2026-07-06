import { EMPTY_STATE_SUGGESTIONS } from "@/data/mockAnalysis";

export default function EmptyWorkspace({ onSelectSuggestion }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-2">
          Repository Intelligence
        </p>
        <p className="text-[13.5px] leading-relaxed text-text-secondary mb-6">
          Inspect implementation, architecture, code flow, and debugging
          behavior across the active repository.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EMPTY_STATE_SUGGESTIONS.map((item) => (
            <button
              key={item.intent}
              type="button"
              onClick={() => onSelectSuggestion(item.question)}
              className="text-left p-3.5 rounded-lg bg-panel-primary border border-border-subtle hover:border-forge-purple/40 hover:bg-panel-secondary transition-colors"
            >
              <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-1.5">
                {item.label}
              </p>
              <p className="text-[13px] leading-snug text-text-secondary">
                {item.question}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
