from pydantic import BaseModel


class QueryRequest(BaseModel):
    """
    Request model for asking repository questions.
    """

    question: str
    repository_name : str


class QueryResponse(BaseModel):
    """
    Response model for repository questions.
    """

    answer: str