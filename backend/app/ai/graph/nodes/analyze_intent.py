from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.intent_analysis_prompt import INTENT_ANALYSIS_PROMPT


VALID_INTENTS = {
    "code_flow",
    "architecture",
    "implementation",
    "debugging",
    "general",
}


def analyze_intent(
    state: ForgeState,
) -> ForgeState:
    """
    Classify the engineering intent of the user's question.

    Reads:
        - question

    Writes:
        - question_intent
    """

    print("=" * 80)
    print("NODE: Analyze Question Intent")
    print("=" * 80)

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = INTENT_ANALYSIS_PROMPT.invoke(
        {
            "question": state["question"],
        }
    )

    response = llm.invoke(prompt)

    question_intent = (
        response.content
        .strip()
        .lower()
    )

    if question_intent not in VALID_INTENTS:
        question_intent = "general"

    state["question_intent"] = question_intent

    print(
        f"Question Intent: "
        f"{question_intent}"
    )

    return state