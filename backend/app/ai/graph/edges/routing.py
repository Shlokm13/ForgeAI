from app.ai.graph.state import ForgeState


MAX_RETRIES = 5


MAX_RETRIES = 5


def route_after_grading(
    state: ForgeState,
) -> str:
    """
    Decide whether retrieval should be retried,
    analyzed, or safely terminated.

    Reads:
        - retrieval_grade
        - retry_count

    Returns:
        - analyze_intent
        - rewrite
        - generate
    """

    grade = state["retrieval_grade"]
    retry_count = state["retry_count"]

    print("=" * 80)
    print("ROUTER: After Retrieval Grading")
    print("=" * 80)

    print(f"Retrieval Grade: {grade}")
    print(f"Retry Count: {retry_count}")

    if grade == "relevant":
        print("Route: analyze_intent")
        return "analyze_intent"

    if retry_count >= MAX_RETRIES:
        print("Maximum retries reached.")
        print("Route: generate")
        return "generate"

    print("Route: rewrite")
    return "rewrite"



def route_after_intent_analysis(
    state: ForgeState,
) -> str:
    """
    Select the reasoning workflow based on engineering intent.

    Reads:
        - question_intent

    Returns:
        - trace_code_flow
        - analyze_architecture
        - generate
    """

    question_intent = state["question_intent"]

    print("=" * 80)
    print("ROUTER: After Intent Analysis")
    print("=" * 80)

    print(f"Question Intent: {question_intent}")

    if question_intent == "code_flow":
        print("Route: trace_code_flow")
        return "trace_code_flow"

    if question_intent == "architecture":
        print("Route: analyze_architecture")
        return "analyze_architecture"
    
    if question_intent == "debugging":
        print("Route: analyze_debug")
        return "analyze_debug"
    
    if question_intent == "implementation":
        print("Route: analyze_implementation")
        return "analyze_implementation"

    print("Route: generate")
    return "generate"