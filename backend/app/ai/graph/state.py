from langgraph.graph import MessagesState
from langchain_core.documents import Document


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