---
title: Indexing in Depth
date: 2025-09-22
draft: true
tags:
  - database
  - backend
---

## 🧠 What is an Index?

An **index** is a **data structure** that helps a database **find data faster**, like an index in a book — instead of reading every page (row), it helps jump directly to the right spot.

Without an index → **full table scan**

With an index → **direct jump to rows**

---

## ⚙️ How Indexes Work (Internals)

### 🔍 **Common Data Structure: B-Tree (Balanced Tree)**

Most SQL databases (MySQL, PostgreSQL, etc.) use a **B-tree index**. MongoDB also uses **B-tree** for most indexes.

### How B-tree works:

- Maintains **sorted data**
- Allows **binary search**
- Keeps tree balanced so depth is low (fast lookups)
- Operations: O(log N) complexity

Example:

Imagine you have this table:

| id | name | age |
| --- | --- | --- |
| 1 | Alice | 28 |
| 2 | Bob | 35 |
| 3 | Charlie | 22 |
| 4 | Danielle | 28 |

If you create an index on `age`, the index structure would look like:

```
less
CopyEdit
       [22, 28, 35]
        /   |    \
      [3] [1,4] [2]

```

Now, a query like `WHERE age = 28` can directly go to [1,4].

---

## 📦 How Indexes Use Memory (Storage Cost)

Indexes consume **extra memory/disk space**, and here's how:

### 💾 SQL Index (B-Tree):

- Stored on disk (just like tables)
- Also cached in memory for faster access
- Each index stores:
    - Indexed column(s)
    - Row pointer (to locate full record)
- Compound indexes take more space

Example:

```sql
CREATE INDEX idx_age ON users(age);
```

This will store a B-tree of all `age` values + a pointer to each row.

### 📦 MongoDB Index:

- Stored in **WiredTiger cache**
- Each index entry holds:
    - Indexed field(s)
    - `_id` reference
- Use `db.collection.stats()` and `db.collection.getIndexes()` to see size

---

## ✅ Good Practices for Indexes

### 1. **Create Indexes on Fields Used in WHERE / JOIN / ORDER BY**

```sql

SELECT * FROM users WHERE age = 28;
-- Add index: CREATE INDEX idx_age ON users(age);
```

MongoDB:

```javascript
db.users.createIndex({ age: 1 })
```

### 2. **Use Composite Indexes for Multi-field Queries**

```sql
SELECT * FROM orders WHERE user_id = 10 AND created_at > '2024-01-01';
-- Index: (user_id, created_at)
```

Order matters! The index can only be used fully if the **left-most fields** are included in the query.

### 3. **Avoid Over-Indexing**

- Indexes slow down **writes** (insert, update, delete)
- Each index needs to be updated when a row changes
- More indexes = more disk & memory usage

### 4. **Use Covering Indexes**

If all the queried columns are in the index, the DB **doesn’t need to read the full row**.

```sql
SELECT name FROM users WHERE age = 30;
-- If you have index (age, name), DB doesn't touch the main table.
```

MongoDB equivalent:

```javascript
db.users.find({ age: 30 }, { name: 1, _id: 0 })
```

### 5. **Avoid Indexes on Low-Cardinality Columns**

Don’t index fields with few unique values (e.g., gender: M/F)

- Index won’t help much
- Selectivity is poor

---

## 🧪 Real-World Example: SQL vs MongoDB

