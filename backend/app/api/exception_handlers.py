"""
Global exception handlers for ForgeAI.

Converts application exceptions into standardized API responses.
"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.core.exceptions import RepositoryNotFoundError


def register_exception_handlers(app: FastAPI) -> None:
    """
    Register all custom exception handlers with the FastAPI application.
    """

    @app.exception_handler(RepositoryNotFoundError)
    async def repository_not_found_handler(
        request: Request,
        exc: RepositoryNotFoundError,
    ):
        return JSONResponse(
            status_code=404,
            content={
                "success": False,
                "message": exc.message,
                "data": None,
            },
        )