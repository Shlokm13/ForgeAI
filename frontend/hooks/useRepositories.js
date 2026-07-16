"use client";

import { useCallback, useEffect, useState } from "react";

import { getRepositories } from "@/services/repositoryListApi";

export function useRepositories() {
  const [repositories, setRepositories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const refreshRepositories =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const data =
          await getRepositories();

        setRepositories(data);
      } catch (err) {
        setError(
          err?.message ??
            "Unable to load repositories."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    refreshRepositories();
  }, [refreshRepositories]);

  return {
    repositories,
    loading,
    error,
    refreshRepositories,
  };
}