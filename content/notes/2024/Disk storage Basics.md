---
title: Disk storage Basics
date: 2025-09-21
draft: false
tags:
  - operating_system
  - storage
  - filesystem
---

Got it 👍 — let’s slow this down and walk through **how Unix file systems (like ext4) store data on disk** step by step with a **real-world example**.

---

### 🧩 1. Disk Basics

- Think of your hard disk (or SSD) as a **big grid of tiny storage boxes**.
- Each small box is called a **block** (commonly 4 KB).
- Blocks are the smallest unit of storage the file system works with.

📌 Example:

Imagine your disk is a notebook with 100 pages.

- Each page = **block** (can store 4 KB of data).
- The file system decides which page gets written to.

---

### 🧩 2. What happens when you create a file?

Suppose you create a file called `hello.txt` that contains:

```
Hello World!

```

That’s 12 bytes of data.

### Step 1: Inode is created

- Every file has an **inode** (like an ID card).
- The inode does **not store file data** itself — instead, it stores:
    - File size (12 bytes)
    - Owner (user ID)
    - Permissions (read/write/execute flags)
    - Timestamps (created/modified time)
    - Pointers (addresses of blocks where actual file content is stored)

Think of the inode as a **table of contents entry** for the file.

### Step 2: Blocks are allocated

- The file system finds a **free block** using the **block bitmap** (a big checklist where `0` = free, `1` = used).
- It writes `"Hello World!"` into that block.

📌 Example:

- Block 37 is free → allocate it.
- Inode of `hello.txt` now points to block 37.

---

### 🧩 3. Reading the file

When you type `cat hello.txt`:

1. OS looks up the **inode of `hello.txt`**.
2. Inode says: "Data is in block 37."
3. OS fetches block 37 from disk.
4. Returns `"Hello World!"` to you.

---

### 🧩 4. Bigger Files (multiple blocks)

Suppose you create a 20 KB file `big.txt`.

- Block size = 4 KB.
- File needs **5 blocks** (20 ÷ 4).

File system allocates blocks: 11, 12, 45, 46, 47.

- Inode stores pointers → [11, 12, 45, 46, 47].

When reading `big.txt`, OS uses inode to fetch those blocks in order.

---

### 🧩 5. Bitmap (tracking free/used blocks)

- The file system has a **bitmap** for the whole disk.
- Example:

```
Blocks:   0 1 2 3 4 5 6 7 8 9
Bitmap:   1 1 0 0 1 0 1 0 0 0

```

Here:

- `1` = used (allocated to some file)
- `0` = free (available for new files)

So, block 2, 3, 5, 7, 8, 9 are free.

---

✅ **Summary with analogy:**

- **Disk blocks** = notebook pages.
- **File data** = text written on those pages.
- **Inode** = table of contents entry for each file (says where the text is stored).
- **Bitmap** = checklist of which notebook pages are free/used.

![Screenshot 2025-09-18 at 2.41.33 PM.png](Screenshot_2025-09-18_at_2.41.33_PM.png)