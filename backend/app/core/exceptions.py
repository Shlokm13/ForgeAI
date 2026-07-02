"""
Custom exceptions used throughout ForgeAI.

These exceptions represent business-level errors instead of
generic Python exceptions.
"""


class RepositoryNotFoundError(Exception):
    """
    Raised when the requested repository cannot be found.
    """

    def __init__(self, message: str = "Repository not found."):
        self.message = message
        super().__init__(self.message)