---
title: Indexes in mongodb
date: 2025-09-21
draft: false
tags:
  - mongodb
  - database
  - indexing
---

In `mongodb` indexes are used to speed up the query , suppose if your application depends some particular field and you making frequent querying in that document you can create index for that field 

## Types of Index

1. single field index
2. compound index

## Single field index

In single field index we can create a index for top level document and embedded document also.

## syntax for creating the single field index

`db.<collection>.createIndex( { <field>: <sortOrder> } )`

`db.student.createIndex(”name”:1);`

In the above query we are creating the index for the name field in student collection in ascending order 

suppose you want to create a index for the embedded field ,

`db.student.createIndex(”location.city”:1)`

## how to check if the query uses index

`db.<collection>.explain(”executionStats”)`

## `Optimize` the query performance

[https://www.mongodb.com/docs/manual/tutorial/optimize-query-performance-with-indexes-and-projections/#std-label-optimize-query-performance](https://www.mongodb.com/docs/manual/tutorial/optimize-query-performance-with-indexes-and-projections/#std-label-optimize-query-performance)

1. create index for the field which is frequently searched 
2. create compound index if your getting the document with multiple key
3. limit the number document 
4. use projection
5. use $hint to use the particular document 
6. user  $inc to increment the value in the server side
7. Query Selectivity

## Query Selectivity

[https://www.mongodb.com/docs/manual/core/query-optimization/#std-label-indexes-covered-queries](https://www.mongodb.com/docs/manual/core/query-optimization/#std-label-indexes-covered-queries)

For instance, the inequality operators [`$nin`](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) and [`$ne`](https://www.mongodb.com/docs/manual/reference/operator/query/ne/#mongodb-query-op.-ne) are *not* very selective since they often match a large portion of the index. As a result, in many cases, a [`$nin`](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) or [`$ne`](https://www.mongodb.com/docs/manual/reference/operator/query/ne/#mongodb-query-op.-ne) query with an index may perform no better than a [`$nin`](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) or [`$ne`](https://www.mongodb.com/docs/manual/reference/operator/query/ne/#mongodb-query-op.-ne) query that must scan all documents in a collection.

## covered query

Covered query is the query that can be `entierly`  using the index and `doesn't`  have to scan the other documents

When we say the query is covered ?

1. all the fields in the query are part of the index
2. all the fields returned in the results are in the same index
3. no fields in the query are  equal to null 

example :

```jsx
db.Collection.createIndex({name:1,email:1});

db.Collection.find({name:"sanjay"},{name:1,_id:0})

// this is the example for the covered query
```

## Compound Index

Compound index is used to create the index for the two or more fields , it is more helpful to make the query covered 

Syntax :
```
db.<collection>.createIndex( {
<field1>: <sortOrder>,
<field2>: <sortOrder>,
...
<fieldN>: <sortOrder>
} )
```

example :

```jsx
db.employes.creaetIndex({name:1,email:1})
```

## `usecase`

If your application repeatedly runs a query that contains multiple fields, you can create a compound index to improve performance for that query. For example, a grocery store manager often needs to look up inventory items by name and quantity to determine which items are low stock. You can create a compound index on both the `item` and `quantity` fields to improve query performance.

A compound index on commonly queried fields increases the chances of [covering](https://www.mongodb.com/docs/manual/core/query-optimization/#std-label-indexes-covered-queries) those queries. Covered queries are queries that can be satisfied entirely using an index, without examining any documents. This `optimizes` query performance.

## Limitation using Compound Index

1. Field Limit → 32 field per index
2. Field Order → The order of the indexed fields impacts the effectiveness of a compound index. Compound indexes contain references to documents according to the order of the fields in the index. To create efficient compound indexes, follow the [ESR (Equality, Sort, Range) rule.](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/#std-label-esr-indexing-rule)

### **Using Indexes to Sort Query Results**

**Indexes and Sorting:**

- MongoDB uses indexes to efficiently sort query results. If your query involves sorting on fields that are part of an index, MongoDB can quickly retrieve the results in the specified order.
- An index is a data structure that holds ordered records, so if your query's sort criteria match an index, MongoDB leverages this to avoid scanning and sorting all documents in the collection.

**Multiple Indexes:**

- If a query predicate (the condition specified in the query) uses the same fields as the sort criteria, MongoDB might use multiple indexes to support the sort operation.
- This means if your query both filters and sorts on indexed fields, MongoDB can optimize the operation using these indexes.

### **When Indexes Can't Be Used**

**Blocking Sort:**

- If MongoDB cannot use an index to obtain the sort order (for instance, if the sort field is not indexed), it must perform a blocking sort.
- A blocking sort involves consuming and processing all input documents to produce the sorted output. This operation needs to load all relevant documents into memory, sort them, and then return the results.
- Although the term "blocking" might suggest a stop to all operations, it does not block concurrent operations on the collection or database. It only means that the sort operation itself must complete before the results are returned.

### **Memory Usage and Disk Spilling**

**Memory Limits:**

- Starting with MongoDB 6.0, if a pipeline execution stage (like sorting) requires more than 100 megabytes (MB) of memory, MongoDB automatically writes temporary files to disk to handle the excess, unless you specify **`allowDiskUse: false`**.
- This is to prevent the system from running out of memory during complex or large sorting operations.

**Handling Large Memory Requirements:**

- If the server needs more than 100 MB of system memory for a blocking sort and you haven’t enabled disk use (via **`cursor.allowDiskUse()`**), MongoDB will return an error.
- The option **`allowDiskUse()`** allows the query to use disk storage to handle large data sets, preventing memory-related errors.

### **Example for Clarity**

Suppose you have a collection of users with fields **`name`** and **`age`**, and you want to sort the results by **`age`**.

1. **Using Index:**
    - If there's an index on **`age`** (e.g., **`db.users.createIndex({ age: 1 })`**), MongoDB uses this index to quickly sort the documents by **`age`**.
    - The query **`db.users.find().sort({ age: 1 })`** will be efficient as MongoDB leverages the **`age`** index.
2. **Without Index:**
    - If there's no index on **`age`**, MongoDB must perform a blocking sort.
    - For large collections, this could be memory-intensive. If the operation requires more than 100 MB of memory, MongoDB will spill to disk if **`allowDiskUse`** is enabled: **`db.users.find().sort({ age: 1 }).allowDiskUse()`**.
    - Without enabling disk use, and if the sort exceeds 100 MB of memory, the query will fail.

By understanding these concepts, you can better optimize your queries and indexing strategy to ensure efficient sorting and avoid memory-related issues in MongoDB.

# **Sort on Multiple Fields**

![](https://www.mongodb.com/docs/manual/assets/link.svg)

Create a [compound index](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/#std-label-index-type-compound) to support sorting on multiple fields.

You can specify a sort on all the keys of the index or on a subset; however, the sort keys must be listed in the *same order* as they appear in the index. For example, an index key pattern `{ a: 1, b: 1 }` can support a sort on `{ a: 1, b: 1 }` but *not* on `{ b: 1, a: 1 }`.

For a query to use a compound index for a sort, the specified sort direction for all keys in the [`cursor.sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) document must match the index key pattern *or* match the inverse of the index key pattern. For example, an index key pattern `{ a: 1, b: -1 }` can support a sort on `{ a: 1, b: -1 }` and `{ a: -1, b: 1 }` but **not** on `{ a: -1, b: -1 }` or `{a: 1, b: 1}`.

### **Sort and Index Prefix**

![](https://www.mongodb.com/docs/manual/assets/link.svg)

If the sort keys correspond to the index keys or an index *prefix*, MongoDB can use the index to sort the query results. A *prefix* of a compound index is a subset that consists of one or more keys at the start of the index key pattern.

For example, create a compound index on the `data` collection:

```jsx
db.data.createIndex( {a:1,b:1,c:1,d:1 } )
```

Then, the following are prefixes for that index:

```jsx
{a:1 }{a:1,b:1 }{a:1,b:1,c:1 }
```

The following query and sort operations use the index prefixes to sort the results. These operations do not need to sort the result set in memory.

| **Example** | **Index Prefix** |
| --- | --- |
| `db.data.find().sort( { a: 1 } )` | `{ a: 1 }` |
| `db.data.find().sort( { a: -1 } )` | `{ a: 1 }` |
| `db.data.find().sort( { a: 1, b: 1 } )` | `{ a: 1, b: 1 }` |
| `db.data.find().sort( { a: -1, b: -1 } )` | `{ a: 1, b: 1 }` |
| `db.data.find().sort( { a: 1, b: 1, c: 1 } )` | `{ a: 1, b: 1, c: 1 }` |
| `db.data.find( { a: { $gt: 4 } } ).sort( { a: 1, b: 1 } )` | `{ a: 1, b: 1 }` |

## Ensure Indexes Fit in the RAM

For the fastest processing, ensure that your indexes fit entirely in RAM so that the system can avoid reading the index from disk.

To check the size of your indexes, use the [`db.collection.totalIndexSize()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.totalIndexSize/#mongodb-method-db.collection.totalIndexSize) helper, which returns data in bytes:

```jsx
> db.collection.totalIndexSize()
4617080000
```

The above example shows an index size of almost 4.3 gigabytes. To ensure this index fits in RAM, you must not only have more than that much RAM available but also must have RAM available for the rest of the [working set](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-working-set). Also remember:

If you have and use multiple collections, you must consider the size of all indexes on all collections. The indexes and the working set must be able to fit in memory at the same time.