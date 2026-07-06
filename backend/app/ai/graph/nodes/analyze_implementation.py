from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.implementation_analysis_prompt import (
    IMPLEMENTATION_ANALYSIS_PROMPT,
)


def analyze_implementation(
    state: ForgeState,
) -> ForgeState:
    """
    Analyze how a repository mechanism is implemented.

    Reads:
        - question
        - documents

    Writes:
        - implementation_analysis
    """

    print("=" * 80)
    print("NODE: Analyze Implementation")
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

    prompt = IMPLEMENTATION_ANALYSIS_PROMPT.invoke(
        {
            "question": state["question"],
            "context": context,
        }
    )

    response = llm.invoke(prompt)

    implementation_analysis = response.content.strip()

    state["implementation_analysis"] = implementation_analysis

    print("Implementation Analysis:")
    print(implementation_analysis)

    return state