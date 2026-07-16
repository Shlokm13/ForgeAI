"use client";

import {
  CheckCircle2,
  Database,
  GitBranch,
} from "lucide-react";

export default function RepositoryCard({
  repository,
  isActive,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(repository)}
      className={`relative w-full overflow-hidden rounded-xl border p-4 text-left transition-colors ${
        isActive
          ? "border-forge-purple/60 bg-forge-purple/10"
          : "border-border-subtle bg-panel-primary hover:border-forge-purple/40 hover:bg-panel-elevated"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-[3px] bg-forge-purple" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                isActive
                  ? "bg-evidence-source"
                  : "bg-text-muted"
              }`}
            />

            <h3 className="text-sm font-semibold truncate text-text-primary">
              {repository.name}
            </h3>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <GitBranch size={13} />

              <span className="font-mono">
                {repository.branch}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Database size={13} />

              <span className="font-mono">
                {repository.indexed_chunks} indexed chunks
              </span>
            </div>
          </div>
        </div>

        {isActive && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-evidence-source/20 bg-evidence-source/10 px-2 py-1 text-[10px] font-medium tracking-wide text-evidence-source uppercase">
            <CheckCircle2 size={12} />
            Active
          </div>
        )}
      </div>
    </button>
  );
}