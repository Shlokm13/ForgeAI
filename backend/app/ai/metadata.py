"""
Metadata Keys

Defines the standard metadata keys used throughout ForgeAI.

Every LangChain Document created by ForgeAI must use these keys.
Keeping them centralized prevents typos and ensures consistency
across the entire AI pipeline.
"""


class MetadataKeys:
    """Standard document metadata keys."""

    SOURCE = "source"

    RELATIVE_PATH = "relative_path"

    FILE_NAME = "file_name"

    PARENT_DIRECTORY = "parent_directory"

    EXTENSION = "extension"

    FILE_SIZE = "file_size"

    LAST_MODIFIED = "last_modified"