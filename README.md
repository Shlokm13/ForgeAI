# 🔥 ForgeAI

## Production-Grade AI Software Engineering Mentor

ForgeAI is an AI-powered software engineering mentor designed to understand real-world codebases and answer architecture, implementation, and engineering questions using repository-grounded context.

Unlike a traditional chatbot, ForgeAI builds a semantic understanding of an entire software repository and uses a self-corrective Retrieval-Augmented Generation workflow to produce grounded technical explanations.

The system can ingest both local repositories and GitHub repositories, build a persistent semantic index, retrieve relevant source code, evaluate retrieval quality, and automatically rewrite failed retrieval queries using a LangGraph-based Self-RAG workflow.

---

# 🚀 Core Capabilities

## 📂 Repository Ingestion

ForgeAI can ingest software repositories from:

- Local filesystem paths
- GitHub repository URLs

GitHub repositories are automatically cloned and existing repositories are updated using `git pull`.

---

## 🔍 Intelligent Repository Scanning

Repositories are recursively scanned to discover source files.

The ingestion pipeline filters unnecessary files and directories such as:

- `.git`
- `node_modules`
- virtual environments
- build directories
- generated lock files
- unsupported file formats

This reduces vector database noise and improves semantic retrieval quality.

---

## 📄 Repository-Aware Document Loading

Supported source files are converted into LangChain `Document` objects.

Each document contains repository metadata such as:

```text
file_name
extension
relative_path
parent_directory
file_size
last_modified
source
```

This metadata allows ForgeAI to preserve repository structure during retrieval and answer generation.

---

## ✂️ Semantic Code Chunking

Large source files are split into smaller chunks before embedding.

The chunking layer improves:

- semantic retrieval
- embedding precision
- context relevance
- LLM context efficiency

---

## 🧠 Semantic Repository Indexing

Repository chunks are converted into vector embeddings and stored in ChromaDB.

Each repository receives its own Chroma collection.

```text
Repository
    ↓
Scanner
    ↓
File Filter
    ↓
Document Loader
    ↓
Text Splitter
    ↓
Embedding Model
    ↓
ChromaDB Collection
```

This architecture provides repository-level vector isolation.

---

# 🔄 Self-Corrective RAG with LangGraph

ForgeAI uses LangGraph as the orchestration engine for its AI workflow.

Instead of blindly trusting the first retrieval result, ForgeAI evaluates retrieval quality and automatically retries failed searches.

```text
START
  ↓
Initialize Query
  ↓
Retrieve Documents
  ↓
Grade Retrieval
  ↓
Is Context Relevant?
  │
  ├── YES ───────────────→ Generate Answer
  │                              ↓
  │                             END
  │
  └── NO
       ↓
   Rewrite Query
       ↓
   Retrieve Again
       ↓
   Grade Retrieval
       ↓
      ...
```

The workflow performs a maximum of five query rewrite attempts to guarantee termination and bound LLM and retrieval costs.

---

## 🎯 Retrieval Grading

After retrieving repository chunks, ForgeAI uses an LLM-based retrieval grader.

The grader determines whether the retrieved repository context is relevant to the user's question.

Possible decisions:

```text
relevant
irrelevant
```

The grader does not control execution directly.

Instead, it writes a decision signal into the LangGraph state.

A deterministic routing function consumes this signal and decides the next graph step.

```text
Node
↓
Produces Decision Signal
↓
Conditional Edge
↓
Controls Execution
```

This separates AI reasoning from workflow control.

---

## 🔁 Query Rewriting

When retrieval is graded as irrelevant, ForgeAI automatically rewrites the semantic retrieval query.

Example:

```text
Original Question:

What is TMDB?
```

Initial retrieval may fail because the query is too vague.

ForgeAI can rewrite the retrieval query as:

```text
TMDB references, The Movie Database API integration,
movie metadata services, API clients, environment variables,
API endpoints, or external movie database usage in this repository.
```

The rewritten query is then used for another semantic retrieval attempt.

---

## 🧠 Original Intent vs Retrieval Query

ForgeAI maintains two separate query representations.

```text
question
↓
Immutable user intent

retrieval_query
↓
Mutable semantic search representation
```

Example:

```text
question:
"What is TMDB?"

retrieval_query:
"TMDB API integrations, movie metadata services,
API clients, environment variables, or endpoints"
```

The Self-RAG workflow can rewrite the retrieval query multiple times without modifying the user's original question.

