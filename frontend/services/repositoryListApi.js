const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function getRepositories() {
  const response = await fetch(
    `${API_BASE_URL}/repository/list`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to load repositories."
    );
  }

  return data;
}   