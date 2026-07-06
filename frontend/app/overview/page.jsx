"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Database,
  FileCode2,
  Files,
  GitBranch,
  HardDrive,
  Network,
} from "lucide-react";

import { useActiveRepository } from "@/context/ActiveRepositoryContext";
import { getRepositoryFiles } from "@/services/repositoryApi";

const intelligenceCapabilities = [
  "Self-corrective retrieval",
  "Multi-hop semantic context expansion",
  "Intent-based specialized reasoning",
  "Evidence provenance reconciliation",
  "Semantic repository evidence ranking",
];

export default function OverviewPage() {
  const { activeRepository } =
    useActiveRepository();

  const [repositoryData, setRepositoryData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function loadRepositoryOverview() {
      setLoading(true);
      setError(null);

      try {
        const result =
          await getRepositoryFiles(
            activeRepository.name
          );

        setRepositoryData(result);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load repository overview."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRepositoryOverview();
  }, [activeRepository.name]);

  const repositoryStats = useMemo(() => {
    const files = repositoryData?.files || [];

    const extensions = new Set(
      files
        .map((file) => file.extension)
        .filter(Boolean)
    );

    const totalSize = files.reduce(
      (sum, file) =>
        sum + (file.file_size || 0),
      0
    );

    return {
      totalFiles: files.length,
      fileTypes: extensions.size,
      totalSize,
    };
  }, [repositoryData]);

  if (loading) {
    return <OverviewLoading />;
  }

  if (error) {
    return (
      <OverviewError message={error} />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-5xl">
        <header className="mb-8">
          <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-2">
            Repository Overview
          </p>

          <h1 className="text-xl font-semibold text-text-primary">
            {activeRepository.name}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-[12px] text-text-muted">
            <GitBranch size={13} />

            <span className="font-mono">
              {activeRepository.branch}
            </span>
          </div>

          <p className="max-w-2xl mt-4 text-[13.5px] leading-relaxed text-text-secondary">
            ForgeAI has indexed this repository for
            engineering investigation. Explore
            implementation behavior, architecture,
            code flow, and debugging context using
            repository-grounded analysis.
          </p>
        </header>

        <section className="mb-8">
          <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-3">
            Indexed Repository
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <RepositoryStat
              label="Indexed Files"
              value={repositoryStats.totalFiles}
              icon={Files}
            />

            <RepositoryStat
              label="File Types"
              value={repositoryStats.fileTypes}
              icon={FileCode2}
            />

            <RepositoryStat
              label="Indexed Source Size"
              value={formatFileSize(
                repositoryStats.totalSize
              )}
              icon={HardDrive}
            />
          </div>
        </section>

        <section>
          <p className="text-[10px] font-medium tracking-widest text-evidence-source uppercase mb-3">
            Repository Intelligence
          </p>

          <div className="bg-panel-primary border border-border-subtle rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 border-b border-border-subtle flex items-center gap-3">
              <Network
                size={17}
                className="text-forge-purpleLight"
              />

              <div>
                <p className="text-[13px] font-medium text-text-primary">
                  Indexed for repository reasoning
                </p>

                <p className="text-[11px] text-text-muted mt-0.5">
                  ForgeAI investigates repository
                  behavior using grounded semantic
                  context and ranked repository evidence.
                </p>
              </div>
            </div>

            <div className="divide-y divide-border-subtle">
              {intelligenceCapabilities.map(
                (capability, index) => (
                  <div
                    key={capability}
                    className="flex items-center gap-4 px-4 py-3"
                  >
                    <span className="font-mono text-[11px] text-evidence-source">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="text-[13px] text-text-secondary">
                      {capability}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function RepositoryStat({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="bg-panel-primary border border-border-subtle rounded-lg p-4">
      <Icon
        size={16}
        className="text-forge-purpleLight mb-4"
      />

      <p className="text-[11px] text-text-muted mb-1">
        {label}
      </p>

      <p className="text-[13px] font-mono text-text-primary">
        {value}
      </p>
    </div>
  );
}

function OverviewLoading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Database
          size={16}
          className="text-forge-purpleLight"
        />

        <p className="text-[13px] text-text-muted">
          Inspecting repository index...
        </p>
      </div>
    </div>
  );
}

function OverviewError({ message }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-medium tracking-widest text-red-400 uppercase mb-2">
          Repository Overview Unavailable
        </p>

        <p className="text-[13px] text-text-secondary">
          {message}
        </p>
      </div>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const unitIndex = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );

  const size =
    bytes / 1024 ** unitIndex;

  return `${size.toFixed(
    size >= 10 || unitIndex === 0 ? 0 : 1
  )} ${units[unitIndex]}`;
}