### 👇 Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  city VARCHAR(100)
);
```

You run this:

```sql
SELECT * FROM users WHERE age = 30;
```

Without index: **full scan**

Add index:

```sql
CREATE INDEX idx_users_age ON users(age);
```

### In MongoDB:

```javascript
db.users.find({ age: 30 });
db.users.createIndex({ age: 1 });
```

Both now use B-tree to speed up search.

---

## 📈 Monitoring Index Usage

### ✅ SQL

- Use `EXPLAIN` or `EXPLAIN ANALYZE` to see if an index is used

```sql
EXPLAIN SELECT * FROM users WHERE age = 30;
```

### ✅ MongoDB

```javascript
db.users.find({ age: 30 }).explain("executionStats")
```

Look for:

- `IXSCAN`: index scan
- `COLLSCAN`: collection scan (bad for large data)

---

## 🔥 Final Tips

✅ Index your most-used queries

✅ Use compound indexes wisely

✅ Don't over-index (measure!)

✅ Monitor usage with EXPLAIN

✅ Drop unused indexes

✅ Cache + Index = 💨 blazing fast reads

✅ For big data, consider full-text, geo, hashed indexes as needed

---


## 📚 What is a B-Tree?

A **B-Tree (Balanced Tree)** is a **self-balancing search tree** that maintains sorted data and allows searches, insertions, and deletions in **logarithmic time (O(log n))**.

It is **not the same as a binary tree**. A B-Tree:

- Has multiple children per node (not just 2)
- Is always balanced (all leaf nodes at the same level)
- Designed for disk-based storage — minimizes disk reads

It’s the backbone of indexing in most databases (especially B+ Trees, a variant of B-Trees — explained later).

---

## 🧠 Why B-Tree?

Imagine you're indexing millions of records. Disk I/O is expensive, so B-Trees are designed to reduce the number of reads by:

- Having nodes with **many keys**
- Reducing the **height** of the tree (fewer jumps from root to leaf)

---

## 🌳 B-Tree Terminology

Let’s break it down:

- **Order (t)**: Minimum degree of the B-Tree
- A node has:
    - At most `2t - 1` keys
    - At least `t - 1` keys (except root)
    - At most `2t` children

Example: If `t = 3`, each node can have:

- 2 to 5 keys
- 3 to 6 children

---

## 🔍 B-Tree Example (Order 3)

Let’s insert numbers:

`[10, 20, 5, 6, 12, 30, 7, 17]`

### Step-by-Step Insertion:

1. Start empty → insert `10`
2. Add `20`, `5` → Node: `[5,10,20]`
3. Insert `6` → `[5,6,10,20]`
4. Insert `12` → `[5,6,10,12,20]` → Now it's full (`2t-1 = 5 keys`)

### 🔥 Split Happens:

Split middle key `10`.

New root becomes `10`.

Two children:

- Left: `[5,6]`
- Right: `[12,20]`

Now root = `10`

```
css
CopyEdit
        [10]
       /    \
 [5,6]      [12,20]

```

Keep going with `30`, `7`, `17`:

- `30` goes to `[12,20]` → `[12,20,30]`
- `7` goes to `[5,6]` → `[5,6,7]`
- `17` goes to `[12,20,30]` → `[12,17,20,30]`

Still balanced.

---

## 🔄 Insertion Logic (Pseudocode)

```java
java
CopyEdit
insert(key):
    if root is full:
        newRoot = createNode()
        newRoot.children[0] = root
        split(newRoot, 0)
        insertNonFull(newRoot, key)
    else:
        insertNonFull(root, key)

```

---

## 🛠️ Java Implementation (Simple Version)

Here’s a simplified B-Tree in Java for insertions:

### `BTreeNode.java`

```java
class BTreeNode {
    int[] keys;
    int t; // minimum degree
    BTreeNode[] children;
    int n;
    boolean isLeaf;

    public BTreeNode(int t, boolean isLeaf) {
        this.t = t;
        this.isLeaf = isLeaf;
        this.keys = new int[2 * t - 1];
        this.children = new BTreeNode[2 * t];
        this.n = 0;
    }

    public void insertNonFull(int key) {
        int i = n - 1;

        if (isLeaf) {
            while (i >= 0 && keys[i] > key) {
                keys[i + 1] = keys[i];
                i--;
            }
            keys[i + 1] = key;
            n++;
        } else {
            while (i >= 0 && keys[i] > key) {
                i--;
            }
            if (children[i + 1].n == 2 * t - 1) {
                splitChild(i + 1, children[i + 1]);
                if (keys[i + 1] < key)
                    i++;
            }
            children[i + 1].insertNonFull(key);
        }
    }

