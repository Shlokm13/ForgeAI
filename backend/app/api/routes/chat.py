from fastapi import APIRouter

from app.ai.graph.builder import ForgeGraphBuilder
from app.api.mappers.chat_response_mapper import ChatResponseMapper
from app.schemas.chat import ChatResponse, ChatRequest


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
) -> ChatResponse:
    """
    Ask ForgeAI a question about an indexed repository.
    """

    graph = ForgeGraphBuilder().build()

    result = graph.invoke(
        {
            "messages": [],
            "repository_name": request.repository_name,
            "question": request.question,
        }
    )

    mapper = ChatResponseMapper()

    return mapper.map(result)


"""
ForgeAI Chat Route

Why do we need this?
--------------------
The frontend should not directly interact with the LangGraph
reasoning pipeline.

This route exposes the ForgeAI reasoning system through a clean
HTTP API.

Pipeline
--------
Frontend
    ↓
POST /chat
    ↓
ForgeGraph
    ↓
ChatResponseMapper
    ↓
ChatResponse
    ↓
Frontend
"""