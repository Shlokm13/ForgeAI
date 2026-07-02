"""
GitHub Upload Schemas.
"""

from pydantic import BaseModel, HttpUrl


class GitHubRepositoryRequest(BaseModel):
    """
    Request model for GitHub repository uploads.
    """

    repository_url: HttpUrl