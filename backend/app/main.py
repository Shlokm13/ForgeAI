"""
ForgeAI Backend Entry Point.
"""

from fastapi import FastAPI

from app.api.exception_handlers import register_exception_handlers
from app.api.router import api_router

app = FastAPI(
    title="ForgeAI",
    description="AI Software Engineering Intelligence Platform",
    version="1.0.0",
)

# Register all API routes.
app.include_router(api_router)

# Register all global exception handlers.
register_exception_handlers(app)


@app.get("/")
def root():
    return {
        "message": "Welcome to ForgeAI 🚀"
    }