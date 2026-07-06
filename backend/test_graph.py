from app.ai.graph.builder import ForgeGraphBuilder
from app.api.mappers.chat_response_mapper import (
    ChatResponseMapper,
)
from app.api.schemas.chat import ChatResponse


graph = ForgeGraphBuilder.build()

result = graph.invoke(
    {
        "repository_name": "YT-AI-Copilot",
        "question": "How is the transcript converted into retrievable context?",
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