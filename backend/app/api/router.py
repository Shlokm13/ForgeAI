"""
Central API Router.

Registers all API route groups in one place.
"""

from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.repository import router as repository_router
from app.api.routes.query import router as query_router 
from app.api.routes.github import router as github_router
from app.api.routes.chat import router as chat_router

api_router = APIRouter()

api_router.include_router(health_router)

api_router.include_router(repository_router)

api_router.include_router(query_router) 

api_router.include_router(github_router)

api_router.include_router(chat_router)