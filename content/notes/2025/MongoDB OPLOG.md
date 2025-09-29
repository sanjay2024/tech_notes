---
title: MongoDB OPLOG
draft: false
tags:
  - mongodb
  - database
---
 
The rest of your content lives here. You can use **Markdown** here :)
## 📌 What is Oplog?

- **Oplog** = **Operations Log**.
    
- Special **capped collection** in MongoDB that stores a rolling record of all **write operations** (insert, update, delete).
    
- Location: `local.oplog.rs` (for replica sets).
    
- Purpose: Used by **replication** → secondary nodes read from oplog to apply the same changes made on the primary.
    

---

## 🔹 Why is Oplog Important?

1. **Replication** → Keeps secondaries in sync with primary.
    
2. **Failover** → Secondary can take over if primary fails, with latest data.
    
3. **Event sourcing / Change Streams** → Applications can subscribe to oplog (via Change Streams) for real-time reactions.
    

---

## 🔹 Real World Example

**Food Delivery App (MongoDB backend):**

- Customer places an order → `insert` operation recorded in oplog.
    
- Primary writes the order, oplog entry is created:
    
    ```json
    { "ts": ..., "op": "i", "ns": "orders", "o": { "_id": 1, "item": "Pizza" } }
    ```
    
- Secondary nodes read the oplog entry and apply the same insert.
    
- ✅ Result → All replicas have the same "order" data.
    

---

## ⚡ Quick Interview Definition

> _The Oplog in MongoDB is a special log collection that records all write operations on the primary. Secondaries replay it to stay consistent, enabling replication and failover._