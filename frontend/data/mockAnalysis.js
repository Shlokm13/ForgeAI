// Mock data shaped exactly like the public /chat API response.
// Only these top-level fields exist: repository_name, question, answer, intent, evidence.
export const mockAnalysis = {
  repository_name: "YT-AI-Copilot",
  question: "How is the transcript converted into retrievable context?",
  intent: "implementation",
  answer: `## Purpose

The transcript pipeline converts a raw video transcript into semantically retrievable context so that downstream questions can be answered with grounded evidence rather than free-standing generation.

## Implementation Steps

1. The raw transcript is pulled for a given \`video_id\` and normalized into plain text.
2. The text is split into overlapping chunks sized for the embedding model's context window.
3. Each chunk is embedded using \`HuggingFaceEmbeddings\`.
4. The resulting vectors are written into a \`ChromaDB\` collection scoped to the active repository.

## Data Transformations

- Raw transcript text → normalized text (whitespace and timestamp cleanup)
- Normalized text → overlapping chunks
- Chunks → dense vector embeddings
- Embeddings → persisted vector store entries with associated metadata

## Output

A queryable vector store collection keyed by \`video_id\`, ready to serve semantic similarity search during question answering.

## Constraints

- Chunk size and overlap are fixed at index time and are not reconfigurable per query.
- The embedding model is loaded once per process and shared across requests.

## Unavailable Details

The exact chunk size, overlap window, and embedding model checkpoint are not exposed in the public API response and would require direct repository inspection to confirm.`,
  evidence: [
    {
      evidence_type: "source_code",
      file_path: "ytChatBot/backend/main.py",
      file_name: "main.py",
      content: `def create_vector_store(docs, video_id):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    vector_store = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        collection_name=f"transcript_{video_id}",
        persist_directory=CHROMA_PERSIST_DIR,
    )
    return vector_store`,
    },
    {
      evidence_type: "source_code",
      file_path: "ytChatBot/backend/transcript_loader.py",
      file_name: "transcript_loader.py",
      content: `def chunk_transcript(transcript_text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=120,
    )
    return splitter.split_text(transcript_text)`,
    },
    {
      evidence_type: "documented",
      file_path: "README.md",
      file_name: "README.md",
      content: `The application uses retrieval augmented generation to answer questions about a YouTube video. The transcript is fetched, chunked, embedded, and stored in a local ChromaDB instance. At query time, the most relevant chunks are retrieved and passed to the LLM as context.`,
    },
    {
      evidence_type: "repository_context",
      file_path: "ytChatBot/backend/config.py",
      file_name: "config.py",
      content: `CHROMA_PERSIST_DIR is set to a local directory under the backend service. The collection naming convention ties each vector store to a single video_id, which keeps retrieval scoped to one transcript at a time.`,
    },
    {
      evidence_type: "source_code",
      file_path: "ytChatBot/backend/graph/nodes.py",
      file_name: "nodes.py",
      content: `def retrieve_context(state):
    query = state["question"]
    retriever = state["vector_store"].as_retriever(search_kwargs={"k": 5})
    docs = retriever.invoke(query)
    return {"documents": docs}`,
    },
  ],
};

export const EMPTY_STATE_SUGGESTIONS = [
  {
    intent: "implementation",
    label: "IMPLEMENTATION",
    question:
      "How is repository context converted into retrievable embeddings?",
  },
  {
    intent: "architecture",
    label: "ARCHITECTURE",
    question: "How are the major backend components connected?",
  },
  {
    intent: "code_flow",
    label: "CODE FLOW",
    question: "What happens after a user submits a question?",
  },
  {
    intent: "debugging",
    label: "DEBUGGING",
    question: "Where could retrieval fail in this pipeline?",
  },
];
