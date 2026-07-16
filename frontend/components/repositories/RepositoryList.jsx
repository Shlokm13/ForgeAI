"use client";

import { LoaderCircle } from "lucide-react";

import RepositoryCard from "./RepositoryCard";
import EmptyRepositoryState from "./EmptyRepositoryState";

export default function RepositoryList({
  repositories,
  loading,
  error,
  onRetry,
  activeRepository,
  onSelectRepository,
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <LoaderCircle
          size={22}
          className="animate-spin text-forge-purpleLight"
        />

        <span className="ml-3 text-[13px] text-text-muted">
          Loading indexed repositories...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <p className="text-sm font-medium text-red-400">
          Unable to load repositories
        </p>

        <p className="mt-2 text-xs text-text-secondary">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-border-subtle px-3 py-2 text-xs text-text-secondary transition-colors hover:bg-panel-elevated"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (repositories.length === 0) {
    return <EmptyRepositoryState />;
  }

  return (
    <div className="space-y-3">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.name}
          repository={repository}
          isActive={
            repository.name ===
            activeRepository.name
          }
          onSelect={onSelectRepository}
        />
      ))}
    </div>
  );
}