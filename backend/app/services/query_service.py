
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.document_formatter import DocumentFormatter
from app.ai.prompts.rag_prompt import RAG_PROMPT
from app.ai.retrieval.retriever import Retriever
from app.ai.vectorstore.chroma_service import ChromaService


class QueryService:
    """
    Handles repository question answering.
    """

    def __init__(self):
        """
        Initialize all dependencies required
        for the RAG pipeline.
        """

        self.document_formatter = DocumentFormatter()

        self.llm = (
            LLMProvider()
            .get_llm()
        )

    def ask(
        self,
        repository_name: str,
        question: str,
    ) -> str:
        """
        Execute the complete RAG pipeline.

        Args:
            repository_name: Name of the repository.
            question: User's question.

        Returns:
            Generated answer.
        """
        print(f"Searching collection: {repository_name}")
        chroma_service = ChromaService(collection_name=repository_name)
        
        print("=" * 80)
        print("During Query")
        print("Collection:", repository_name)
        print("Stored in Chroma:", chroma_service.vector_store._collection.count())
        print("=" * 80)

        self.retriever = Retriever(chroma_service)

        # Step 1: Retrieve relevant documents.
        documents = self.retriever.retrieve(question)

        print("=" * 80)
        print(f"Retrieved Documents: {len(documents)}")
        print("=" * 80)

        for i, doc in enumerate(documents):
            print(f"\nDocument {i+1}")
            print(doc.metadata)
            print(doc.page_content[:300])

        # Step 2: Convert documents into prompt context.
        context = self.document_formatter.format(documents)

        # Step 3: Build the prompt.
        prompt = RAG_PROMPT.invoke(
            {
                "context": context,
                "question": question,
            }
        )

        # Step 4: Generate the answer.
        response = self.llm.invoke(prompt)

        # Collect unique source files from the retrieved documents.
        sources = sorted(
            {
                document.metadata["relative_path"]
                for document in documents
            }
        )

        # Append deterministic citations.
        formatted_answer = response.content

        if sources:
            formatted_answer += "\n\nSources:\n"

            for source in sources:
                formatted_answer += f"• {source}\n"

        return formatted_answer
"""
Query Service

Why do we need this?
--------------------
The Query Service orchestrates the complete RAG pipeline.

It coordinates the different AI components but does not
implement their internal logic.

Pipeline
--------
Question
    ↓
Retriever
    ↓
Document Formatter
    ↓
Prompt Builder
    ↓
LLM
    ↓
Answer

Responsibilities
----------------
✔ Orchestrate the RAG workflow.
✔ Coordinate AI components.
✔ Return the final answer.
✘ Do NOT retrieve documents directly.
✘ Do NOT build prompts.
✘ Do NOT format documents.
✘ Do NOT configure the LLM.
"""