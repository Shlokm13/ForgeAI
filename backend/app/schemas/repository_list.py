from pydantic import BaseModel


class RepositorySummary(BaseModel):
    """
    Summary of an indexed repository.
    """
    
    branch: str = "main"

    name: str
    indexed_files: int
    indexed_chunks: int
    