"""
Repository request and response schemas.

This module contains all schemas related to repository operations.
"""

from pydantic import BaseModel, Field

class RepositoryFileResponse(BaseModel):
    """
    Metadata for one file represented in the
    ForgeAI repository index.
    """

    file_name: str
    file_path: str
    parent_directory: str
    extension: str
    file_size: int
    last_modified: float


class RepositoryFilesResponse(BaseModel):
    """
    Indexed repository files exposed to the frontend.
    """

    repository_name: str
    total_files: int
    files: list[RepositoryFileResponse]

class RepositoryUploadRequest(BaseModel):
    """
    Request model for uploading a repository.

    For the MVP, the repository is identified by its local path.
    Later we can extend this model to support GitHub URLs,
    ZIP uploads, or cloud storage.
    """

    repository_path: str = Field(
        ...,
        description="Absolute or relative path to the repository."
    )# field alllow to attach metadata