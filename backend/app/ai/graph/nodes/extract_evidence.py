from app.ai.evidence.evidence_extractor import (
    EvidenceExtractor,
)
from app.ai.graph.state import ForgeState


def extract_evidence(
    state: ForgeState,
) -> ForgeState:
    """
    Convert repository documents into structured evidence.

    Reads:
        - documents

    Writes:
        - evidence
    """

    print("=" * 80)
    print("NODE: Extract Evidence")
    print("=" * 80)

    extractor = EvidenceExtractor()

    evidence = extractor.extract(
        documents=state["documents"],
        question=state["question"],
    )

    state["evidence"] = evidence

    print(
        f"Evidence items extracted: "
        f"{len(evidence)}"
    )

    return state


"""
Extract Evidence Node

Why do we need this?
--------------------
ForgeAI reasons over repository documents, but raw LangChain Document
objects should not be exposed directly through the API.

This node converts retrieved repository context into structured evidence
objects that can later be rendered by the frontend.

Reads
-----
documents

Writes
------
evidence

Pipeline Position
-----------------
generate
    ↓
extract_evidence
    ↓
END
""" 