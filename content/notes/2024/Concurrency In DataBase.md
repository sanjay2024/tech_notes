---
title: Concurrency In DataBase
date: 2025-09-22
draft: true
tags:
  - database
  - backend
---

"Locks are used to control access to shared resources among multiple threads. To handle this, we use synchronization in Java, either through the `synchronized` keyword or a synchronized block. The flow of execution inside a synchronized block is sequential, meaning that when multiple requests arise, each request accesses the resource one at a time."

Here `aries` problem this will be fine when handle it in single process because each process have their own memory 

so have two types of database locks 

1. shared lock , where the resource can be shared between the transaction for reading the data only , not other transcation can write those data until it is released from the transaction
2. exculsive lock or write lock