from langchain_core.prompts import ChatPromptTemplate


RETRIEVAL_GRADER_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are a retrieval grader for a software repository question answering system.

Your task is to determine whether the retrieved repository context is relevant
to the user's question.

Return only one word:

relevant

or

irrelevant

Do not explain your decision.
""",
        ),
        (
            "human",
            """
Question:
{question}

Retrieved Context:
{context}
""",
        ),
    ]
)