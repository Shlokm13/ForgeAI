"use client";

import { useState } from "react";
import {
  ChevronRight,
  FileCode2,
  Folder,
  FolderOpen,
} from "lucide-react";

import { getSortedChildren } from "@/utils/repositoryTree";

export default function RepositoryTree({ tree }) {
  return (
    <div className="font-mono">
      {getSortedChildren(tree).map((node) => (
        <TreeNode
          key={`${node.type}-${node.name}`}
          node={node}
          depth={0}
        />
      ))}
    </div>
  );
}

function TreeNode({ node, depth }) {
  const [isExpanded, setIsExpanded] = useState(
    depth < 1
  );

  if (node.type === "file") {
    return (
      <div
        className="flex items-center gap-2 py-1.5 pr-3 text-[12.5px] text-text-secondary hover:bg-panel-elevated/60 hover:text-text-primary transition-colors"
        style={{
          paddingLeft: `${16 + depth * 18}px`,
        }}
      >
        <FileCode2
          size={14}
          className="text-text-muted shrink-0"
        />

        <span className="truncate">
          {node.name}
        </span>

        <span className="ml-auto text-[10px] text-text-muted">
          {node.file.extension}
        </span>
      </div>
    );
  }

  const children = getSortedChildren(node);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setIsExpanded((previous) => !previous)
        }
        className="w-full flex items-center gap-2 py-1.5 pr-3 text-left text-[12.5px] text-text-secondary hover:bg-panel-elevated/60 hover:text-text-primary transition-colors"
        style={{
          paddingLeft: `${10 + depth * 18}px`,
        }}
      >
        <ChevronRight
          size={13}
          className={`text-text-muted shrink-0 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />

        {isExpanded ? (
          <FolderOpen
            size={14}
            className="text-forge-purpleLight shrink-0"
          />
        ) : (
          <Folder
            size={14}
            className="text-text-muted shrink-0"
          />
        )}

        <span className="truncate">
          {node.name}
        </span>

        <span className="ml-auto text-[10px] text-text-muted">
          {children.length}
        </span>
      </button>

      {isExpanded && (
        <div>
          {children.map((child) => (
            <TreeNode
              key={`${child.type}-${child.name}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}