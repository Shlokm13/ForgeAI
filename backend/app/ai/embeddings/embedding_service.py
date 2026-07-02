
from langchain_ollama import OllamaEmbeddings
from app.config.settings import settings


class EmbeddingModelProvider:
    """
    Wrapper around the embedding model.
    """

    def __init__(self):
        """
        Initialize the embedding model.
        """

        self.embedding_model = OllamaEmbeddings(
            model=settings.EMBEDDING_MODEL
        )

    def get_embedding_model(self) -> OllamaEmbeddings:
        """
        Return the embedding model instance.

        This will later be passed to ChromaDB.
        """

        return self.embedding_model
    
"""
Embedding Provider

Why do we need this?
--------------------
ForgeAI should not be tightly coupled to a specific embedding model.

This provider is responsible for creating and configuring the
embedding model used throughout the application.

Today we use Ollama's `embeddinggemma` model.

If we later switch to another provider (OpenAI, Voyage AI,
BAAI BGE, etc.), only this file needs to change.

Example
-------
EmbeddingProvider
        │
        ▼
OllamaEmbeddings(model="embeddinggemma")
        │
        ▼
Embedding Model Instance

Responsibilities
----------------
✔ Create and configure the embedding model.
✔ Provide a single, reusable embedding model instance.
✔ Hide provider-specific configuration.
✘ Do NOT generate embeddings directly.
✘ Do NOT store embeddings.
✘ Do NOT retrieve embeddings.

Future
------
This provider can later be extended to select different embedding
models based on configuration without affecting the rest of the
ingestion pipeline.
"""