    public void splitChild(int i, BTreeNode y) {
        BTreeNode z = new BTreeNode(y.t, y.isLeaf);
        z.n = t - 1;

        for (int j = 0; j < t - 1; j++)
            z.keys[j] = y.keys[j + t];

        if (!y.isLeaf) {
            for (int j = 0; j < t; j++)
                z.children[j] = y.children[j + t];
        }

        y.n = t - 1;

        for (int j = n; j >= i + 1; j--)
            children[j + 1] = children[j];

        children[i + 1] = z;

        for (int j = n - 1; j >= i; j--)
            keys[j + 1] = keys[j];

        keys[i] = y.keys[t - 1];
        n++;
    }
}

```

### `BTree.java`

```java
public class BTree {
    BTreeNode root;
    int t;

    public BTree(int t) {
        this.root = null;
        this.t = t;
    }

    public void insert(int key) {
        if (root == null) {
            root = new BTreeNode(t, true);
            root.keys[0] = key;
            root.n = 1;
        } else {
            if (root.n == 2 * t - 1) {
                BTreeNode s = new BTreeNode(t, false);
                s.children[0] = root;
                s.splitChild(0, root);
                int i = 0;
                if (s.keys[0] < key)
                    i++;
                s.children[i].insertNonFull(key);
                root = s;
            } else {
                root.insertNonFull(key);
            }
        }
    }

    public void print() {
        printRecursive(root, 0);
    }

    private void printRecursive(BTreeNode node, int level) {
        if (node != null) {
            System.out.print("Level " + level + ": ");
            for (int i = 0; i < node.n; i++) {
                System.out.print(node.keys[i] + " ");
            }
            System.out.println();
            if (!node.isLeaf) {
                for (int i = 0; i <= node.n; i++) {
                    printRecursive(node.children[i], level + 1);
                }
            }
        }
    }
}

```

### 🧪 Test:

```java
public class Main {
    public static void main(String[] args) {
        BTree btree = new BTree(3);
        int[] data = {10, 20, 5, 6, 12, 30, 7, 17};
        for (int num : data)
            btree.insert(num);
        btree.print();
    }
}

```

---

## 🗃️ How B-Tree is Used in Databases

### ✅ In SQL (MySQL/PostgreSQL)

- **Primary indexes**: B-Tree on `PRIMARY KEY`
- **Secondary indexes**: B-Tree on any column
- For range queries: `WHERE age BETWEEN 10 AND 50`, B-Tree is ideal
- **B+ Tree** is used:
    - Leaf nodes store full data or row pointer
    - Leaves are linked for fast range scan

### ✅ In MongoDB

- Each index is a **B-Tree**
- Uses `WiredTiger` engine with compressed B-Tree indexes
- Supports **compound indexes** (multi-field)
- Use `db.collection.explain()` to see if B-Tree index is used

---

## 🔁 Updating Keys in B-Tree

- Search and update happens like binary search
- If you update a key that affects index order (e.g., `UPDATE age`), index might need to be **rebalanced**
- So updates in SQL/Mongo to indexed fields are **slower**

---

## 🧠 Summary

| Feature | B-Tree |
| --- | --- |
| Time Complexity | O(log n) |
| Used In | SQL, MongoDB (indexing) |
| Self-balancing | Yes |
| Good For | Equality + Range queries |
| Disk Optimized | Yes (minimize I/O) |
| Insertion/Update | May cause split/rebalance |

---

## Order (t): Minimum degree of the B-Tree what is minimum degree


## 🧮 What is the **Minimum Degree `t`** of a B-Tree?

In a **B-Tree**, the **minimum degree** `t` is a number that determines **how many keys and children** each node in the tree can have.

It's the core factor that controls:

- How *wide* the tree grows (number of keys per node)
- When the node **splits**
- How many children are **required** or **allowed**

---

### 📌 Based on `t`:

### 1. Each **node** (except root) must have:

- **At least `t - 1` keys**
- **At most `2t - 1` keys**

### 2. Each **internal node** (not a leaf) must have:

- **At least `t` children**
- **At most `2t` children**

### 3. The **root node**:

- Can have **as few as 1 key**

---

### 💡 Real-world example (t = 3):

| Property | Value |
| --- | --- |
| Minimum keys/node | `t - 1 = 2` |
| Maximum keys/node | `2t - 1 = 5` |
| Minimum children | `t = 3` |
| Maximum children | `2t = 6` |

This means every node (except root) will always have between **2 and 5 keys** and **3 to 6 children**.

---

### 🧠 Why is it called "minimum degree"?

Because `t` is the **minimum number of children** an internal (non-leaf, non-root) node must have.

In other words: the tree **won't be valid** if an internal node has fewer than `t` children.

---

### 🌳 Visualization

If `t = 2`, then:

```
java
CopyEdit
Max keys = 2t - 1 = 3
Min keys (non-root) = 1
Max children = 4

