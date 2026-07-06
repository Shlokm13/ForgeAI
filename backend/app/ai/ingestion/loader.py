
from pathlib import Path

from langchain_core.documents import Document
from app.ai.metadata import MetadataKeys

"""creating this in seperate folder to avoid circular imports with the service layer. The service layer will call this loader to convert files into documents. this improves my single responsibility principle and makes the code more modular and testable. The service layer will handle the orchestration of scanning, filtering, loading, and splitting documents, while this loader focuses solely on converting files into LangChain Documents with the appropriate metadata.
This separation of concerns makes the codebase easier to maintain and extend in the future. For example, if we want to change the way we load documents or add additional metadata, we can do so in this loader without affecting the service layer. Similarly, if we want to change the scanning or filtering logic, we can do so in the service layer without affecting the document loading process."""


class DocumentLoader:
    """
    Converts repository files into LangChain Documents.
    """
    
    def __init__(
        self,
        repository_root: Path,
    ):
        """
        Store the repository root so we can create
        relative paths for metadata.
        """

        self.repository_root = repository_root

    def load_documents(
        self,
        files: list[Path],
    ) -> list[Document]:
        """
        Read every file and create a Document object.

        Args:
            files: Filtered repository files.

        Returns:
            List of LangChain Document objects.
        """

        documents = []

        for file_path in files:

            try:
                content = file_path.read_text(
                    encoding="utf-8"
                )

            except UnicodeDecodeError:
                # Skip files that cannot be decoded as text.
                continue

            document = Document(
                page_content=content,
                metadata={
                    MetadataKeys.SOURCE: str(file_path.resolve()),
                    MetadataKeys.RELATIVE_PATH: str(
                        file_path
                        .relative_to(self.repository_root)
                        .as_posix()
                    ),
                    MetadataKeys.FILE_NAME: file_path.name,
                    MetadataKeys.PARENT_DIRECTORY: str(
                        file_path.parent
                        .relative_to(
                            self.repository_root
                        )
                        .as_posix()
                    ),
                    MetadataKeys.EXTENSION: file_path.suffix,
                    MetadataKeys.FILE_SIZE: file_path.stat().st_size,
                    MetadataKeys.LAST_MODIFIED: file_path.stat().st_mtime,
                }
            )

            documents.append(document)
            
        return documents

"""
Document Loader

Why do we need this?
--------------------
The scanner discovers files and the filter removes unnecessary ones,
but the AI pipeline cannot work with file paths.

This component reads each file and converts it into a LangChain
Document object.

Example
-------
Input:
[
    Path("README.md"),
    Path("app/main.py")
]

Output:
[
    Document(...),
    Document(...)
]

Responsibilities
----------------
✔ Read file contents.
✔ Convert files into LangChain Documents.
✔ Preserve metadata.
✘ Do NOT split documents.
✘ Do NOT generate embeddings.
"""
        