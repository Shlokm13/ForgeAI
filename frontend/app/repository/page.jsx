"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileSearch,
  FolderTree,
  Search,
} from "lucide-react";

import { getRepositoryFiles } from "@/services/repositoryApi";
import {
  buildRepositoryTree,
} from "@/utils/repositoryTree";
import RepositoryTree from "@/components/repository/RepositoryTree";
import { useActiveRepository } from "@/context/ActiveRepositoryContext";


export default function RepositoryPage() {
  const { activeRepository } =
  useActiveRepository();

  const [repositoryData, setRepositoryData] =
    useState(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function loadRepositoryFiles() {
      setLoading(true);
      setError(null);

      try {
        const result = await getRepositoryFiles(
          activeRepository.name
        );

        setRepositoryData(result);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to inspect repository files."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRepositoryFiles();
  }, [activeRepository.name]);

  const filteredFiles = useMemo(() => {
    const files = repositoryData?.files || [];
    const normalizedQuery = searchQuery
      .trim()
      .toLowerCase();

    if (!normalizedQuery) {
      return files;
    }

    return files.filter((file) =>
      file.file_path
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [repositoryData, searchQuery]);

  const repositoryTree = useMemo(
    () => buildRepositoryTree(filteredFiles),
    [filteredFiles]
  );

  if (loading) {
    return <RepositoryLoading />;
  }

  if (error) {
    return (
      <RepositoryError message={error} />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-2">
            Repository Files
          </p>

          <h1 className="text-xl font-semibold text-text-primary">
            Indexed repository context
          </h1>

          <p className="max-w-3xl mt-3 text-[13.5px] leading-relaxed text-text-secondary">
            Inspect the repository files currently represented
            in ForgeAI&apos;s intelligence index.
          </p>
        </header>

        <section className="bg-panel-primary border border-border-subtle rounded-lg overflow-hidden">
          <div className="px-4 py-3.5 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <FolderTree
                size={17}
                className="text-forge-purpleLight"
              />

              <div>
                <p className="text-[13px] font-medium text-text-primary font-mono">
                  {repositoryData.repository_name}
                </p>

                <p className="text-[11px] text-text-muted">
                  {repositoryData.total_files} indexed files
                </p>
              </div>
            </div>

            <div className="sm:ml-auto relative sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search repository paths..."
                className="w-full bg-panel-secondary border border-border-subtle rounded-md pl-9 pr-3 py-2 text-[12.5px] text-text-primary placeholder:text-text-muted outline-none focus:border-forge-purple/60 transition-colors"
              />
            </div>
          </div>

          <div className="py-2 min-h-[420px]">
            {filteredFiles.length > 0 ? (
              <RepositoryTree tree={repositoryTree} />
            ) : (
              <div className="min-h-[360px] flex items-center justify-center px-6">
                <div className="text-center">
                  <FileSearch
                    size={20}
                    className="text-text-muted mx-auto mb-3"
                  />

                  <p className="text-[13px] text-text-secondary">
                    No indexed files match this search.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function RepositoryLoading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-[13px] text-text-muted">
        Loading indexed repository files...
      </p>
    </div>
  );
}

function RepositoryError({ message }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-medium tracking-widest text-red-400 uppercase mb-2">
          Repository Inspection Failed
        </p>

        <p className="text-[13px] text-text-secondary">
          {message}
        </p>
      </div>
    </div>
  );
}