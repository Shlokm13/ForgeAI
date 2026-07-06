from langchain_core.documents import Document

from app.ai.vectorstore.chroma_service import ChromaService


class ContextExpander:
    """
    Expands retrieved repository context using semantic relationships
    between repository chunks.

    Initial semantic retrieval finds anchor documents related to the
    user's question.

    Each anchor document is then used as a second semantic search query
    to discover additional related repository context.
    """

    def __init__(
        self,
        chroma_service: ChromaService,
        related_chunks: int = 3,
    ):
        """
        Initialize the context expander.

        Args:
            chroma_service:
                Service used to perform semantic repository search.

            related_chunks:
                Maximum number of related chunks retrieved for each
                anchor document.
        """

        self.chroma_service = chroma_service
        self.related_chunks = related_chunks

    def expand(
        self,
        documents: list[Document],
    ) -> list[Document]:
        """
        Expand anchor documents with semantically related chunks.

        Args:
            documents:
                Initial semantic retrieval results.

        Returns:
            Anchor documents plus additional related repository chunks.
        """

        expanded_documents = list(documents)

        seen_document_keys = {
            self._get_document_key(document)
            for document in documents
        }

        for document in documents:

            expansion_query = (
                document.page_content[:1000]
            )

            related_documents = (
                self.chroma_service.similarity_search(
                    query=expansion_query,
                    k=self.related_chunks,
                )
            )

            for related_document in related_documents:

                document_key = self._get_document_key(
                    related_document
                )

                if document_key in seen_document_keys:
                    continue

                expanded_documents.append(
                    related_document
                )

                seen_document_keys.add(
                    document_key
                )

        return expanded_documents

    def _get_document_key(
        self,
        document: Document,
    ) -> tuple:
        """
        Create a stable key used for document deduplication.

        Document IDs may not always be available after retrieval.

        The source path and document content together identify an
        indexed repository chunk.
        """

        return (
            document.metadata.get(
                "relative_path",
                "",
            ),
            document.page_content,
        )


"""
Context Expander

Why do we need this?
--------------------
Top-k semantic retrieval may find a relevant repository chunk while
missing other chunks related to the implementation visible in that
anchor document.

The context expander performs a second semantic retrieval hop using
retrieved documents as semantic anchors.

Example
-------
Question:

    How is transcript data converted into retrievable context?

First retrieval:

    load_pipeline(...)
        create_document(...)
        create_vector_store(...)
        create_retriever(...)

Second-hop retrieval may discover:

    create_document implementation
    create_vector_store implementation
    create_retriever implementation

Responsibilities
----------------
✔ Accept initial anchor documents.
✔ Perform second-hop semantic retrieval.
✔ Merge related repository chunks.
✔ Remove duplicate chunks.
✘ Do NOT grade retrieval quality.
✘ Do NOT rewrite the user query.
✘ Do NOT generate answers.
"""