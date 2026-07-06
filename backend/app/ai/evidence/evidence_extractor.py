from langchain_core.documents import Document

from app.ai.evidence.models import EvidenceItem
from app.ai.embeddings.embedding_service import (
    EmbeddingModelProvider,
)


class EvidenceExtractor:
    """
    Converts retrieved repository documents into ranked
    structured evidence items.
    """

    SOURCE_CODE_EXTENSIONS = {
        ".py",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".java",
        ".cpp",
        ".c",
        ".h",
        ".hpp",
        ".go",
        ".rs",
    }

    DOCUMENTATION_EXTENSIONS = {
        ".md",
        ".txt",
        ".rst",
    }

    MAX_EVIDENCE_ITEMS = 5

    def __init__(self):
        self.embedding_model = (
            EmbeddingModelProvider()
            .get_embedding_model()
        )

    def extract(
        self,
        documents: list[Document],
        question: str,
    ) -> list[EvidenceItem]:
        """
        Extract and rank repository evidence.

        Ranking Strategy
        ----------------
        1. Remove duplicate evidence chunks.
        2. Rank chunks using semantic similarity.
        3. Prefer source-code evidence.
        4. Return the top evidence items.
        """

        unique_documents = self._deduplicate(
            documents
        )

        if not unique_documents:
            return []

        ranked_documents = self._rank_documents(
            documents=unique_documents,
            question=question,
        )

        selected_documents = ranked_documents[
            :self.MAX_EVIDENCE_ITEMS
        ]

        return [
            self._create_evidence_item(document)
            for document in selected_documents
        ]

    def _deduplicate(
        self,
        documents: list[Document],
    ) -> list[Document]:
        """
        Remove duplicate repository chunks.
        """

        unique_documents = []

        seen_evidence = set()

        for document in documents:

            file_path = document.metadata.get(
                "relative_path",
                "",
            )

            evidence_key = (
                file_path,
                document.page_content,
            )

            if evidence_key in seen_evidence:
                continue

            seen_evidence.add(
                evidence_key
            )

            unique_documents.append(
                document
            )

        return unique_documents

    def _rank_documents(
        self,
        documents: list[Document],
        question: str,
    ) -> list[Document]:
        """
        Rank evidence using semantic similarity.

        Source-code chunks receive a small priority boost.
        """

        question_embedding = (
            self.embedding_model.embed_query(
                question
            )
        )

        document_embeddings = (
            self.embedding_model.embed_documents(
                [
                    document.page_content
                    for document in documents
                ]
            )
        )

        scored_documents = []

        for document, embedding in zip(
            documents,
            document_embeddings,
        ):

            similarity_score = self._cosine_similarity(
                question_embedding,
                embedding,
            )

            extension = document.metadata.get(
                "extension",
                "",
            )

            if extension in self.SOURCE_CODE_EXTENSIONS:
                similarity_score += 0.05

            scored_documents.append(
                (
                    similarity_score,
                    document,
                )
            )

        scored_documents.sort(
            key=lambda item: item[0],
            reverse=True,
        )

        return [
            document
            for _, document in scored_documents
        ]

    def _cosine_similarity(
        self,
        vector_a: list[float],
        vector_b: list[float],
    ) -> float:
        """
        Calculate cosine similarity between two vectors.
        """

        dot_product = sum(
            a * b
            for a, b in zip(
                vector_a,
                vector_b,
            )
        )

        magnitude_a = sum(
            value ** 2
            for value in vector_a
        ) ** 0.5

        magnitude_b = sum(
            value ** 2
            for value in vector_b
        ) ** 0.5

        if magnitude_a == 0 or magnitude_b == 0:
            return 0.0

        return dot_product / (
            magnitude_a * magnitude_b
        )

    def _create_evidence_item(
        self,
        document: Document,
    ) -> EvidenceItem:
        """
        Convert a repository document into an EvidenceItem.
        """

        extension = document.metadata.get(
            "extension",
            "",
        )

        return {
            "evidence_type": self._classify_evidence(
                extension
            ),
            "file_path": document.metadata.get(
                "relative_path",
                "",
            ),
            "file_name": document.metadata.get(
                "file_name",
                "",
            ),
            "content": document.page_content,
        }

    def _classify_evidence(
        self,
        extension: str,
    ) -> str:
        """
        Classify evidence using repository file type.
        """

        if extension in self.SOURCE_CODE_EXTENSIONS:
            return "source_code"

        if extension in self.DOCUMENTATION_EXTENSIONS:
            return "documented"

        return "repository_context"