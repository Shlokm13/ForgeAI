from app.ai.graph.builder import ForgeGraphBuilder


graph = ForgeGraphBuilder.build()

result = graph.invoke(
    {
        "repository_name": "YT-AI-Copilot",
        "question": "What is TMDB?"
    }
)

print("\n")
print("=" * 80)
print("FINAL STATE")
print("=" * 80)

print(result)

print("\n")
print("=" * 80)
print("ANSWER")
print("=" * 80)

print(result["answer"])