The final answer always addresses the original user intent.

---

## ♻️ Bounded Self-Correction

Self-corrective workflows introduce cyclic execution paths.

Without a termination condition, the graph could execute indefinitely.

ForgeAI maintains a retry counter inside the graph state.

```text
Initial Retrieval
      ↓
retry_count = 0

Rewrite #1
      ↓
retry_count = 1

...

Rewrite #5
      ↓
retry_count = 5

Maximum Retries Reached
      ↓
Generate Safe Answer
```

The retry counter represents rewritten retrieval attempts rather than total retrieval operations.

This guarantees graph termination and controls LLM and embedding costs.

---

# 🏗️ System Architecture

```text
                    User
                      │
                      ▼
                 FastAPI API
                      │
                      ▼
                RepositoryService
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
 Local Repository              GitHub Repository
                                    │
                                    ▼
                              GitHub Cloner
        │                           │
        └─────────────┬─────────────┘
                      ▼
              Repository Scanner
                      │
                      ▼
               Repository Filter
                      │
                      ▼
                Document Loader
                      │
                      ▼
                 Text Splitter
                      │
                      ▼
              Embedding Provider
                      │
                      ▼
                   ChromaDB
                      │
                      ▼
              LangGraph Workflow
                      │
                      ▼
              Initialize Query
                      │
                      ▼
                  Retriever
                      │
                      ▼
              Retrieval Grader
                      │
             ┌────────┴────────┐
             │                 │
          Relevant         Irrelevant
             │                 │
             ▼                 ▼
      Answer Generator     Query Rewriter
             │                 │
             ▼                 │
            END        ────────┘
```

---

# 🧩 LangGraph State

ForgeAI uses a shared graph state to coordinate workflow execution.

```python
class ForgeState(MessagesState):

    repository_name: str

    question: str

    retrieval_query: str

    documents: list[Document]

    answer: str

    retrieval_grade: str

    retry_count: int
```

Each graph node reads the state fields it requires and writes its result back into the shared state.

Example state evolution:

```text
Input
↓
question
repository_name

Initialize
↓
retrieval_query
retry_count

Retrieve
↓
documents

Grade
↓
retrieval_grade

Rewrite
↓
retrieval_query updated
retry_count incremented

Generate
↓
answer
```

---

# 🧠 LangGraph Nodes

ForgeAI currently contains the following workflow nodes.

```text
Initialize Query
      │
      ▼
Retrieve Documents
      │
      ▼
Grade Retrieval
      │
      ├── Relevant → Generate Answer
      │
      └── Irrelevant → Rewrite Query
                             │
                             ▼
                      Retrieve Documents
```

### Initialize Query

Initializes internal graph execution state.

Responsibilities:

- copy the original question into the retrieval query
- initialize the retry counter

---

### Retrieve Documents

Performs semantic retrieval against the repository's ChromaDB collection.

The node searches using the mutable `retrieval_query`.

---

### Grade Retrieval

Evaluates whether the retrieved repository context is relevant to the original user question.

The node stores the decision in:

```text
retrieval_grade
```

---

### Rewrite Query

Rewrites failed semantic retrieval queries.

The node preserves the original user intent while attempting a different repository-oriented retrieval strategy.

---

### Generate Answer

Generates the final repository-grounded technical explanation.

The generator uses:

- original user question
- retrieved repository context

The answer is structured around:

- Purpose
- How It Works
- Design Reasoning
- Pipeline Position

---

# 💡 Example Questions

ForgeAI can answer repository-level engineering questions such as:

```text
How is the YouTube transcript generated?

How does RepositoryService use RepositoryScanner?

Why does EmbeddingModelProvider exist as a wrapper?

How does the retrieval pipeline work?

What happens after the repository is uploaded?

Which component creates the vector store?

How is conversation memory implemented?

Why is the embedding provider separated from ChromaDB?
```

ForgeAI retrieves relevant source code and explains both implementation and engineering reasoning.

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI |
| AI Framework | LangChain |
| Workflow Orchestration | LangGraph |
| Vector Database | ChromaDB |
| Embeddings | Ollama Embeddings |
| Embedding Model | embeddinggemma |
| LLM Integration | Configurable LLM Provider |
| Repository Integration | Git |
| Language | Python |

---

# 📁 Project Structure