```

So a node can look like:

```
python-repl
CopyEdit
[10, 20]
 /   |   \
... ...  ...

```

---

### 📦 In practice:

- **Higher `t`** → wider tree, **fewer levels**, better for **disk access**
- DBs often choose **large `t`** (like 128 or more) to fit 1 node into 1 disk page or memory block

---

### ✅ Summary

| Term | Meaning |
| --- | --- |
| `t` | Minimum degree of the B-Tree |
| Max keys per node | `2t - 1` |
| Min keys per node | `t - 1` |
| Max children per node | `2t` |
| Min children per node | `t` (for non-root) |
| Root node exception | Can have fewer than `t` children |

---

Higher t → wider tree, fewer levels, better for disk access

DBs often choose large t (like 128 or more) to fit 1 node into 1 disk page or memory block i didn't understand explain it

---

## 🧠 First, Understand the Goal

When databases read from disk, they want to:

- Read **as little as possible**
- Get **as much data as possible** in each read

Because **disk reads are slow** (especially traditional spinning disks), we want to **minimize how many disk reads** (a.k.a. I/O operations) are needed to find a record.

---

## 💡 What is a "Disk Page" or "Memory Block"?

A **disk page** (or memory block) is a **fixed-size chunk of data** that a database reads or writes in one go from disk.

Typical sizes: **4KB**, **8KB**, etc.

So when a DB loads a page, it reads something like this into memory:

```
pgsql
CopyEdit
+------------------------+
| Disk Page (e.g., 4KB)  |
+------------------------+
| B-Tree node with keys  |
| and pointers to child  |
| nodes or data records  |
+------------------------+

```

We want to make sure that **each B-tree node fits entirely into one page**, to avoid reading multiple pages for one node.

---

## 🌳 How `t` relates to this

The B-tree node holds:

- `2t - 1` keys **(max)**
- `2t` pointers to children **(max)**

If `t` is small (e.g. 2), you can only store 3 keys and 4 pointers. That’s **wasting space in a 4KB page**!

But if `t` is large (say `t = 128`):

- Max keys = `2t - 1 = 255`
- Max pointers = `256`

Now the whole 4KB or 8KB page is filled with **lots of keys and pointers**, which means:

- **Each node can index hundreds of keys**
- **The tree becomes shallower** (fewer levels)
- You can reach any value with **fewer disk reads**

---

## 🔁 Visual Summary

| Degree `t` | Max Keys per Node | Tree Height | Disk Reads |
| --- | --- | --- | --- |
| 2 | 3 | High | More |
| 128 | 255 | Very low | Few |

So, **larger `t` = wider nodes = fewer tree levels = fewer disk page reads** to find your key.

---

## ✅ Real Database Example

In **MySQL (InnoDB)** or **PostgreSQL**, leaf and internal B+ tree nodes are often:

- Sized to **fit exactly one disk page** (e.g., 16KB)
- Carefully designed so that one node contains as many keys and child pointers as possible

This reduces disk I/O and speeds up query performance.

---

## 📦 Summary

- A **disk page** is the unit of disk I/O (like 4KB or 16KB)
- B-Trees are designed so **each node fits in one page**
- Choosing a **larger minimum degree `t`** makes each node hold **more keys and children**
- This keeps the tree **shallow** (less height)
- Which reduces the **number of disk reads**

---
