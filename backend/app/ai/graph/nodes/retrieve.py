from app.ai.graph.state import ForgeState
from app.ai.retrieval.retriever import Retriever
from app.ai.vectorstore.chroma_service import ChromaService


def retrieve_documents(
    state: ForgeState,
) -> ForgeState:
    """
    Retrieve relevant documents from the repository.

    Reads:
        - repository_name
        - question

    Writes:
        - documents
    """

    print("=" * 80)
    print("NODE: Retrieve Documents")
    print("=" * 80)

    chroma_service = ChromaService(
        collection_name=state["repository_name"]
    )

    retriever = Retriever(chroma_service)

    documents = retriever.retrieve(
        state["retrieval_query"]
    )

    print(
        f"Retrieval Question: "
        f"{state['retrieval_query']}"
    )
    print(f"Retrieved {len(documents)} documents")

    state["documents"] = documents

    return state