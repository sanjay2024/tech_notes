---
title: Example Title
draft: false
tags:
  - git
  - github
---
 
The rest of your content lives here. You can use **Markdown** here :)
# Git Branching – Hotfix & Fast-Forward Merge

## 📌 Starting Point

We begin with a simple repository and a `main` branch:

`A --- B --- C   (main)`

- Commits: `A`, `B`, `C`
    
- `HEAD` is at commit `C`
    

---

## 🔧 Step 1: Create a `hotfix` Branch

`git checkout -b hotfix`

Both `main` and `hotfix` point to commit `C`:

`A --- B --- C   (main, hotfix)`

---

## 🔨 Step 2: Make a Commit on `hotfix`

`# make code changes git commit -am "Fix critical bug"`

Now history looks like:

`A --- B --- C   (main)              \               D   (hotfix)`

---

## 🔄 Step 3: Merge `hotfix` Back into `main`

`git checkout main git merge hotfix`

Since `main` is directly behind `hotfix`, Git **fast-forwards** `main` to commit `D`:

`A --- B --- C --- D   (main, hotfix)`

👉 **Fast-forward merge:** No new commit is created, Git just moves the branch pointer forward.

---

## 🧹 Step 4: Delete the `hotfix` Branch (Optional)

`git branch -d hotfix`

Now only `main` exists:

`A --- B --- C --- D   (main)`

---

## ❌ When Fast-Forward is NOT Possible

If new commits are added on `main` while `hotfix` is in progress:

`A --- B --- C --- E   (main)              \               D   (hotfix)`

Merging requires a **merge commit**:

`A --- B --- C --- E ------ F   (main)              \              /               D   (hotfix)`

- `F` is the **merge commit** combining work from `hotfix` (`D`) and `main` (`E`).
    

---

## ✅ Summary

- **Fast-forward merge**: Pointer moves forward, no new commit.
    
- **Merge commit**: Needed if branches diverged.

## Reference Link:
https://git-scm.com/book/ms/v2/Git-Branching-Rebasing