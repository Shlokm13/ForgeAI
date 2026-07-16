"use client";

import { useRouter } from "next/navigation";

import GitHubRepositoryForm from "./GitHubRepositoryForm";
import RepositoryList from "./RepositoryList";

import { useActiveRepository } from "@/context/ActiveRepositoryContext";
import { useAnalysis } from "@/context/AnalysisContext";
import { useRepositories } from "@/hooks/useRepositories";

export default function RepositoryManagement() {
  const router = useRouter();

  const {
    activeRepository,
    setActiveRepository,
  } = useActiveRepository();

  const { setAnalysis } = useAnalysis();

  const {
    repositories,
    loading,
    error,
    refreshRepositories,
  } = useRepositories();

  async function handleRepositoryIndexed(
    response,
  ) {
    const repositoryName =
      response.data.repository_name;

    await refreshRepositories();

    setActiveRepository({
      name: repositoryName,
      branch: "main",
    });

    setAnalysis(null);

    router.push("/overview");
  }

  function handleRepositorySelected(
    repository,
  ) {
    setActiveRepository({
      name: repository.name,
      branch: repository.branch,
    });

    setAnalysis(null);

    router.push("/overview");
  }

  return (
    <div className="max-w-4xl space-y-10">
      <header>
        <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-2">
          Repository Management
        </p>

        <h1 className="text-2xl font-semibold text-text-primary">
          Manage Repository Workspace
        </h1>

        <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-text-secondary">
          Index new repositories, switch between
          previously indexed workspaces, and keep
          ForgeAI focused on the repository you
          want to investigate.
        </p>
      </header>

      <GitHubRepositoryForm
        onRepositoryIndexed={
          handleRepositoryIndexed
        }
      />

      <section>
        <div className="mb-4">
          <p className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-2">
            Indexed Repositories
          </p>

          <h2 className="text-lg font-semibold text-text-primary">
            Available Workspaces
          </h2>
        </div>

        <RepositoryList
          repositories={repositories}
          loading={loading}
          error={error}
          onRetry={refreshRepositories}
          activeRepository={activeRepository}
          onSelectRepository={
            handleRepositorySelected
          }
        />
      </section>
    </div>
  );
}