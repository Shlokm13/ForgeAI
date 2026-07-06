from app.ai.graph.state import ForgeState
from app.ai.llm.llm_provider import LLMProvider
from app.ai.prompts.rag_prompt import RAG_PROMPT


def generate_answer(
    state: ForgeState,
) -> ForgeState:
    """
    Generate the final repository-grounded answer.

    Reads:
        - question
        - documents
        - question_intent
        - code_flow_trace

    Writes:
        - answer
    """

    print("=" * 80)
    print("NODE: Generate Answer")
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

    code_flow_trace = state.get(
        "code_flow_trace",
        "",
    )
    
    architecture_analysis = state.get(
        "architecture_analysis",
        "",
    )
    
    debug_analysis = state.get(
        "debug_analysis",
        "",
    )
    
    implementation_analysis = state.get(
        "implementation_analysis",
        "",
    )

    llm = (
        LLMProvider()
        .get_llm()
    )

    prompt = RAG_PROMPT.invoke(
        {
            "question": state["question"],
            "question_intent": state.get(
                    "question_intent",
                    "general",
                ),
            "context": context,
            "code_flow_trace": code_flow_trace,
            "architecture_analysis": architecture_analysis,
            "debug_analysis": debug_analysis,
            "implementation_analysis": implementation_analysis,
            
        }
    )

    response = llm.invoke(prompt)

    answer = response.content.strip()

    state["answer"] = answer

    return state