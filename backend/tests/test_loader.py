"""
Simple test for RepositoryLoader.
"""

from app.ai.ingestion.loader import RepositoryLoader

# Path to the repository you want to load
repository_path = "./app/ai/ingestion"

loader = RepositoryLoader(repository_path)

documents = loader.load()

print("=" * 50)
print(f"Total Documents Loaded: {len(documents)}")
print("=" * 50)

if documents:
    print("\nFirst Document Metadata:\n")
    print(documents[0].metadata)

    print("\nFirst 200 Characters:\n")
    print(documents[0].page_content[:200])