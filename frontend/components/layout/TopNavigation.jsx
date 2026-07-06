"use client";

import { GitBranch, FolderGit2, PanelLeft } from "lucide-react";
import ForgeMark from "./ForgeMark";

export default function TopNavigation({
  repositoryName,
  branch = "main",
  onToggleSidebar,
  onOpenRepositoryPanel,
}) {
  return (
    <header className="h-14 flex items-center justify-between px-4 bg-bg-nav border-b border-border-subtle shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-panel-elevated transition-colors md:hidden"
        >
          <PanelLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          <ForgeMark size={26} />
          <span className="font-semibold tracking-tight text-[15px] text-text-primary">
            ForgeAI
          </span>
        </div>

        <span className="hidden sm:block w-px h-4 bg-border-DEFAULT" />

        <span className="hidden sm:block text-xs text-text-muted tracking-wide uppercase">
          Repository Intelligence
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 text-xs text-text-secondary">
        <button
          type="button"
          onClick={onOpenRepositoryPanel}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-panel-elevated transition-colors"
          aria-label="Open repository selector"
        >
          <FolderGit2
            size={14}
            className="text-text-muted"
          />

          <span className="font-mono">
            {repositoryName}
          </span>
        </button>
        <div className="flex items-center gap-1.5">
          <GitBranch size={14} className="text-text-muted" />
          <span className="font-mono">{branch}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-elevated border border-border-subtle">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-evidence-source opacity-60 animate-pulse-dot" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-evidence-source" />
          </span>
          <span className="text-[11px] font-medium tracking-wide text-evidence-source">
            READY
          </span>
        </div>

        
      </div>
    </header>
  );
}
