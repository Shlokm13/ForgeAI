from app.ai.graph.state import ForgeState

from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.document_formatter import DocumentFormatter
from app.ai.prompts.rag_prompt import RAG_PROMPT


def generate_answer(
    state: ForgeState,
) -> ForgeState:
    """
    Generate an answer using the retrieved documents.

    Reads:
        - question
        - documents

    Writes:
        - answer
    """

    print("=" * 80)
    print("NODE: Generate Answer")
    print("=" * 80)

    formatter = DocumentFormatter()

    context = formatter.format(
        state["documents"]
    )

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = RAG_PROMPT.invoke(
        {
            "context": context,
            "question": state["question"],
        }
    )

    response = llm.invoke(prompt)

    state["answer"] = response.content

    return state