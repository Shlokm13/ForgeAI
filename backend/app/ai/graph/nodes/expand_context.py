from app.ai.graph.state import ForgeState
from app.ai.retrieval.context_expander import ContextExpander
from app.ai.vectorstore.chroma_service import ChromaService


def expand_context(
    state: ForgeState,
) -> ForgeState:
    """
    Expand semantic retrieval results using related repository chunks.

    Reads:
        - repository_name
        - documents

    Writes:
        - documents
    """

    print("=" * 80)
    print("NODE: Expand Context")
    print("=" * 80)

    anchor_documents = state["documents"]

    chroma_service = ChromaService(
        collection_name=state["repository_name"],
    )

    expander = ContextExpander(
        chroma_service=chroma_service,
        related_chunks=3,
    )

    expanded_documents = expander.expand(
        anchor_documents
    )

    state["documents"] = expanded_documents

    print(
        f"Anchor documents: "
        f"{len(anchor_documents)}"
    )

    print(
        f"Expanded documents: "
        f"{len(expanded_documents)}"
    )

    print(
        f"Additional documents: "
        f"{len(expanded_documents) - len(anchor_documents)}"
    )

    return state


"""
Expand Context Node

Why do we need this?
--------------------
Semantic retrieval returns repository chunks directly related to the
user's query.

Those chunks may reference repository mechanisms whose implementation
exists in other semantically related chunks.

This node expands the retrieved context before retrieval grading.

Reads
-----
repository_name
documents

Writes
------
documents

Pipeline Position
-----------------
retrieve
    ↓
expand_context
    ↓
grade
"""