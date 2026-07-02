"""
GitHub Repository Routes.
"""

from fastapi import APIRouter

from app.integrations.github.github_cloner import GitHubCloner
from app.schemas.common import ApiResponse
from app.schemas.github import GitHubRepositoryRequest
from app.services.repository_service import RepositoryService

router = APIRouter(
    prefix="/repository",
    tags=["Repository"],
)

cloner = GitHubCloner()
service = RepositoryService()


@router.post(
    "/upload/github",
    response_model=ApiResponse,
)
def upload_github_repository(
    request: GitHubRepositoryRequest,
) -> ApiResponse:
    """
    Clone a GitHub repository and index it.
    """

    repository_path = cloner.clone_repository(
        str(request.repository_url)
    )

    return service.upload_repository(
        repository_path
    )