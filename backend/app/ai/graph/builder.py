from langgraph.graph import StateGraph, START, END

from app.ai.graph.state import ForgeState

from app.ai.graph.nodes.initialize import initialize_query
from app.ai.graph.nodes.retrieve import retrieve_documents
from app.ai.graph.nodes.generate import generate_answer
from app.ai.graph.nodes.grade import grade_retrieval
from app.ai.graph.edges.routing import route_after_grading
from app.ai.graph.nodes.rewrite import rewrite_query

class ForgeGraphBuilder:
    """
    Builds the ForgeAI LangGraph workflow.
    """

    @staticmethod
    def build():

        graph = StateGraph(ForgeState)

        # Register nodes
        graph.add_node(
            "initialize",
            initialize_query,
        )
        
        graph.add_node(
            "retrieve",
            retrieve_documents,
        )

        graph.add_node(
            "generate",
            generate_answer,
        )
        
        graph.add_node(
            "grade",
            grade_retrieval,
        )
        
        graph.add_node(
            "rewrite",
            rewrite_query,
        )

        # Define execution flow
        graph.add_edge(
            START,
            "initialize",
        )
        
        graph.add_edge(
            "initialize",
            "retrieve",
        )

        graph.add_edge(
            "retrieve",
            "grade",
        )
        
        graph.add_conditional_edges(
            "grade",
            route_after_grading,
            {
                "generate": "generate",
                "rewrite": "rewrite",
            },
        )
        
        graph.add_edge(
            "rewrite",
            "retrieve",
        )

        graph.add_edge(
            "generate",
            END,
        )

        return graph.compile()