---
title: Before desing a schema
date: 2025-09-22
draft: true
tags:
  - database
  - backend
  - system_design
---

Designing a **database schema** (especially for scalable systems) is one of the most important low-level design skills for backend engineers. Here's a full breakdown to help you get better at this — structured for someone like you with 1 year of SDE experience and wanting to level up.

---

## 🚀 1. **How to Start Schema Design**

### Step 1: **Understand the Requirements**

Ask questions like:

- What is the product doing?
- What are the main entities involved?
- What is the expected usage pattern? (Reads heavy? Writes heavy?)

🧠 *Example*: You're building a blog — you might need: `User`, `Post`, `Comment`, `Tag`.

---

### Step 2: **Identify Entities and Relationships**

Use your feature breakdown to list entities (tables) and how they relate to each other.

- One-to-one (1:1)
- One-to-many (1:N)
- Many-to-many (M:N)

✍️ *Example*:

- A user can have many posts → 1:N
- A post can have many tags and a tag can belong to many posts → M:N (needs join table)

---

### Step 3: **Define Attributes of Each Entity**

Each table should have:

- A primary key (e.g., `id`)
- Business data fields (e.g., `title`, `created_at`)
- Foreign keys (to represent relationships)

---

### Step 4: **Normalize (to avoid redundancy)**

✅ Follow **normalization rules**:

- 1NF: Atomic values only
- 2NF: No partial dependencies
- 3NF: No transitive dependencies

But don't overdo normalization — sometimes **denormalization** improves performance for high-read systems.

---

## 🧰 2. **Best Practices for Schema Design**

### ✅ Use Proper Data Types

- Use `INT` or `BIGINT` for IDs
- Use `VARCHAR` with limits for strings
- Use `BOOLEAN`, `DATE`, `TIMESTAMP` where appropriate

### ✅ Index Smartly

- **Primary keys** are automatically indexed
- Add indexes on frequently filtered or joined columns
- Avoid indexing low-cardinality fields (like booleans)

### ✅ Use Foreign Keys (But Be Smart)

- Enforce data integrity with foreign keys
- But in **distributed systems or very high-scale apps**, foreign keys might be dropped in favor of app-level constraints

### ✅ Track `created_at`, `updated_at` in all tables

---

### ✅ Use UUIDs When Needed

- Good for public-facing IDs or across distributed services
- But `UUID` has indexing drawbacks vs `INT`

---

### ✅ Design for Scale

Ask:

- Will this table have millions of rows?
- Will this query be slow on scale?

Techniques:

- Partitioning (shard or range-based)
- Caching
- Read replicas

---

## 🧪 3. Things to Check for an Efficient Schema

| Factor | Checklist |
| --- | --- |
| **Query patterns** | Are common queries optimized? (Look at EXPLAIN plans) |
| **Joins** | Are joins minimal and efficient? |
| **Indexes** | Are indexes in place for WHERE, ORDER BY, JOIN? |
| **Redundancy** | Any data duplicated unnecessarily? |
| **Growth** | Will this schema work with 100x more data? |
| **Flexibility** | Can I add a new field or feature without breaking things? |

---

## 💡 Tips for Thinking Like a Scalable System Designer

- Prefer **eventual consistency** where strict ACID isn't needed (e.g., likes count)
- Cache derived data (e.g., post_count on user)
- Use separate tables for analytics or logs (avoid bloating main tables)
- Have **audit trails** or soft deletes for critical data

---

## 🧠 Example: Blog Schema (Simplified)

```sql
sql
CopyEdit
-- User
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post
CREATE TABLE posts (
  id BIGINT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(200),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comment
CREATE TABLE comments (
  id BIGINT PRIMARY KEY,
  post_id BIGINT,
  user_id BIGINT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tags and many-to-many relation
CREATE TABLE tags (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);

CREATE TABLE post_tags (
  post_id BIGINT,
  tag_id BIGINT,
  PRIMARY KEY(post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

```

