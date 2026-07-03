from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.rewrite_prompt import QUERY_REWRITE_PROMPT


def rewrite_query(
    state: ForgeState,
) -> ForgeState:
    """
    Rewrite the retrieval query after irrelevant retrieval.

    Reads:
        - question
        - retrieval_query
        - retry_count

    Writes:
        - retrieval_query
        - retry_count
    """

    print("=" * 80)
    print("NODE: Rewrite Query")
    print("=" * 80)

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = QUERY_REWRITE_PROMPT.invoke(
        {
            "question": state["question"],
            "retrieval_query": state["retrieval_query"],
        }
    )

    response = llm.invoke(prompt)

    rewritten_query = response.content.strip()

    state["retrieval_query"] = rewritten_query
    state["retry_count"] += 1

    print(
        f"Rewritten Question: "
        f"{state['retrieval_query']}"
    )

    print(
        f"Retry Count: "
        f"{state['retry_count']}"
    )

    return state