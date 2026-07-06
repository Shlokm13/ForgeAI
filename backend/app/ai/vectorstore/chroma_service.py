from langchain_chroma import Chroma
from langchain_core.documents import Document

from app.ai.embeddings.embedding_service import EmbeddingModelProvider
from app.config.settings import settings


class ChromaService:
    """
    Handles all interactions with ChromaDB.
    """

    def __init__(
        self,
        collection_name: str,
    ):
        """
        Initialize the vector database.
        """

        self.collection_name = collection_name

        embedding_model = (
            EmbeddingModelProvider()
            .get_embedding_model()
        )

        self.vector_store = Chroma(
            collection_name=collection_name,
            persist_directory=settings.CHROMA_DB_PATH,
            embedding_function=embedding_model,
        )

    def add_documents(
        self,
        documents: list[Document],
    ) -> None:
        """
        Store documents inside ChromaDB.
        """

        BATCH_SIZE = 100

        for i in range(
            0,
            len(documents),
            BATCH_SIZE,
        ):
            batch = documents[
                i:i + BATCH_SIZE
            ]

            self.vector_store.add_documents(
                batch
            )

    def get_retriever(self):
        """
        Create and return a retriever.

        Current Strategy
        ----------------
        Similarity Search

        Top K:
            5 documents
        """

        return self.vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={
                "k": 5,
            },
        )

    def similarity_search(
        self,
        query: str,
        k: int = 5,
    ) -> list[Document]:
        """
        Retrieve documents using semantic similarity search.

        Args:
            query:
                Semantic search query.

            k:
                Maximum number of documents to retrieve.

        Returns:
            Semantically related repository documents.
        """

        return self.vector_store.similarity_search(
            query=query,
            k=k,
        )
        
    def get_indexed_documents(
        self,
    ) -> dict:
        """
        Return raw documents and metadata stored in the
        current Chroma collection.

        This method is intended for repository inspection
        features, not semantic retrieval.
        """

        return self.vector_store.get(
            include=[
                "documents",
                "metadatas",
            ]
        )

    def reset_collection(
        self,
    ) -> None:
        """
        Delete the current collection and recreate it.

        Why?
        ----
        Uploading the same repository multiple times should
        replace the previous index instead of creating duplicate
        document chunks.

        Example
        -------
        Before:

            backend
            ├── Chunk 1
            ├── Chunk 2
            └── Chunk 3

        Upload again...

        Without reset:

            Chunk 1
            Chunk 2
            Chunk 3
            Chunk 1
            Chunk 2
            Chunk 3

        With reset:

            Chunk 1
            Chunk 2
            Chunk 3
        """

        self.vector_store.delete_collection()

        embedding_model = (
            EmbeddingModelProvider()
            .get_embedding_model()
        )

        self.vector_store = Chroma(
            collection_name=self.collection_name,
            persist_directory=settings.CHROMA_DB_PATH,
            embedding_function=embedding_model,
        )


"""
Chroma Service

Why do we need this?
--------------------
After generating document chunks, we need a place to store them
so they can later be retrieved using semantic similarity search.

ChromaDB stores:
    • Document text
    • Metadata
    • Embeddings

Responsibilities
----------------
✔ Create/Open a Chroma collection.
✔ Store chunked documents.
✔ Perform semantic similarity search.
✔ Return a retriever.
✘ Do NOT generate embeddings.
✘ Do NOT split documents.
"""