---
title: RAG and Vector Database
date: 2025-09-22
draft: true
tags:
  - AI
  - vector_database
  - RAG
---
# RAG and Vector Database

What is retrieval based model ?

retrieval based model is the computer science model where it evaluates the set of responses to the user query , the response is based on external knowledge such as newspaper, blogs.  Retrieval-based models are efficient at providing accurate, factual responses, but they can't produce original content.

### What is Candidate Selection?

**Candidate selection** is a key process in retrieval-based models where the system identifies and selects a subset of potential answers or responses from a larger pool (e.g., a database, document collection, or knowledge base) that are relevant to a given query or input. These selected candidates are then further processed, often ranked, and the best one is chosen as the final response.

### How Candidate Selection Works:

1. **Input Query:**
    - The user provides a query or asks a question.
2. **Searching the Database:**
    - The system searches through a large collection of possible responses, documents, or data entries to find those that are potentially relevant to the query.
3. **Selection of Candidates:**
    - Based on certain criteria (like keyword matching, semantic similarity, or other retrieval methods), the system selects a subset of the most relevant responses or data entries. These are the "candidates."
4. **Ranking or Scoring (optional):**
    - After selecting candidates, the system may rank or score them to determine which one is the best match for the query.
5. **Final Response:**
    - The top-ranked candidate is chosen as the final response or answer to the query.

### Example of Candidate Selection:

**Scenario:** Online Shopping Chatbot

Imagine you are interacting with an online shopping chatbot, and you ask, *"What are the available colors for the new iPhone?"*

1. **Input Query:**
    - Your question, *"What are the available colors for the new iPhone?"*, is received by the chatbot.
2. **Database Search:**
    - The chatbot has access to a large database containing product descriptions, specifications, FAQs, and customer reviews.
3. **Candidate Selection:**
    - The system uses keyword matching, semantic similarity, or other retrieval techniques to identify several relevant pieces of information from the database that might answer your question. For example:
        - Candidate 1: A product description listing colors for the iPhone.
        - Candidate 2: An FAQ entry that answers questions about iPhone colors.
        - Candidate 3: A customer review mentioning the colors available for the iPhone.
4. **Ranking or Scoring:**
    - The system ranks these candidates based on their relevance to your query. The product description directly listing the colors might be ranked highest.
5. **Final Response:**
    - The system selects the top-ranked candidate, which could be: *"The new iPhone is available in Black, White, Blue, and Red."* This response is presented to you by the chatbot.

### Importance of Candidate Selection:

- **Efficiency:** It reduces the number of potential answers from a large database to a manageable subset, making the system faster and more efficient.
- **Relevance:** By selecting only the most relevant candidates, the system increases the likelihood of providing an accurate and useful response.
- **Foundation for Ranking:** Candidate selection is often the first step before further refining and ranking the responses.

### Techniques for Candidate Selection:

1. **Keyword Matching:**
    - Simple but effective, it matches the keywords in the query with the keywords in the database entries.
2. **TF-IDF (Term Frequency-Inverse Document Frequency):**
    - A more sophisticated method that scores documents or responses based on how relevant specific terms are to the query.
3. **Dense Vector Search:**
    - Uses embeddings to capture the semantic meaning of the query and database entries, selecting candidates based on semantic similarity.
4. **BM25:**
    - A probabilistic information retrieval model that improves on TF-IDF, considering term frequency saturation and document length.

### Summary:

**Candidate selection** is a crucial step in retrieval-based systems, where a subset of potential answers or information is selected based on relevance to the input query. This process ensures that the system can quickly and accurately identify the best possible responses from a large database, making it a key component in applications like search engines, chatbots, and recommendation systems.