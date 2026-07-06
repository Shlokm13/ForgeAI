"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutGrid,
  MessageSquareCode,
  Layers,
  FolderTree,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const NAV_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    href: "/overview",
    icon: LayoutGrid,
  },
  {
    key: "ask",
    label: "Ask ForgeAI",
    href: "/",
    icon: MessageSquareCode,
  },
  {
    key: "evidence",
    label: "Evidence",
    href: "/evidence",
    icon: Layers,
  },
  {
    key: "files",
    label: "Repository Files",
    href: "/repository",
    icon: FolderTree,
  },
];

export default function Sidebar({
  repositoryName,
  branch = "main",
  collapsed,
  onToggleCollapsed,
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`shrink-0 bg-bg-sidebar border-r border-border-subtle flex flex-col transition-[width] duration-200 ease-out ${
        collapsed ? "w-[64px]" : "w-[248px]"
      }`}
    >
      <nav className="flex-1 flex flex-col gap-1 px-2.5 pt-4">
        {!collapsed && (
          <div className="px-2 pb-3">
            <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-1.5">
              Repository
            </p>

            <p className="text-sm font-medium text-text-primary font-mono truncate">
              {repositoryName}
            </p>

            <p className="text-xs text-text-muted font-mono">
              {branch}
            </p>
          </div>
        )}

        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ key, label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-label={collapsed ? label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors relative ${
                    isActive
                      ? "bg-forge-purple/10 text-text-primary"
                      : "text-text-secondary hover:bg-panel-elevated hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-forge-purple" />
                  )}

                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-forge-purpleLight"
                        : "text-text-muted"
                    }
                  />

                  {!collapsed && (
                    <span className="truncate">{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {!collapsed && (
          <>
            <div className="mt-6 px-2">
  <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-2">
    Intelligence Scope
  </p>

  <dl className="space-y-2 text-xs">
    <ContextRow
      label="Context"
      value="Repository"
    />

    <ContextRow
      label="Retrieval"
      value="Semantic"
    />

    <ContextRow
      label="Evidence"
      value="Ranked"
    />
  </dl>
</div>

    <div className="mt-5 px-2">
      <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-2">
        Analysis Modes
      </p>

      <dl className="space-y-2 text-xs">
        <ContextRow
          label="Implementation"
          value="Ready"
        />

        <ContextRow
          label="Architecture"
          value="Ready"
        />

        <ContextRow
          label="Debugging"
          value="Ready"
        />

        <ContextRow
          label="Code Flow"
          value="Ready"
        />
      </dl>
    </div>
          </>
        )}
      </nav>

      <div className="px-2.5 py-3 border-t border-border-subtle">
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={
            collapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-panel-elevated transition-colors"
        >
          {collapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
        </button>
      </div>
    </aside>
  );
}

function ContextRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-text-muted">{label}</dt>

      <dd className="text-text-secondary font-mono">
        {value}
      </dd>
    </div>
  );
}