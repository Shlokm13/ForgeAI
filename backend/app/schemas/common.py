"""
Common response schemas.

This module contains reusable response models shared across
the entire ForgeAI backend.
"""

from typing import Any

from pydantic import BaseModel


class ApiResponse(BaseModel):
    """
    Standard API response model.

    Every endpoint in ForgeAI returns this structure to ensure
    consistency across the entire backend.
    """

    success: bool
    message: str
    data: Any | None = None