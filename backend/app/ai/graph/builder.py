from langgraph.graph import StateGraph, START, END

from app.ai.graph.state import ForgeState

from app.ai.graph.nodes.initialize import initialize_query
from app.ai.graph.nodes.retrieve import retrieve_documents
from app.ai.graph.nodes.expand_context import (
    expand_context,
)
from app.ai.graph.nodes.generate import generate_answer
from app.ai.graph.nodes.grade import grade_retrieval
from app.ai.graph.edges.routing import (
    route_after_grading,
    route_after_intent_analysis,
)
from app.ai.graph.nodes.rewrite import rewrite_query
from app.ai.graph.nodes.analyze_intent import analyze_intent
from app.ai.graph.nodes.trace_code_flow import trace_code_flow
from app.ai.graph.nodes.analyze_architecture import (
    analyze_architecture,
)
from app.ai.graph.nodes.analyze_debug import analyze_debug
from app.ai.graph.nodes.analyze_implementation import (
    analyze_implementation,
)
from app.ai.graph.nodes.extract_evidence import (
    extract_evidence,
)

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
            "expand_context",
            expand_context,
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
        
        graph.add_node(
            "analyze_intent",
            analyze_intent,
        )
        
        graph.add_node(
            "trace_code_flow",
            trace_code_flow,
        )
        
        graph.add_node(
            "analyze_architecture",
            analyze_architecture,
        )
        
        graph.add_node(
            "analyze_debug",
            analyze_debug,
        )
        
        graph.add_node(
            "analyze_implementation",
            analyze_implementation,
        )
        
        graph.add_node(
            "extract_evidence",
            extract_evidence,
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
            "expand_context",
        )

        graph.add_edge(
            "expand_context",
            "grade",
        )
        
        graph.add_conditional_edges(
            "grade",
            route_after_grading,
            {
                "analyze_intent": "analyze_intent",
                "rewrite": "rewrite",
                "generate": "generate",
            },
        )
        
        graph.add_conditional_edges(
            "analyze_intent",
            route_after_intent_analysis,{
                "trace_code_flow": "trace_code_flow",
                "analyze_architecture": "analyze_architecture",
                "analyze_debug": "analyze_debug",
                "analyze_implementation": "analyze_implementation",
                "generate": "generate",
            }
        )
        
        graph.add_edge(
            "trace_code_flow",
            "generate",
        )
        
        graph.add_edge(
            "analyze_architecture",
            "generate",
        )
        
        graph.add_edge(
            "analyze_debug",
            "generate",
        )
        
        graph.add_edge(
            "analyze_implementation",
            "generate",
        )
        
        graph.add_edge(
            "rewrite",
            "retrieve",
        )

        graph.add_edge(
            "generate",
            "extract_evidence",
        )

        graph.add_edge(
            "extract_evidence",
            END,
        )

        return graph.compile()