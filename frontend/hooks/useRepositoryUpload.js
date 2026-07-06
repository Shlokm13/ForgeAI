"use client";

import { useState } from "react";

import {
  uploadGithubRepository,
  uploadLocalRepository,
} from "@/services/repositoryUploadApi";

export function useRepositoryUpload() {
  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [result, setResult] =
    useState(null);

  async function uploadGithub(url) {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const response =
        await uploadGithubRepository(url);

      setResult(response);

      return response;
    } catch (err) {
      setError(
        err?.message ||
          "Unable to index repository."
      );

      throw err;
    } finally {
      setUploading(false);
    }
  }

  async function uploadLocal(path) {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const response =
        await uploadLocalRepository(path);

      setResult(response);

      return response;
    } catch (err) {
      setError(
        err?.message ||
          "Unable to index repository."
      );

      throw err;
    } finally {
      setUploading(false);
    }
  }

  function clearUploadState() {
    setError(null);
    setResult(null);
  }

  return {
    uploading,
    error,
    result,
    uploadGithub,
    uploadLocal,
    clearUploadState,
  };
}