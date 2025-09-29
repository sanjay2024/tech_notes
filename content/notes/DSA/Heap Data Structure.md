---
title: Heap Data Structure
date: 2025-09-21
draft: false
tags:
  - dsa
  - heap
  - data_structures
---

## **What is a Heap?**

- **Binary Heap** (most common):
    
    - **Complete binary tree** → all levels are full except possibly the last, which is filled from left to right.
        
    - **Heap property**:
        
        - **Min Heap** → parent ≤ children (smallest element at the root; same property holds for all subtrees).
            
        - **Max Heap** → parent ≥ children (largest element at the root; same property holds for all subtrees).
            
- Usually implemented using **arrays**, not pointers.
    

---

## **Representation of a Heap**

A binary heap can be represented using an array:

- Parent node index: `ceil(i/2) - 1`
    
- Left child index: `(2 * i) + 1`
    
- Right child index: `(2 * i) + 2`
    
- Range of leaf node indices: `n/2` to `n - 1`
    
- Range of internal node indices: `0` to `(n/2) - 1`
    

---

## **Tree Formula for a Complete Binary Tree**

In a complete binary tree:

- All nodes are completely filled up to the second last level.
    
- In the last level, the leaf nodes are filled from left to right.
    

Formulas:

1. The total number of `nodes` at level `l` is `2^l`.
    
2. The total number of nodes in the entire tree is `2^(l+1) - 1`.
    

---

## **Heapify**

Heapify is the process of rearranging nodes by checking the left and right children recursively to ensure the heap property is maintained.

**Important points:**

1. If you want to apply heapify to the element at index `i`, the left and right subtrees of that element must already satisfy the heap property. Otherwise, you should not perform the heapify operation yet.
    
2. Start heapifying from the leaf nodes upward. Leaf nodes always satisfy the heap property because they have no children.

# Heapify Time Complexity

## 1. Heapify a Single Node
- `heapify(node)` (also called **sift-down**) compares a node with its children.  
- If the heap property is violated, it swaps with the correct child and continues down.  
- Worst case: the node travels all the way down to a leaf.  

👉 Height of a binary heap = `log n`  
👉 **Time Complexity (single heapify)** = **O(log n)**  

---

## 2. Build Heap from an Array
To build a heap from an unsorted array:
1. Start from the last non-leaf node (index = ⌊n/2⌋).  
2. Call `heapify()` on each node going upward to the root.  

Naive thinking:
- `n/2` nodes × `O(log n)` each = **O(n log n)**  

But the **actual complexity is O(n)**.  

---

## 3. Why Build Heap is O(n)

### Distribution of Nodes by Height
In a complete binary tree:

- About `n/2` nodes are **leaves** (height = 0).  
- About `n/4` nodes are one level above leaves (height = 1).  
- About `n/8` nodes are at height 2.  
- … and so on.  

General formula:

$$
\text{Nodes at height } h \approx \frac{n}{2^{h+1}}
$$

---

### Cost of Heapifying a Node
- A leaf → cost = 0.  
- One level above leaves → cost ≤ 1.  
- Height 2 → cost ≤ 2.  
- Root (height log n) → cost ≤ log n.  

So in general:

$$
\text{Cost per node at height } h \leq h
$$

---

## 4. Total Work (Summation)

The total cost of building the heap is:

$$
T(n) \leq \sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot h
$$

Factor out `n`:

$$
T(n) \leq n \cdot \sum_{h=0}^{\log n} \frac{h}{2^{h+1}}
$$

---

## 5. Constant Series

It can be shown that:

$$
\sum_{h=0}^{\infty} \frac{h}{2^{h+1}} = 1
$$

So:

$$
T(n) \leq n \times 1 = O(n)
$$

---

## ✅ Final Results
- **Heapify (one node):** O(log n)  
- **Build Heap (entire array):** O(n)  

---

## 🔑 Intuition
- Most nodes are near the bottom → cheap to heapify.  
- Only a few nodes near the top are expensive.  
- Combined effect = **linear work**.
