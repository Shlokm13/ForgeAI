"""
Repository Service

Contains business logic related to repository management.
"""

from pathlib import Path

from app.ai.vectorstore.chroma_service import ChromaService
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.ai.ingestion.loader import DocumentLoader
from app.ai.ingestion.filter import RepositoryFileFilter
from app.ai.ingestion.scanner import RepositoryScanner
from app.core.exceptions import RepositoryNotFoundError
from app.schemas.common import ApiResponse
from app.schemas.repository import RepositoryUploadRequest


class RepositoryService:
    """
    Handles repository-related operations.
    """

    def upload_repository(
        self,
        repository_path: Path,
    ) -> ApiResponse:
        """
        Validate the repository path and prepare it for
        the AI ingestion pipeline.
        """

        if not repository_path.exists():
            raise RepositoryNotFoundError(
                f"Repository '{repository_path}' does not exist."
        )

        if not repository_path.is_dir():
            raise RepositoryNotFoundError(
                f"'{repository_path}' is not a directory."
            )
            
        repository_name = repository_path.name

        # Step 1: Scan the repository.
        scanner = RepositoryScanner(repository_path)
        scanned_files = scanner.scan()

        # Step 2: Filter unwanted files.
        file_filter = RepositoryFileFilter()
        filtered_files = file_filter.filter_files(scanned_files)
        
        # Step 3: Convert files into LangChain Documents.
        loader = DocumentLoader(
             repository_root=repository_path
            )
        documents = loader.load_documents(filtered_files)
        
        #Step 4: Split documents into chunks for better processing.
        text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        )
        
        chunks = text_splitter.split_documents(documents)
        
        print(f"Uploading to collection: {repository_name}")
        # Step 5: Store chunks inside ChromaDB.
        chroma_service = ChromaService(
            collection_name=repository_name,
        )# later we can make the collection name dynamic based on the repository name or user input.
        
        # Remove the previous index before storing the latest one.
        chroma_service.reset_collection()

        # Store the freshly generated chunks.
        chroma_service.add_documents(chunks)
        
        print("=" * 80)
        print("After Upload")
        print("Collection:", repository_name)
        print("Chunks Created:", len(chunks))
        print("Stored in Chroma:", chroma_service.vector_store._collection.count())
        print("=" * 80)
        

        return ApiResponse(
            success=True,
            message="Repository scanned successfully.",
            data={
                "total_files": len(scanned_files),
                "supported_files": len(filtered_files),
                "documents_loaded": len(documents),
                "chunks_created": len(chunks),
                "vector_database": "ChromaDB",
            },
        )