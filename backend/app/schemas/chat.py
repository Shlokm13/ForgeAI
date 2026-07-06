from pydantic import BaseModel


class EvidenceResponse(BaseModel):
    """
    Repository evidence returned to the frontend.
    """

    evidence_type: str
    file_path: str
    file_name: str
    content: str

class ChatRequest(BaseModel):
    repository_name: str
    question: str

class ChatResponse(BaseModel):
    """
    Clean ForgeAI chat response.
    """

    repository_name: str
    question: str
    answer: str
    intent: str
    evidence: list[EvidenceResponse]