import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AnalysisError({ message, onRetry }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-sm text-center">
        <div className="w-9 h-9 mx-auto mb-4 rounded-full bg-danger/10 flex items-center justify-center">
          <AlertTriangle size={16} className="text-danger" />
        </div>
        <p className="text-[13px] font-semibold tracking-wide uppercase text-text-primary mb-2">
          Analysis Failed
        </p>
        <p className="text-[13px] leading-relaxed text-text-secondary mb-1">
          ForgeAI could not complete the repository analysis.
        </p>
        <p className="text-[13px] leading-relaxed text-text-muted mb-5">
          {message || "Try running the analysis again."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-panel-elevated border border-border-DEFAULT text-text-primary text-[13px] font-medium hover:border-forge-purple/40 transition-colors"
        >
          <RotateCcw size={14} />
          Retry Analysis
        </button>
      </div>
    </div>
  );
}
