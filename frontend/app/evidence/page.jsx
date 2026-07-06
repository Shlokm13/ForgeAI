"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Layers3,
} from "lucide-react";

import { useAnalysis } from "@/context/AnalysisContext";
import EvidencePanel from "@/components/evidence/EvidencePanel";

export default function EvidencePage() {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return <EmptyEvidenceState />;
  }

  const evidence = analysis.evidence || [];

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-7">
          <p className="text-[10px] font-medium tracking-widest text-evidence-source uppercase mb-2">
            Repository Evidence
          </p>

          <h1 className="text-xl font-semibold text-text-primary">
            Ranked evidence from the latest analysis
          </h1>

          <p className="max-w-3xl mt-3 text-[13.5px] leading-relaxed text-text-secondary">
            Inspect the repository context ForgeAI ranked against your
            engineering question. Evidence order is preserved from the
            backend analysis response.
          </p>
        </header>

        <section className="bg-panel-primary border border-border-subtle rounded-lg mb-7">
          <div className="px-4 py-4 flex items-start gap-3">
            <Layers3
              size={17}
              className="text-forge-purpleLight mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-1.5">
                Latest Engineering Question
              </p>

              <p className="text-[14px] font-medium text-text-primary leading-relaxed">
                {analysis.question}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">
                  Intent
                </span>

                <span className="px-2 py-1 rounded border border-forge-purple/30 bg-forge-purple/10 text-[10px] font-medium text-forge-purpleLight uppercase">
                  {analysis.intent}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase">
                Ranked Repository Context
              </p>

              <p className="text-[11px] text-text-muted mt-1">
                {evidence.length} evidence items returned by ForgeAI
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 text-[12px] text-forge-purpleLight hover:text-text-primary transition-colors"
            >
              Return to analysis
              <ArrowRight size={14} />
            </Link>
          </div>

          <EvidencePanel evidence={evidence} />
        </section>
      </div>
    </div>
  );
}

function EmptyEvidenceState() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-11 h-11 mx-auto rounded-lg border border-border-subtle bg-panel-primary flex items-center justify-center mb-4">
          <FileSearch
            size={19}
            className="text-forge-purpleLight"
          />
        </div>

        <p className="text-[10px] font-medium tracking-widest text-evidence-source uppercase mb-2">
          Repository Evidence
        </p>

        <h1 className="text-lg font-semibold text-text-primary">
          No analysis evidence available
        </h1>

        <p className="text-[13px] leading-relaxed text-text-secondary mt-3">
          Run a repository investigation first. ForgeAI will expose the
          ranked repository evidence associated with that analysis.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-forge-purple text-white text-[13px] font-medium hover:bg-forge-purpleLight transition-colors"
        >
          Ask ForgeAI
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}