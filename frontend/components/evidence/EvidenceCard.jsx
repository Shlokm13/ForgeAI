"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CodeEvidence from "./CodeEvidence";
import { getEvidenceAccent, getEvidenceTypeLabel } from "./evidenceTypes";

export default function EvidenceCard({ evidence, rank }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accent = getEvidenceAccent(evidence.evidence_type);
  const rankLabel = String(rank).padStart(2, "0");

  return (
    <div className="rounded-lg border border-border-subtle bg-panel-secondary overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left hover:bg-panel-elevated/60 transition-colors"
      >
        <span className="font-mono text-xs text-text-muted w-5 shrink-0">
          {rankLabel}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-text-primary truncate">
            {evidence.file_name}
          </p>
          <p className="text-[11px] text-text-muted font-mono truncate">
            {evidence.file_path}
          </p>
        </div>

        <span
          className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-medium tracking-wide ${accent.text} ${accent.border} ${accent.bg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          {getEvidenceTypeLabel(evidence.evidence_type)}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-text-muted transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3.5 pb-3.5 pt-1">
            <EvidenceContent evidence={evidence} />
          </div>
        </div>
      </div>

      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-expanded={isExpanded}
          className="w-full text-left px-3.5 pb-3 text-[11px] text-forge-purpleLight hover:text-forge-purpleLight/80 transition-colors"
        >
          View Evidence
        </button>
      )}
    </div>
  );
}

function EvidenceContent({ evidence }) {
  if (evidence.evidence_type === "source_code") {
    return (
      <CodeEvidence content={evidence.content} fileName={evidence.file_name} />
    );
  }

  if (evidence.evidence_type === "documented") {
    return (
      <div className="rounded-lg border border-border-subtle bg-panel-primary p-3.5">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="text-[13px] leading-relaxed text-text-secondary">
                {children}
              </p>
            ),
          }}
        >
          {evidence.content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-panel-primary p-3.5">
      <p className="text-[13px] leading-relaxed text-text-secondary">
        {evidence.content}
      </p>
    </div>
  );
}
