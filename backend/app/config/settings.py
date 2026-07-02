## store all the configurations of the project in one place

"""
Application configuration.

This module centralizes all environment-based configuration.
Every component in ForgeAI imports settings from here instead
of directly accessing environment variables.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from the .env file."""

    # ---------- Groq ----------
    GROQ_API_KEY: str
    LLM_MODEL: str

    # ---------- Ollama ----------
    OLLAMA_BASE_URL: str
    EMBEDDING_MODEL: str

    # ---------- Chroma ----------
    CHROMA_DB_PATH: str

    # ---------- Tavily ----------
    TAVILY_API_KEY: str

    # Tell Pydantic where to load environment variables from and ignore the ones not used 
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


# Singleton settings instance used throughout the application
settings = Settings()