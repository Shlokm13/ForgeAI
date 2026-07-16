"use client";

import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";

import { useRepositoryUpload } from "@/hooks/useRepositoryUpload";
import RepositoryUploadStatus from "./RepositoryUploadStatus";

export default function GitHubRepositoryForm({
  onRepositoryIndexed,
}) {
  const [repositoryUrl, setRepositoryUrl] =
    useState("");

  const {
    uploading,
    error,
    result,
    uploadGithub,
  } = useRepositoryUpload();

  async function handleSubmit(event) {
    event.preventDefault();

    const url = repositoryUrl.trim();

    if (!url || uploading) {
      return;
    }

    try {
      const response =
        await uploadGithub(url);

      onRepositoryIndexed?.(response);

      setRepositoryUrl("");
    } catch {
      // Error state is already handled by the hook.
    }
  }

  return (
    <div className="border bg-panel-primary border-border-subtle rounded-xl">
      <div className="px-5 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Github
            size={18}
            className="text-forge-purpleLight"
          />

          <h2 className="text-sm font-semibold text-text-primary">
            GitHub Repository
          </h2>
        </div>

        <p className="mt-2 text-[13px] text-text-secondary leading-relaxed">
          Paste a public GitHub repository URL.
          ForgeAI will clone it, build the
          semantic repository index, and make
          it available for engineering analysis.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5"
      >
        <label
          htmlFor="github-url"
          className="block text-[11px] font-medium uppercase tracking-wider text-text-muted mb-2"
        >
          Repository URL
        </label>

        <input
          id="github-url"
          type="url"
          value={repositoryUrl}
          onChange={(event) =>
            setRepositoryUrl(
              event.target.value
            )
          }
          placeholder="https://github.com/user/repository"
          disabled={uploading}
          className="w-full rounded-lg border border-border-subtle bg-bg-app px-4 py-3 text-[13px] text-text-primary outline-none focus:border-forge-purple transition-colors"
        />

        <button
          type="submit"
          disabled={
            uploading ||
            !repositoryUrl.trim()
          }
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-forge-purple hover:bg-forge-purpleLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors py-3 text-[13px] font-medium text-white"
        >
          <Github size={16} />

          {uploading
            ? "Indexing Repository..."
            : "Index Repository"}

          {!uploading && (
            <ArrowRight size={16} />
          )}
        </button>
      </form>

      <RepositoryUploadStatus
        uploading={uploading}
        error={error}
        result={result}
      />
    </div>
  );
}