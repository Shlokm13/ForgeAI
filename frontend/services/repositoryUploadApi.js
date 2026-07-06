const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

async function post(endpoint, body) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
      "Repository upload failed."
    );
  }

  if (!data.success) {
    throw new Error(
      data.message ||
      "Repository upload failed."
    );
  }

  return data;
}

export async function uploadGithubRepository(
  repositoryUrl
) {
  return post(
    "/repository/upload/github",
    {
      repository_url: repositoryUrl,
    }
  );
}

export async function uploadLocalRepository(
  repositoryPath
) {
  return post(
    "/repository/upload",
    {
      repository_path: repositoryPath,
    }
  );
}