
from langchain_core.documents import Document

from app.ai.metadata import MetadataKeys


class DocumentFormatter:
    """
    Formats retrieved documents into a prompt-ready context string.
    """

    def format(
        self,
        documents: list[Document],
    ) -> str:
        """
        Convert retrieved documents into a readable context string.

        Args:
            documents: Documents returned by the retriever.

        Returns:
            A formatted string ready to be inserted into the prompt.
        """

        formatted_chunks = []

        for document in documents:

            source = document.metadata.get(
                MetadataKeys.RELATIVE_PATH,
                "Unknown"
            )

            formatted_chunks.append(
                f"""
Source:
{source}

Content:
{document.page_content}
"""
            )

        return "\n\n" + ("\n" + "=" * 80 + "\n").join(
            formatted_chunks
        )
        
"""
Document Formatter

Why do we need this?
--------------------
The retriever returns a list of LangChain Document objects.

LLMs, however, expect a single text prompt rather than Python
objects. This formatter converts retrieved documents into a
structured context string.

Responsibilities
----------------
✔ Format retrieved documents.
✔ Preserve useful metadata.
✔ Build a readable context string.
✘ Do NOT retrieve documents.
✘ Do NOT call the LLM.
"""