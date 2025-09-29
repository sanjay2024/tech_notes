---
title: Time Complexity Each Data Structure
date: 2025-09-21
draft: false
tags:
  - dsa
  - complexity
  - data_structures
---

NOTE: all the complexity of data structures

| Data Structure                 | Access (Best)    | Access (Worst) | Search (Best)         | Search (Worst) | Insert (Best)  | Insert (Worst)              | Delete (Best)    | Delete (Worst) |
| ------------------------------ | ---------------- | -------------- | --------------------- | -------------- | -------------- | --------------------------- | ---------------- | -------------- |
| **Array**                      | O(1)             | O(1)           | O(1) (if index known) | O(n)           | O(1) (end)     | O(n) (middle)               | O(1) (end)       | O(n) (middle)  |
| **Dynamic Array**              | O(1)             | O(1)           | O(1) (index)          | O(n)           | Amortized O(1) | O(n)                        | O(1) (end)       | O(n)           |
| **Singly Linked List**         | O(1) (head)      | O(n)           | O(1) (head)           | O(n)           | O(1)           | O(n) (with position search) | O(1) (head)      | O(n)           |
| **Doubly Linked List**         | O(1) (head/tail) | O(n)           | O(1) (head/tail)      | O(n)           | O(1)           | O(n)                        | O(1) (head/tail) | O(n)           |
| **Stack (array/list)**         | O(1)             | O(1)           | O(n)                  | O(n)           | O(1)           | O(1)                        | O(1)             | O(1)           |
| **Queue (linked list)**        | O(1)             | O(1)           | O(n)                  | O(n)           | O(1)           | O(1)                        | O(1)             | O(1)           |
| **Deque (double-ended queue)** | O(1)             | O(1)           | O(n)                  | O(n)           | O(1)           | O(1)                        | O(1)             | O(1)           |
| **Hash Table**                 | O(1)             | O(n)           | O(1)                  | O(n)           | O(1)           | O(n)                        | O(1)             | O(n)           |
| **Binary Search Tree (BST)**   | O(log n)         | O(n)           | O(log n)              | O(n)           | O(log n)       | O(n)                        | O(log n)         | O(n)           |
| **AVL Tree**                   | O(log n)         | O(log n)       | O(log n)              | O(log n)       | O(log n)       | O(log n)                    | O(log n)         | O(log n)       |
| **Red-Black Tree**             | O(log n)         | O(log n)       | O(log n)              | O(log n)       | O(log n)       | O(log n)                    | O(log n)         | O(log n)       |
| **B-Tree**                     | O(log n)         | O(log n)       | O(log n)              | O(log n)       | O(log n)       | O(log n)                    | O(log n)         | O(log n)       |
| **Trie (prefix tree)**         | O(m)             | O(m)           | O(m)                  | O(m)           | O(m)           | O(m)                        | O(m)             | O(m)           |
| **Heap (min/max)**             | O(1)             | O(1)           | O(n)                  | O(n)           | O(log n)       | O(log n)                    | O(log n)         | O(log n)       |
| **Graph (adjacency list)**     | —                | —              | O(V + E)              | O(V + E)       | O(1)           | O(1)                        | O(1)             | O(1)           |
| **Graph (adjacency matrix)**   | —                | —              | O(1)                  | O(1)           | O(1)           | O(1)                        | O(1)             | O(1)           |
- **n** = number of elements
    
- **m** = length of the key (for Tries)
    
- BST worst case is **O(n)** when unbalanced (like inserting sorted data without balancing).
    
- Hash table worst case **O(n)** happens when all keys collide into one bucket.
    
- AVL, Red-Black Trees, and B-Trees keep themselves balanced, so worst case is still **O(log n)**.