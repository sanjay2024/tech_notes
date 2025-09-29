---
title: Database
date: 2025-09-21
draft: false
tags:
  - database
  - graph_database
  - vector_database
---

## What is graph database ?

Databases that store data in a graph structure are called **graph databases**. These databases represent data in the form of nodes, edges, and properties, reflecting the relationships between entities naturally and intuitively. Some of the most well-known graph databases include **Neo4j**, **Amazon Neptune**, **ArangoDB**, **OrientDB**, and **Microsoft Azure Cosmos DB** (with a Gremlin API).

### 1. **How Graph Databases Store Data**

Graph databases store data in two main components:

- **Nodes (Vertices):** Represent entities or objects, such as people, products, or concepts. Each node can have properties (key-value pairs) that describe the attributes of that entity.
- **Edges (Relationships):** Represent the connections between nodes. Edges also can have properties that describe the relationship, such as the type of relationship, its strength, or other relevant data.

For example, in a social network graph:

- Nodes could represent people.
- Edges could represent friendships between people.
- Properties of nodes could include names, ages, and locations.
- Properties of edges could include the date when the friendship was established.

### 2. **How Data is Stored Internally**

- **Nodes and Relationships:** Both nodes and edges are stored as distinct records in a graph database. Each node has a unique identifier, and each edge connects two node identifiers. The relationships are stored alongside the nodes they connect, allowing quick traversal from one node to another.
- **Indexes:** While graph databases emphasize relationships, they often still use traditional indexing mechanisms to quickly find starting points for graph traversals. For example, Neo4j uses B-trees to index node properties or relationships for efficient querying.
- **Storage Formats:** Some graph databases store data in an adjacency list format (like Neo4j), where each node stores references (pointers) to its neighboring nodes. Others might use adjacency matrices or more specialized storage engines optimized for graph traversal.

### 3. **How Graph Databases Work**

Graph databases excel at queries that involve traversing relationships, such as finding the shortest path between two nodes, exploring friends of friends in a social network, or recommending products based on user behavior. Here's how they work:

- **Query Language:** Graph databases typically use graph-specific query languages. For example:
    - **Cypher** (used by Neo4j): A declarative query language that makes it easy to express complex graph queries.
    - **Gremlin** (used by Apache TinkerPop and Amazon Neptune): A graph traversal language that can be used across different graph databases.
    - **SPARQL** (used in RDF stores like Virtuoso): A query language for querying RDF (Resource Description Framework) data.
- **Traversal:** The core operation in graph databases is traversal. Given a starting node, the database follows edges to other connected nodes. Traversal can be breadth-first or depth-first, depending on the query. The traversal process is highly optimized in graph databases, enabling complex queries to be executed efficiently.
- **Query Execution:** When a graph query is executed, the database follows the relationships between nodes as specified in the query. Since relationships are first-class citizens in a graph database, these traversals are typically very fast, even with deep and complex relationships.

### 4. **Example: Neo4j**

In **Neo4j**, one of the most popular graph databases:

- **Data Model:** Data is stored in a labeled property graph model, where nodes have labels (e.g., `Person`, `Product`), and edges have types (e.g., `FRIEND`, `PURCHASED`).
- **Storage:** Neo4j uses a native graph storage engine that stores nodes and edges in a way optimized for rapid traversal. Each node stores pointers to its adjacent nodes, and relationships are stored with direct references to the nodes they connect.
- **Querying:** You use the Cypher query language to interact with the graph. For example, to find all friends of a person named "Alice," you might write:
    
    ```
    cypherCopy code
    MATCH (alice:Person {name: 'Alice'})-[:FRIEND]->(friend)
    RETURN friend.name;
    
    ```
    

This query tells Neo4j to start at the node labeled `Person` with the name "Alice", follow the `FRIEND` relationships, and return the names of the connected nodes.

### 5. **Use Cases for Graph Databases**

- **Social Networks:** `Modeling` and querying relationships between people, such as friendships, followers, or influencers.
- **Recommendation Systems:** Finding products or content similar to what a user has already interacted with.
- **Fraud Detection:** `Analyzing` connections between entities to identify suspicious patterns, like unusual links between accounts.
- **Knowledge Graphs:** Structuring and querying interconnected data, such as in Google's Knowledge Graph.

### Summary

**Graph databases** are designed to store and query data that is rich in relationships, like social networks, recommendation systems, and more. They represent data using nodes (entities) and edges (relationships) and use `specialized` storage formats and query languages to efficiently handle complex queries involving multiple relationships. By treating relationships as first-class citizens, graph databases provide a powerful tool for any application where relationships are central to the data model.

## What is the vector database ?

## Characteristics of vector database

1. vector
2. embedding

Vector is a array of numerical values that represents the different forms of data such as images, text , videos etc. where embedding is the multidimensional space to represent the large data sets such as LLM 

## Use Case

1. NLP (Natural Language Processing) → ChatBot
2. Video And Audio Recognition 
3. Search → recommendation engine