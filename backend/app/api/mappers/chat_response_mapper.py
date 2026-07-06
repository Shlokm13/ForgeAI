from app.schemas.chat import (
    ChatResponse,
    EvidenceResponse,
)


class ChatResponseMapper:
    """
    Converts the internal ForgeAI graph state into
    a clean API response.
    """

    def map(
        self,
        state: dict,
    ) -> ChatResponse:
        """
        Map graph state to ChatResponse.
        """

        evidence = [
            EvidenceResponse(
                evidence_type=item["evidence_type"],
                file_path=item["file_path"],
                file_name=item["file_name"],
                content=item["content"],
            )
            for item in state.get(
                "evidence",
                [],
            )
        ]

        return ChatResponse(
            repository_name=state.get(
                "repository_name",
                "",
            ),
            question=state.get(
                "question",
                "",
            ),
            answer=state.get(
                "answer",
                "",
            ),
            intent=state.get(
                "question_intent",
                "general",
            ),
            evidence=evidence,
        )