---
title: CPU Scheduling and process and thread
draft: false
tags:
  - operating_system
---
 
The rest of your content lives here. You can use **Markdown** here :)

Process scheduling is an important activity done by the process manager to remove the process from the CPU and schedule the next process, the process removal and dispatch are based on multiple factors like process completion, priority, I/O requirement, etc. Process scheduling plays an important role in Multiprogramming operating systems.

There are mainly three types of schedulers in operating systems, which are: Short-term schedulers, medium-term schedulers, and long-term schedulers. In this article, we are going to discuss about difference between these schedulers.

## Set of instruction in cpu

1. LOAD
2. ADD
3. COMPARE
4. STORE
5. JUMP IF
6. JUMP
7. IN 
8. OUT

There are two modes of program execution one is kernel mode and another one is user mode

if the program is running in the user mode then the program  does not have the direct access to the memory , if the program runs in the `kernal` mode then it has the direct access to the memory and the resources.

if the program runs in the kernel mode  if that program happens to crash during the execution then the whole system leads to crash or comes to the halt

## System Calls

when the program is running on the user mode , if it needs access to the memory or resources to complete that program for that instance it will shift to user mode from kernel mode this switching is called context switching