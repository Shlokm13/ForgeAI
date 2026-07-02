"""
Health Routes

Contains endpoints used to verify that the backend is running.
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
def health():
    """
    Health check endpoint.

    Returns:
        dict: Current application status.
    """
    return {
        "status": "healthy"
    }