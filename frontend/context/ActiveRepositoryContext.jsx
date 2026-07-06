"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ActiveRepositoryContext = createContext(null);

const DEFAULT_REPOSITORY = {
  name: "YT-AI-Copilot",
  branch: "main",
};

const STORAGE_KEY = "forgeai-active-repository";

export function ActiveRepositoryProvider({
  children,
}) {
  const [
    activeRepository,
    setActiveRepository,
  ] = useState(DEFAULT_REPOSITORY);

  const [
    repositoryLoaded,
    setRepositoryLoaded,
  ] = useState(false);

  useEffect(() => {
    try {
      const storedRepository =
        localStorage.getItem(STORAGE_KEY);

      if (storedRepository) {
        const parsedRepository =
          JSON.parse(storedRepository);

        if (parsedRepository?.name) {
          setActiveRepository(
            parsedRepository
          );
        }
      }
    } catch (error) {
      console.error(
        "Unable to restore active repository:",
        error
      );
    } finally {
      setRepositoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!repositoryLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(activeRepository)
      );
    } catch (error) {
      console.error(
        "Unable to persist active repository:",
        error
      );
    }
  }, [
    activeRepository,
    repositoryLoaded,
  ]);

  return (
    <ActiveRepositoryContext.Provider
      value={{
        activeRepository,
        setActiveRepository,
        repositoryLoaded,
      }}
    >
      {children}
    </ActiveRepositoryContext.Provider>
  );
}

export function useActiveRepository() {
  const context = useContext(
    ActiveRepositoryContext
  );

  if (!context) {
    throw new Error(
      "useActiveRepository must be used inside ActiveRepositoryProvider"
    );
  }

  return context;
}