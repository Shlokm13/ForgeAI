const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000";

export async function getRepositoryFiles(repositoryName) {
  const response = await fetch(
    `${API_BASE_URL}/repository/${encodeURIComponent(
      repositoryName
    )}/files`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load indexed repository files."
    );
  }

  return response.json();
}

export async function indexGitHubRepository(
  repositoryUrl
) {
  const response = await fetch(
    `${API_BASE_URL}/repository/upload/github`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repository_url: repositoryUrl,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result?.message ||
        "Unable to index GitHub repository."
    );
  }

  return result;
}