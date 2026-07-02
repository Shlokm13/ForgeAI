

import subprocess
from pathlib import Path


def remove_readonly(func, path, exc_info):
    """
    Handle read-only files on Windows while deleting directories.
    """
    os.chmod(path, stat.S_IWRITE)
    func(path)


class GitHubCloner:
    """
    Clones GitHub repositories into a local workspace.
    """

    def __init__(self):
        """
        Create the workspace where repositories will be stored.
        """

        self.workspace = (
            Path(__file__).resolve()
            .parents[3]
            / "repositories"
        )

        self.workspace.mkdir(exist_ok=True)

    def clone_repository(
    self,
    repository_url: str,
) -> Path:
        """
        Clone a new repository or update an existing one.
        """

        repository_name = (
            repository_url.rstrip("/")
            .split("/")[-1]
            .replace(".git", "")
        )

        repository_path = self.workspace / repository_name

        git_directory = repository_path / ".git"

        # Repository doesn't exist → Clone it
        if not repository_path.exists():

            print(f"Cloning repository: {repository_name}")

            subprocess.run(
                [
                    "git",
                    "clone",
                    repository_url,
                    str(repository_path),
                ],
                check=True,
            )

        # Repository exists and is valid → Pull latest changes
        elif git_directory.exists():

            print(f"Updating repository: {repository_name}")

            subprocess.run(
                [
                    "git",
                    "-C",
                    str(repository_path),
                    "pull",
                ],
                check=True,
            )

        # Repository folder exists but is corrupted
        else:

            print(f"Corrupted repository detected: {repository_name}")

            shutil.rmtree(repository_path)

            subprocess.run(
                [
                    "git",
                    "clone",
                    repository_url,
                    str(repository_path),
                ],
                check=True,
            )

        return repository_path
    
"""
GitHub Cloner

Why do we need this?
--------------------
ForgeAI should be able to index repositories directly from GitHub
without requiring the user to clone them manually.

This component is responsible only for downloading a repository
and returning the local path.

Responsibilities
----------------
✔ Clone a GitHub repository.
✔ Replace an existing clone with the latest version.
✔ Return the local repository path.
✘ Do NOT scan files.
✘ Do NOT load documents.
✘ Do NOT generate embeddings.
"""