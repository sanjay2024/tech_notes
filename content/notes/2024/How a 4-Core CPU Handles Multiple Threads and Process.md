---
title: How a 4-Core CPU Handles Multiple Threads and Process
date: 2025-09-22
draft: true
tags:
  - os
  - operating_system
---

When you run 8 threads simultaneously on a 4-core processor while other processes are also running, here's what happens behind the scenes:

## **Fundamental Concepts**

1. **Physical Cores vs. Logical Threads**:
    - Your 4-core processor can truly execute 4 threads simultaneously (one per core)
    - Many modern CPUs support hyper-threading (2 threads per core), but we'll assume no hyper-threading for clarity
2. **Thread Scheduling**:
    - The OS scheduler decides which threads get CPU time
    - It rapidly switches between threads to create the illusion of parallel execution

## **What Happens with Your 8 Threads + Other Processes**

1. **Time Slicing (Preemptive Multitasking)**:
    - The OS divides CPU time into small slices (typically milliseconds)
    - Each core can only run one thread at a time
    - The scheduler rotates through your 8 threads and other processes' threads
2. **Context Switching**:
    - When switching threads, the CPU must:
        - Save the current thread's state (registers, program counter)
        - Load the next thread's state
    - This overhead reduces overall throughput
3. **Thread State Management**:
    - At any moment:
        - 4 threads are actually running (one per core)
        - Others are in various states (ready, waiting, etc.)
4. **Scheduling Algorithms**:
    - Modern OSes use complex algorithms like:
        - Completely Fair Scheduler (Linux)
        - Multilevel feedback queues (Windows)
    - These prioritize threads based on:
        - Process priority
        - I/O vs CPU-bound nature
        - Recent CPU usage

## **Key Factors Affecting Performance**

1. **Thread Types**:
    - CPU-bound threads (calculations) compete directly for cores
    - I/O-bound threads (waiting for disk/network) free up cores while waiting
2. **Cache Behavior**:
    - Frequent thread switching leads to cache misses
    - Threads working on the same data may benefit from cache locality
3. **Memory Bandwidth**:
    - All threads share the same memory bandwidth
    - Memory-intensive threads can create contention

## **Visual Representation**

Copy

Download

```
Core 1: [Thread A] → [Thread E] → [OS Thread] → [Thread C] → ...
Core 2: [Thread B] → [Thread F] → [Thread D] → [OS Thread] → ...
Core 3: [Thread C] → [Thread G] → [Thread A] → [Thread H] → ...
Core 4: [Thread D] → [Thread H] → [Thread B] → [Thread E] → ...
```

## **Optimization Techniques the OS Uses**

1. **Processor Affinity**: Trying to keep threads on the same core to benefit from cache
2. **Load Balancing**: Distributing threads evenly across cores
3. **Priority Inversion Prevention**: Ensuring high-priority threads don't get starved

## **Practical Implications**

- Having more threads than cores doesn't necessarily improve performance
- Ideal thread count depends on:
    - Your workload characteristics (CPU-bound vs I/O-bound)
    - Other system activity
    - Memory/cache usage patterns

This is why in practice, thread pools are often sized to the number of available cores (or slightly more for I/O-bound tasks).