"use client";

import { useState } from "react";
import Workspace from "@/components/workspace/Workspace";
import EmptyWorkspace from "@/components/workspace/EmptyWorkspace";
import QuestionInput from "@/components/workspace/QuestionInput";
import AnalysisLoading from "@/components/workspace/AnalysisLoading";
import AnalysisError from "@/components/workspace/AnalysisError";
import { askForgeAI } from "@/services/chatApi";
import { useAnalysis } from "@/context/AnalysisContext";
import { useActiveRepository } from "@/context/ActiveRepositoryContext";


export default function Home() {
  const { activeRepository } = useActiveRepository();
  const { analysis, setAnalysis } = useAnalysis();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 async function handleSubmit() {
  const submittedQuestion = question.trim();

  if (!submittedQuestion || loading) return;

  setLoading(true);
  setError(null);

  try {
    const result = await askForgeAI(
      activeRepository.name,
      submittedQuestion
    );

    setAnalysis(result);

    setQuestion("");
  } catch (err) {
    setError(
      err?.message ||
        "Try running the analysis again."
    );
  } finally {
    setLoading(false);
  }
}

  function handleClear() {
    setAnalysis(null);
    setError(null);
  }

  function handleRetry() {
    handleSubmit();
  }

  return (
    <>
      {loading ? (
        <AnalysisLoading />
      ) : error ? (
        <AnalysisError
          message={error}
          onRetry={handleRetry}
        />
      ) : analysis ? (
        <Workspace
          analysis={analysis}
          onClear={handleClear}
        />
      ) : (
        <EmptyWorkspace
          onSelectSuggestion={setQuestion}
        />
      )}

      <QuestionInput
        question={question}
        loading={loading}
        onQuestionChange={setQuestion}
        onSubmit={handleSubmit}
      />
    </>
  );
}