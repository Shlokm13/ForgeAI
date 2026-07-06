from typing import TypedDict


class EvidenceItem(TypedDict):
    """
    Structured repository evidence exposed by ForgeAI.
    """

    evidence_type: str
    file_path: str
    file_name: str
    content: str