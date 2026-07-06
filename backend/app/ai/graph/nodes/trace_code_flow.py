from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.code_flow_prompt import CODE_FLOW_PROMPT


def trace_code_flow(
    state: ForgeState,
) -> ForgeState:
    """
    Trace execution or data flow using retrieved repository context.

    Reads:
        - question
        - documents

    Writes:
        - code_flow_trace
    """

    print("=" * 80)
    print("NODE: Trace Code Flow")
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

    prompt = CODE_FLOW_PROMPT.invoke(
        {
            "question": state["question"],
            "context": context,
        }
    )

    response = llm.invoke(prompt)

    code_flow_trace = response.content.strip()

    state["code_flow_trace"] = code_flow_trace

    print("Code Flow Trace:")
    print(code_flow_trace)

    return state