```text
backend/
│
├── app/
│   │
│   ├── ai/
│   │   │
│   │   ├── embeddings/
│   │   │
│   │   ├── graph/
│   │   │   ├── edges/
│   │   │   ├── nodes/
│   │   │   ├── builder.py
│   │   │   └── state.py
│   │   │
│   │   ├── ingestion/
│   │   ├── llm/
│   │   ├── prompts/
│   │   ├── retrieval/
│   │   └── vectorstore/
│   │
│   ├── api/
│   │   └── routes/
│   │
│   ├── config/
│   │
│   ├── integrations/
│   │   └── github/
│   │
│   ├── services/
│   │
│   └── main.py
│
├── repositories/
│
└── tests/
```

---

# 🧠 Engineering Design Principles

ForgeAI is intentionally designed around production-oriented software engineering principles.

## Separation of Concerns

Each component has one responsibility.

```text
Scanner
→ discovers files

Filter
→ removes unwanted files

Loader
→ reads source code

Splitter
→ creates chunks

Embedding Provider
→ configures embedding model

Chroma Service
→ manages vector storage

Retriever
→ retrieves repository context

LangGraph
→ orchestrates workflow execution
```

---

## Dependency Isolation

External AI providers are wrapped behind provider classes.

Example:

```text
EmbeddingModelProvider
        │
        ▼
OllamaEmbeddings
```

The rest of the ingestion pipeline does not depend directly on Ollama.

This allows the embedding provider to be replaced without modifying downstream components.

---

## Explicit Workflow State

The LangGraph workflow stores execution data explicitly.

This makes the system:

- easier to debug
- easier to observe
- easier to extend
- suitable for cyclic AI workflows

---

## Deterministic Routing

LLMs generate decision signals.

Deterministic Python routing functions control graph execution.

```text
LLM Grader
↓
retrieval_grade

Router
↓
generate OR rewrite
```

This prevents workflow control logic from being hidden inside prompts.

---

## Bounded Agentic Loops

Every cyclic AI workflow must have a termination condition.

ForgeAI limits query rewrite attempts to five retries.

This prevents:

- infinite execution
- uncontrolled LLM calls
- unnecessary embedding queries
- unpredictable latency

---

# 🗺️ Development Roadmap

## Phase 1 — Repository Intelligence Layer

- [x] Repository scanning
- [x] Repository filtering
- [x] Document loading
- [x] Semantic chunking
- [x] Embedding generation
- [x] ChromaDB persistence
- [x] Repository-specific collections
- [x] Semantic retrieval
- [x] Repository-grounded answer generation
- [x] GitHub repository ingestion
- [x] Git pull support

---

## Phase 2 — Self-Corrective RAG

- [x] LangGraph state
- [x] Query initialization
- [x] Retrieval node
- [x] Retrieval grading
- [x] Conditional routing
- [x] Query rewriting
- [x] Retrieval retry loop
- [x] Retry guard
- [x] Safe graph termination

---

## Phase 3 — Software Engineering Intelligence

- [ ] Repository architecture analysis
- [ ] Component relationship reasoning
- [ ] Code flow tracing
- [ ] Debugging intelligence
- [ ] Engineering design analysis
- [ ] Interview-oriented explanations

---

## Phase 4 — Multi-Agent Engineering Mentor

- [ ] Architecture Agent
- [ ] Debugging Agent
- [ ] Code Review Agent
- [ ] Interview Agent
- [ ] Agent routing
- [ ] Shared repository context

---

## Phase 5 — Developer Experience

- [ ] Interactive frontend
- [ ] Repository dashboard
- [ ] Repository selection
- [ ] Conversation history
- [ ] Source navigation
- [ ] Graph execution visibility

---

# 🎯 Project Goal

ForgeAI is not designed to be another generic code chatbot.

The goal is to build an AI system that can:

```text
Understand a repository
        ↓
Retrieve implementation context
        ↓
Evaluate retrieval quality
        ↓
Self-correct failed retrieval
        ↓
Reason about software architecture
        ↓
Explain engineering decisions
        ↓
Mentor developers through real codebases
```

ForgeAI focuses on demonstrating production-oriented GenAI engineering concepts including:

- Retrieval-Augmented Generation
- Self-Corrective RAG
- LangGraph orchestration
- cyclic AI workflows
- semantic repository indexing
- vector database isolation
- query rewriting
- LLM-based grading
- deterministic routing
- bounded agentic execution

---

# 👨‍💻 Author

**Shlok Mishra**

Built as a production-oriented GenAI engineering project focused on repository intelligence, agentic workflows, and software engineering mentorship.
