"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TopNavigation from "./TopNavigation";
import Sidebar from "./Sidebar";

import RepositoryPanel from "@/components/repository/RepositoryPanel";

import { useActiveRepository } from "@/context/ActiveRepositoryContext";
import { useAnalysis } from "@/context/AnalysisContext";

export default function ForgeAIShell({
  children,
}) {
  const router = useRouter();

  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  const [
    repositoryPanelOpen,
    setRepositoryPanelOpen,
  ] = useState(false);

  const {
    activeRepository,
    setActiveRepository,
  } = useActiveRepository();

  const {
    setAnalysis,
  } = useAnalysis();

  function toggleSidebar() {
    setSidebarCollapsed((prev) => !prev);
  }

  function handleRepositoryIndexed(repository) {
  setAnalysis(null);

  setActiveRepository(repository);

  setRepositoryPanelOpen(false);

  router.push("/overview");
}

  return (
    <div className="h-screen flex flex-col bg-bg-app overflow-hidden">
      <TopNavigation
        repositoryName={activeRepository.name}
        branch={activeRepository.branch}
        onToggleSidebar={toggleSidebar}
        onOpenRepositoryPanel={() =>
          setRepositoryPanelOpen(true)
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          repositoryName={activeRepository.name}
          branch={activeRepository.branch}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={toggleSidebar}
        />

        <main className="flex-1 flex flex-col overflow-hidden bg-bg-deep">
          {children}
        </main>
      </div>

      <RepositoryPanel
        isOpen={repositoryPanelOpen}
        onClose={() =>
          setRepositoryPanelOpen(false)
        }
        onRepositoryIndexed={
          handleRepositoryIndexed
        }
      />
    </div>
  );
}