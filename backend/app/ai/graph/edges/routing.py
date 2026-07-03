from app.ai.graph.state import ForgeState


MAX_RETRIES = 5


def route_after_grading(
    state: ForgeState,
) -> str:
    """
    Decide the next graph step based on retrieval quality
    and retry count.

    Reads:
        - retrieval_grade
        - retry_count

    Returns:
        - generate
        - rewrite
    """

    grade = state["retrieval_grade"]
    retry_count = state["retry_count"]

    print("=" * 80)
    print("ROUTER: After Retrieval Grading")
    print("=" * 80)

    print(f"Retrieval Grade: {grade}")
    print(f"Retry Count: {retry_count}")

    if grade == "relevant":
        print("Route: generate")
        return "generate"

    if retry_count >= MAX_RETRIES:
        print("Maximum retries reached.")
        print("Route: generate")
        return "generate"

    print("Route: rewrite")
    return "rewrite"