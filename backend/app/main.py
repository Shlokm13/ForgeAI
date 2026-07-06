"""
ForgeAI Backend Entry Point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.exception_handlers import register_exception_handlers
from app.api.router import api_router


app = FastAPI(
    title="ForgeAI",
    description="AI Software Engineering Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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