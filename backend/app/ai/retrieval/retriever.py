
from langchain_core.documents import Document

from app.ai.vectorstore.chroma_service import ChromaService


class Retriever:
    """
    Retrieves relevant documents from the vector database.
    """

    def __init__(self, chroma_service: ChromaService):
        """
        Initialize the retriever.

        Args:
            chroma_service: Service responsible for
            interacting with ChromaDB.
        """

        self.retriever = chroma_service.get_retriever()

    def retrieve(
        self,
        query: str,
    ) -> list[Document]:
        """
        Retrieve the most relevant document chunks.

        Args:
            query: User's question.

        Returns:
            List of relevant LangChain Documents.
        """

        return self.retriever.invoke(query)
"""
Retriever

Why do we need this?
--------------------
The vector database may contain thousands of document chunks.

Sending every chunk to the LLM would be slow, expensive,
and exceed the model's context window.

The Retriever is responsible for finding only the most
relevant chunks for a user's question.

Example
-------
Question:
"How does authentication work?"

↓

Retriever

↓

Top 5 Relevant Chunks

Responsibilities
----------------
✔ Retrieve relevant documents.
✔ Hide vector database implementation.
✔ Configure retrieval behaviour.
✘ Do NOT call the LLM.
✘ Do NOT build prompts.
✘ Do NOT generate answers.
"""