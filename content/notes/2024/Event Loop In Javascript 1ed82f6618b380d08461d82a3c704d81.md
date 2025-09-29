---
title: Event Loop In Javascript
date: 2025-09-21
draft: false
tags:
  - javascript
  - event_loop
  - nodejs
---

# Event Loop In Javascript

Event Loop has four types of queue

1. Timer Queue
2. I/O Queue
3. Check Queue
4. Close Queue
5. MicroTask Queue

![Screenshot 2025-05-08 at 9.33.49 AM.png](Screenshot_2025-05-08_at_9.33.49_AM.png)

Execution Order Of Event Loop

![Screenshot 2025-05-08 at 9.39.49 AM.png](Screenshot_2025-05-08_at_9.39.49_AM.png)

![Screenshot 2025-05-08 at 9.41.09 AM.png](Screenshot_2025-05-08_at_9.41.09_AM.png)

## Check Queue

To queue a callback function inside the check queue we can use the setImmediate function