---

## 📚 What to Learn Next (Deep Dives)

1. **Normalization vs Denormalization**
2. **Indexing strategies**
3. **Sharding and partitioning**
4. **NoSQL schema design** (MongoDB, Cassandra, etc.)
5. **Caching (Redis) + Database** patterns

Great — let’s now talk about **NoSQL schema design**, which is very different from relational (SQL) schema design. NoSQL is **not about normalization**; instead, it's about **optimizing for read/write access patterns**, **scalability**, and **flexibility**.

---

## 📦 NoSQL: Types and Focus

| Type | Example DBs | Ideal For |
| --- | --- | --- |
| **Document** | MongoDB, Couchbase | Flexible, nested data (like JSON/APIs) |
| **Key-Value** | Redis, DynamoDB | Simple lookups, caching, sessions |
| **Columnar** | Cassandra, HBase | Massive scale, time-series, IoT |
| **Graph** | Neo4j, ArangoDB | Relationships (social, network graphs) |

We'll focus mainly on **Document DB (MongoDB)** since it's most widely used.

---

## 🧠 Key Principles for NoSQL Schema Design

### 1. **Design Based on Access Patterns**

This is the golden rule in NoSQL:

> "Model your schema based on how you query, not how you store."
> 

Unlike SQL, where normalization is key, here you may duplicate data to avoid joins.

---

### 2. **Embed vs Reference**

- **Embed**: Put nested data inside a single document.
- **Reference**: Use separate documents and link by ID.

🧠 **Embed when**:

- The data is mostly read together.
- It doesn't grow too large (MongoDB has 16MB document limit).
- It avoids extra queries.

🧠 **Reference when**:

- The data is accessed separately.
- The data grows unbounded (like a blog post with 1M comments).
- Multiple entities reuse the same data (e.g., user profile).

---

## 💡 Real Example: Blog App in MongoDB

### Embedded Design (simplified):

```jsx
js
CopyEdit
{
  _id: "post1",
  title: "How NoSQL Works",
  author: {
    id: "user1",
    name: "Sanjay"
  },
  tags: ["database", "nosql"],
  comments: [
    {
      id: "c1",
      user: "user2",
      text: "Great post!",
      created_at: "2025-08-01"
    },
    ...
  ],
  created_at: "2025-08-01"
}

```

### When to reference comments separately:

```jsx
js
CopyEdit
{
  _id: "comment1",
  post_id: "post1",
  user_id: "user2",
  text: "Great post!",
  created_at: "2025-08-01"
}

```

---

## ✅ Best Practices for NoSQL Schema Design

### 🔁 1. **Know Your Access Patterns**

Write out sample queries first — that drives your schema!

### 📚 2. **Avoid Complex Joins**

MongoDB doesn't do joins like SQL — you should **denormalize** instead.

### 🧩 3. **Think in Aggregations**

Use MongoDB’s `$aggregate`, `$match`, `$group`, etc., to build smart pipelines.

### 📏 4. **Control Document Size**

Avoid deeply nested or unbounded arrays. Keep under 16MB/document in MongoDB.

### 🚀 5. **Use Indexes Wisely**

- Always index your `_id` (default).
- Index frequently queried fields.
- Compound indexes for multi-field filters.

### 🔥 6. **Be OK With Duplication**

Data duplication is fine if:

- It improves read performance.
- You have a plan for keeping copies in sync (or it’s acceptable stale data).

---

## 🚦 When Not to Use NoSQL

- When strong ACID transactions are essential (e.g., banking)
- When many complex relationships and joins are needed
- When schema validation is critical

---

## ⚒️ Tools & Learning Resources

- [MongoDB Schema Design Patterns (official)](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)
- Learn about `$lookup`, `$group`, `$project` in MongoDB aggregation
- Practice with MongoDB Atlas or Docker locally
