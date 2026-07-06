"use client";

import { useState } from "react";
import {
  Check,
  Github,
  LoaderCircle,
  X,
} from "lucide-react";

import { indexGitHubRepository } from "@/services/repositoryApi";

export default function RepositoryPanel({
  isOpen,
  onClose,
  onRepositoryIndexed,
}) {
  const [repositoryUrl, setRepositoryUrl] =
    useState("");

  const [indexing, setIndexing] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [result, setResult] =
    useState(null);

  if (!isOpen) {
    return null;
  }

  async function handleIndexRepository(event) {
    event.preventDefault();

    if (!repositoryUrl.trim() || indexing) {
      return;
    }

    setIndexing(true);
    setError(null);
    setResult(null);

    try {
      const response =
        await indexGitHubRepository(
          repositoryUrl.trim()
        );

      setResult(response);

      onRepositoryIndexed({
        name: response.data.repository_name,
        branch: "main",
      });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to index repository."
      );
    } finally {
      setIndexing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close repository panel"
        className="absolute inset-0 cursor-default"
      />

      <aside className="relative h-full w-full max-w-md bg-bg-sidebar border-l border-border-subtle shadow-2xl">
        <header className="h-14 px-5 flex items-center justify-between border-b border-border-subtle">
          <div>
            <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase">
              Repository Workspace
            </p>

            <p className="text-[13px] text-text-primary mt-0.5">
              Index GitHub repository
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close repository panel"
            className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-panel-elevated transition-colors"
          >
            <X size={16} />
          </button>
        </header>

        <div className="p-5">
          <div className="flex items-start gap-3 mb-6">
            <Github
              size={18}
              className="text-text-secondary mt-0.5"
            />

            <div>
              <p className="text-[13px] font-medium text-text-primary">
                GitHub Repository
              </p>

              <p className="text-[12px] leading-relaxed text-text-muted mt-1">
                ForgeAI will clone the repository,
                inspect supported source files, and
                build a repository intelligence index.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleIndexRepository}
          >
            <label
              htmlFor="github-repository-url"
              className="block text-[10px] font-medium tracking-widest text-text-muted uppercase mb-2"
            >
              Repository URL
            </label>

            <input
              id="github-repository-url"
              type="url"
              value={repositoryUrl}
              onChange={(event) =>
                setRepositoryUrl(
                  event.target.value
                )
              }
              placeholder="https://github.com/user/repository"
              disabled={indexing}
              className="w-full bg-panel-primary border border-border-subtle rounded-md px-3 py-2.5 text-[13px] font-mono text-text-primary placeholder:text-text-muted outline-none focus:border-forge-purple/60 transition-colors"
            />

            <button
              type="submit"
              disabled={
                indexing ||
                !repositoryUrl.trim()
              }
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-forge-purple text-white text-[13px] font-medium hover:bg-forge-purpleLight disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {indexing ? (
                <>
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />
                  Indexing Repository
                </>
              ) : (
                <>
                  <Github size={15} />
                  Index Repository
                </>
              )}
            </button>
          </form>

          {indexing && (
            <div className="mt-5 rounded-lg border border-border-subtle bg-panel-primary p-4">
              <p className="text-[11px] font-medium tracking-wide text-forge-purpleLight uppercase">
                Building Intelligence Index
              </p>

              <p className="text-[12.5px] leading-relaxed text-text-secondary mt-2">
                Cloning and preparing repository
                context. Larger repositories may take
                a moment to process.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-[11px] font-medium text-red-400 uppercase">
                Indexing Failed
              </p>

              <p className="text-[12.5px] text-text-secondary mt-2">
                {error}
              </p>
            </div>
          )}

          {result && (
            <div className="mt-5 rounded-lg border border-evidence-source/20 bg-evidence-source/5 p-4">
              <div className="flex items-center gap-2">
                <Check
                  size={15}
                  className="text-evidence-source"
                />

                <p className="text-[11px] font-medium text-evidence-source uppercase">
                  Repository Indexed
                </p>
              </div>

              <p className="text-[13px] text-text-primary font-mono mt-3">
                {result.data.repository_name}
              </p>

              <div className="mt-3 space-y-1.5 text-[12px] text-text-secondary">
                <p>
                  {result.data.supported_files} supported files
                </p>

                <p>
                  {result.data.chunks_created} indexed chunks
                </p>

                <p>
                  {result.data.vector_database} vector store
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}