from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.debug_analysis_prompt import (
    DEBUG_ANALYSIS_PROMPT,
)


def analyze_debug(
    state: ForgeState,
) -> ForgeState:
    """
    Analyze a repository-grounded software failure.

    Reads:
        - question
        - documents

    Writes:
        - debug_analysis
    """

    print("=" * 80)
    print("NODE: Analyze Debug")
    print("=" * 80)

    documents = state["documents"]

    context = "\n\n".join(
        [
            (
                f"FILE: "
                f"{document.metadata.get('relative_path', 'unknown')}\n"
                f"CONTENT:\n"
                f"{document.page_content}"
            )
            for document in documents
        ]
    )

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = DEBUG_ANALYSIS_PROMPT.invoke(
        {
            "question": state["question"],
            "context": context,
        }
    )

    response = llm.invoke(prompt)

    debug_analysis = response.content.strip()

    state["debug_analysis"] = debug_analysis

    print("Debug Analysis:")
    print(debug_analysis)

    return state