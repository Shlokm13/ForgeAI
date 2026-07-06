const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function askForgeAI(repositoryName, question) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repository_name: repositoryName,
      question: question,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `ForgeAI analysis failed with status ${response.status}`
    );
  }

  return response.json();
}