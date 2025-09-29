---
title: Vector database
draft: false
tags:
  - database
  - vector_database
  - genai
---
 
The rest of your content lives here. You can use **Markdown** here :)
# 📌 Vector Embeddings & Vector Databases

## 1. What is a Vector Embedding?

- Embeddings = a way to represent **data (text, image, audio, video, code, etc.)** in numbers so that computers can understand and compare them.
- An embedding is just a **list of numbers (a vector)**.
- These numbers capture the **meaning or features** of the data.

👉 **Example with text**  
- Word "cat" → `[0.23, -0.91, 0.65, …]` (vector in 512 or 1536 dimensions)  
- Word "dog" → `[0.25, -0.88, 0.61, …]`  
- Word "car" → `[0.92, 0.11, -0.45, …]`  

Here, the vectors for **cat and dog are closer** (because they are both animals) than cat and car.

👉 **Example with images**  
- A picture of a cat → `[0.12, 0.99, -0.34, …]`  
- Another picture of a different cat → `[0.10, 1.01, -0.32, …]`  

These two are close in vector space, even if the images are not pixel-to-pixel identical.

📌 **In short**:  
**Embeddings = numerical representation of meaning/essence of data.**

---

## 2. What is a Vector Database?

- A **vector database** is a database specialized in **storing embeddings** and **searching them efficiently**.  
- Normal databases (SQL, MongoDB) are good at searching **exact values** (`WHERE name = 'John'`).  
- But embeddings are **high-dimensional vectors** (512, 1024, 4096 dimensions).

### Core Operation → Similarity Search (Nearest Neighbor Search)
- "Find me the 10 most similar vectors to this query vector."
- Uses **mathematical distance**:
  - Cosine similarity  
  - Euclidean distance  
  - Dot product  

👉 **Example**:  
- Query: "cute small animal with fur" → converted into embedding.  
- DB finds closest vectors → returns **cat, dog, rabbit** instead of keyword matches.

### Popular Vector Databases
- **Pinecone**
- **Weaviate**
- **Milvus**
- **Qdrant**
- **Postgres + pgvector extension**

---

## 3. Why Not Normal Database?

### 🟢 Traditional DB
- Good for **structured data** (IDs, names, emails, numbers).  
- Supports **exact match** or **filtering** (`age > 25`).  
- ❌ Bad at **semantic similarity**.  

👉 Example:  
Search "automobile" → SQL DB won’t return "car" unless explicitly stored.

### 🟢 Vector DB
- Good for **unstructured data** (text, images, audio).  
- Supports **semantic similarity search**.  
- Handles **high-dimensional vectors**.  
- Uses **HNSW (Hierarchical Navigable Small World graphs)** for fast nearest-neighbor search.  

👉 Example:  
Search "automobile" → Vector DB finds "car", "vehicle", "SUV" because embeddings are close in meaning.

---

## 4. Examples & Use Cases

🔹 **Example 1: Semantic Search (Text)**  
- Normal DB: Search "AI developer" → Returns only exact matches.  
- Vector DB: Returns **"Machine learning engineer", "Data scientist", "NLP expert"**.  

🔹 **Example 2: Chatbot / RAG (Retrieval-Augmented Generation)**  
- Store company docs as embeddings in Vector DB.  
- User: "What’s our refund policy?"  
- Query → Embed → Search DB → Retrieve relevant passages → Feed to LLM → Answer generated.  

🔹 **Example 3: Image Search**  
- Upload dog picture → Vectorize → Search → Returns **similar dogs** (even with different filenames).  

🔹 **Example 4: Recommendation Engine**  
- Netflix: Movie embeddings → Recommend **similar movies**.  
- Spotify: Song embeddings → Recommend **similar sounding songs**.  

---

## 🔑 Summary

- **Vector Embedding** = numerical representation of meaning.  
- **Vector Database** = specialized DB for embeddings & similarity search.  
- **Why not normal DB?** → Can’t handle high-dimensional semantic similarity.  
- **Use Cases** → Search, Recommendation, Chatbots (RAG), Image/Audio search.  
