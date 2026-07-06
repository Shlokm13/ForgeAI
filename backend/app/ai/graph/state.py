from langgraph.graph import MessagesState
from langchain_core.documents import Document
from app.ai.evidence.models import EvidenceItem


class ForgeState(MessagesState):
    """
    Shared state for ForgeAI's LangGraph workflow.
    """

    repository_name: str
    question: str
    retrieval_query: str
    documents: list[Document]
    answer: str
    retrieval_grade: str
    retry_count: int
    question_intent: str
    code_flow_trace: str
    architecture_analysis: str
    debugging_analysis: str
    implementation_analysis: str
    evidence: list[EvidenceItem]