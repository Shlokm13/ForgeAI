from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.document_formatter import DocumentFormatter
from app.ai.prompts.retrieval_grader_prompt import RETRIEVAL_GRADER_PROMPT


def grade_retrieval(
    state: ForgeState,
) -> ForgeState:
    """
    Grade whether the retrieved documents are relevant
    to the user's question.

    Reads:
        - question
        - documents

    Writes:
        - retrieval_grade
    """

    print("=" * 80)
    print("NODE: Grade Retrieval")
    print("=" * 80)

    formatter = DocumentFormatter()

    context = formatter.format(
        state["documents"]
    )

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = RETRIEVAL_GRADER_PROMPT.invoke(
        {
            "question": state["question"],
            "context": context,
        }
    )

    response = llm.invoke(prompt)

    grade = response.content.strip().lower()

    state["retrieval_grade"] = grade

    print(f"Retrieval Grade: {grade}")

    return state