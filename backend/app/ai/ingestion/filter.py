
from pathlib import Path


class RepositoryFileFilter:
    """
    Filters repository files before document loading.
    """

    # Directories to ignore
    IGNORED_DIRECTORIES = {
        ".git",
        "venv",
        ".venv",
        "__pycache__",
        "node_modules",
        ".idea",
        ".vscode",
        "dist",
        "build",
        "repositories",
    }

    # File extensions we want to keep
    SUPPORTED_EXTENSIONS = {
        ".py",
        ".md",
        ".txt",
        ".json",
        ".yaml",
        ".yml",
        ".js",
        ".ts",
        ".tsx",
        ".jsx",
        ".html",
        ".css",
        ".cpp",
        ".c",
        ".h",
        ".hpp",
        ".java",
    }

    def filter_files(
        self,
        files: list[Path],
    ) -> list[Path]:
        """
        Remove unsupported files.

        Args:
            files: List of repository files.

        Returns:
            Filtered list of files.
        """

        filtered_files = []

        for file_path in files:

            # Ignore files inside unwanted directories.
            if any(
                directory in file_path.parts
                for directory in self.IGNORED_DIRECTORIES
            ):
                continue

            # Ignore unsupported file types.
            if file_path.suffix.lower() not in self.SUPPORTED_EXTENSIONS:
                continue

            filtered_files.append(file_path)

        return filtered_files
    
"""
Repository File Filter

Why do we need this?
--------------------
A repository contains many files that are not useful for AI-based
understanding, such as virtual environments, Git metadata,
compiled files, and dependency folders.

This component removes those files before they enter the
document loading stage.

Example
-------
Input:
[
    Path("README.md"),
    Path("app/main.py"),
    Path(".git/config"),
    Path("venv/lib/site.py"),
    Path("__pycache__/main.pyc")
]

Output:
[
    Path("README.md"),
    Path("app/main.py")
]

Responsibilities
----------------
✔ Remove unwanted directories.
✔ Remove unwanted file types.
✔ Return only useful files.
✘ Do NOT read file contents.
✘ Do NOT create LangChain Documents.
✘ Do NOT generate embeddings.
"""