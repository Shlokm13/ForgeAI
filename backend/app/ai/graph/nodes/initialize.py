from app.ai.graph.state import ForgeState


def initialize_query(
    state: ForgeState,
) -> ForgeState:
    """
    Initialize the retrieval workflow.

    Reads:
        - question

    Writes:
        - retrieval_query
        - retry_count
    """

    print("=" * 80)
    print("NODE: Initialize Query")
    print("=" * 80)

    state["retrieval_query"] = state["question"]
    state["retry_count"] = 0

    return state