
from langchain_groq import ChatGroq

from app.config.settings import settings


class LLMProvider:
    """
    Creates and provides the application's LLM.
    """

    def __init__(self):
        """
        Initialize the LLM.
        """

        self.llm = ChatGroq(
            model=settings.LLM_MODEL,
            api_key=settings.GROQ_API_KEY,
            temperature=0,
        )

    def get_llm(self) -> ChatGroq:
        """
        Return the configured LLM instance.
        """

        return self.llm
"""
LLM Provider

Why do we need this?
--------------------
ForgeAI should not be tightly coupled to a specific Large Language
Model provider.

This provider is responsible for creating and configuring the
LLM used throughout the application.

Today we use Groq.

If we later switch to Gemini, OpenAI, Claude, or Ollama,
only this file needs to change.

Example
-------
LLMProvider
      │
      ▼
ChatGroq(...)
      │
      ▼
Configured LLM

Responsibilities
----------------
✔ Create and configure the LLM.
✔ Provide a reusable LLM instance.
✔ Hide provider-specific configuration.
✘ Do NOT retrieve documents.
✘ Do NOT build prompts.
✘ Do NOT generate application logic.
"""