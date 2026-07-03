# ForgeAI

> **Production-Grade AI Software Engineering Mentor**
>
> ForgeAI is an AI-powered software engineering assistant that understands entire codebases using Retrieval-Augmented Generation (RAG). It enables developers to upload local or GitHub repositories and ask architecture, implementation, and design-related questions grounded in the actual source code.

---

## ✨ Current Features (v1.0 - Base RAG)

### 📂 Repository Ingestion

- Upload local repositories
- Clone public GitHub repositories
- Automatically update existing repositories (`git pull`)
- Recursive repository scanning
- Intelligent file filtering
- Metadata extraction

### 🧠 AI Pipeline

- Document loading
- Recursive text chunking
- Local embeddings using Ollama (`embeddinggemma`)
- ChromaDB vector storage
- Semantic similarity search
- Grounded RAG responses
- Source file citations

### 🏗 Clean Architecture

- Modular AI components
- Service-oriented architecture
- Separation of concerns
- Easily extensible pipeline

---

# System Architecture

```text
                Local Repository
                        │
                        │
                GitHub Repository
                        │
                GitHub Cloner
                        │
                        ▼
               Repository Service
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
 Repository Scanner             Repository Filter
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
     Retriever
        │
        ▼
 Document Formatter
        │
        ▼
     RAG Prompt
        │
        ▼
        LLM
        │
        ▼
     Final Answer
```

---

# Tech Stack

## Backend

- FastAPI
- Python

## AI

- LangChain
- Ollama
- ChromaDB

## Embeddings

- embeddinggemma

## Vector Database

- ChromaDB

## LLM

- Ollama

---

# Project Structure

```
backend/
│
├── app/
│   ├── ai/
│   │   ├── embeddings/
│   │   ├── ingestion/
│   │   ├── prompts/
│   │   ├── retrieval/
│   │   └── vectorstore/
│   │
│   ├── api/
│   ├── services/
│   ├── schemas/
│   ├── integrations/
│   └── config/
│
├── repositories/
├── chroma_db/
└── main.py
```

---

# Current Pipeline

### Repository Upload

```
Repository

↓

Scanner

↓

Filter

↓

Loader

↓

Chunking

↓

Embeddings

↓

ChromaDB
```

### Question Answering

```
Question

↓

Retriever

↓

Context Formatting

↓

Prompt

↓

LLM

↓

Grounded Answer
```

---

# Design Principles

ForgeAI follows several software engineering principles:

- Single Responsibility Principle
- Separation of Concerns
- Dependency Injection
- Modular AI Components
- Service Layer Architecture

---

# Example Questions

- Explain the architecture of this repository.
- What is the role of RepositoryScanner?
- How are embeddings generated?
- Trace the complete upload pipeline.
- Explain how QueryService works.
- Why was ChromaService designed separately?

---

# Roadmap

## ✅ Phase 1 — Base RAG

- [x] Local repository ingestion
- [x] GitHub repository ingestion
- [x] Semantic search
- [x] ChromaDB integration
- [x] Source citations

---

## 🚧 Phase 2 — Self-RAG (LangGraph)

- [ ] Retrieval grading
- [ ] Query rewriting
- [ ] Retrieval retry
- [ ] Hallucination reduction

---

## 🚧 Phase 3 — Specialized AI Agents

- [ ] Architecture Mentor
- [ ] Debugging Agent
- [ ] Refactoring Advisor
- [ ] Interview Coach
- [ ] Documentation Generator

---

## 🚧 Phase 4 — Production Features

- [ ] Multi-repository workspace
- [ ] Repository version awareness
- [ ] Incremental indexing
- [ ] Hybrid retrieval
- [ ] Reranking
- [ ] Streaming responses

---

# Why ForgeAI?

Most repository chatbots simply answer questions.

ForgeAI is designed to **teach software engineering**, explain architectural decisions, and help developers understand large codebases through grounded, explainable AI.

Rather than acting as another chatbot, ForgeAI is being built as a production-grade AI software engineering mentor.

---

# Status

**Version:** v1.0 — Base RAG

The repository currently supports complete repository ingestion, semantic search, and grounded question answering. The next milestone is implementing Self-RAG using LangGraph to improve retrieval quality through query rewriting and retrieval grading.