"""
Repository API Routes.
"""

from fastapi import APIRouter

from app.schemas.repository import RepositoryUploadRequest
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