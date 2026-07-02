"""
Repository request and response schemas.

This module contains all schemas related to repository operations.
"""

from pydantic import BaseModel, Field


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