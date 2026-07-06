"""
Repository API Routes.
"""

from fastapi import APIRouter

from app.schemas.repository import (
    RepositoryUploadRequest,
    RepositoryFilesResponse,
)
from app.schemas.common import ApiResponse
from app.services.repository_service import RepositoryService
from pathlib import Path

# Create the router for all repository-related endpoints.
router = APIRouter(
    prefix="/repository",
    tags=["Repository"],
)

# Service responsible for repository indexing.
service = RepositoryService()

@router.get(
    "/{repository_name}/files",
    response_model=RepositoryFilesResponse,
)
def get_repository_files(
    repository_name: str,
) -> RepositoryFilesResponse:
    """
    Return files represented in the current
    ForgeAI repository index.
    """

    return service.get_repository_files(
        repository_name
    )


@router.post(
    "/upload",
    response_model=ApiResponse,
)
def upload_repository(
    request: RepositoryUploadRequest,
) -> ApiResponse:
    """
    Upload and index a software repository.
    """

    return service.upload_repository(
        Path(request.repository_path)
    )