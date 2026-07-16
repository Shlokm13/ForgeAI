"use client";

import { Database, GitBranch } from "lucide-react";

import { EMPTY_STATE_SUGGESTIONS } from "@/data/mockAnalysis";
import { useActiveRepository } from "@/context/ActiveRepositoryContext";

export default function EmptyWorkspace({
  onSelectSuggestion,
}) {
  const { activeRepository } =
    useActiveRepository();

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full max-w-lg py-8 mx-auto">
        <div className="mb-7">
          <p className="text-[10px] font-medium tracking-widest text-evidence-source uppercase mb-2">
            Repository Ready
          </p>

          <h1 className="font-mono text-xl font-semibold text-text-primary">
            {activeRepository.name}
          </h1>

          <div className="mt-3 flex items-center gap-5 text-[12px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <GitBranch size={13} />

              <span className="font-mono">
                {activeRepository.branch}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Database size={13} />

              <span>
                Repository index available
              </span>
            </div>
          </div>

          <p className="mt-4 text-[13.5px] leading-relaxed text-text-secondary">
            ForgeAI is ready to investigate
            implementation, architecture, code flow,
            and debugging behavior using indexed
            repository context.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-3">
            Suggested Investigations
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {EMPTY_STATE_SUGGESTIONS.map(
              (item) => (
                <button
                  key={item.intent}
                  type="button"
                  onClick={() =>
                    onSelectSuggestion(
                      item.question
                    )
                  }
                  className="text-left p-3.5 rounded-lg bg-panel-primary border border-border-subtle hover:border-forge-purple/40 hover:bg-panel-secondary transition-colors"
                >
                  <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-1.5">
                    {item.label}
                  </p>

                  <p className="text-[13px] leading-snug text-text-secondary">
                    {item.question}
                  </p>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}