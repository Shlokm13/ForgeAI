"""
Query API Routes.
"""

from fastapi import APIRouter

from app.schemas.query import QueryRequest, QueryResponse
from app.services.query_service import QueryService

router = APIRouter(
    prefix="/query",
    tags=["Query"],
)

query_service = QueryService()


@router.post(
    "",
    response_model=QueryResponse,
)
def ask_question(
    request: QueryRequest,
) -> QueryResponse:
    """
    Ask a question about the indexed repository.
    """

    answer = query_service.ask(
        repository_name=request.repository_name,
        question=request.question
    )

    return QueryResponse(
        answer=answer
    )