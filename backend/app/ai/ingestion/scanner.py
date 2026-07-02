
from pathlib import Path


class RepositoryScanner:
    """
    Scans a repository and returns all file paths.
    """

    def __init__(self, repository_path: str):
        """
        Initialize the scanner.

        Args:
            repository_path: Absolute or relative path to the repository.
        """
        self.repository_path = Path(repository_path)

    def scan(self) -> list[Path]:
        """
        Recursively discover every file inside the repository.

        Returns:
            A list of pathlib.Path objects representing every file.

        Example:
            scanner = RepositoryScanner("D:/Projects/MyApp")

            files = scanner.scan()

            Output:
            [
                Path("README.md"),
                Path("app/main.py"),
                Path("requirements.txt")
            ]
        """

        return [
            file_path
            for file_path in self.repository_path.rglob("*")
            if file_path.is_file()
        ]
        
        
"""
Repository Scanner

Why do we need this?
--------------------
A software repository may contain thousands of files spread across
multiple directories. Before we can generate embeddings or build a
vector database, we first need to know which files exist.

This component is responsible ONLY for discovering files.

Example
-------
Repository/
│
├── README.md
├── requirements.txt
├── app/
│   ├── main.py
│   └── service.py
│
└── docs/
    └── api.md

Output:
[
    Path("README.md"),
    Path("requirements.txt"),
    Path("app/main.py"),
    Path("app/service.py"),
    Path("docs/api.md")
]

Responsibilities
----------------
✔ Traverse the repository recursively.
✔ Return file paths.
✔ Do NOT read file contents.
✔ Do NOT filter files.
✔ Do NOT create LangChain Documents.
✔ Do NOT generate embeddings.

Keeping this class focused on a single responsibility makes the
pipeline easier to understand, test, and extend.
"""