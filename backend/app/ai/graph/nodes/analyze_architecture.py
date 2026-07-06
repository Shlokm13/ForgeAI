from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.architecture_analysis_prompt import (
    ARCHITECTURE_ANALYSIS_PROMPT,
)


def analyze_architecture(
    state: ForgeState,
) -> ForgeState:
    """
    Analyze repository architecture relevant to the user's question.

    Reads:
        - question
        - documents

    Writes:
        - architecture_analysis
    """

    print("=" * 80)
    print("NODE: Analyze Architecture")
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

    prompt = ARCHITECTURE_ANALYSIS_PROMPT.invoke(
        {
            "question": state["question"],
            "context": context,
        }
    )

    response = llm.invoke(prompt)

    architecture_analysis = response.content.strip()

    state["architecture_analysis"] = architecture_analysis

    print("Architecture Analysis:")
    print(architecture_analysis)

    return state