---
title: git
date: 2025-09-21
draft: false
tags:
  - git
  - version_control
---


## git commands

1. amend : git commit —amend   → it will make changes with the last commit message without creating another commit
2. force pull :  git pull -f origin <master>
3. aborting rebase :  git rebase —abort
4. stash apply command  :  git stash apply → to apply the latest stash
5. stash pop command :  git stash pop
6. stash command : git stash save “message ”
7. unset upstream :  git branch —unset-upstream
8. rebase command : git pull —rebase
9. git fetch with git merge and git pull
ref : [`https://www.linkedin.com/pulse/git-pull-fetch-understanding-differences-your-devops-guide/`](https://www.linkedin.com/pulse/git-pull-fetch-understanding-differences-your-devops-guide/)
10. git log → gives the commit history
11. Head → In Git, HEAD refers to **the currently checked-out branch's latest commit**.

## git error resolve

1. From github.com:klenty/klenty-client
 * branch                  master     -> FETCH_HEAD
fatal: Not possible to fast-forward, aborting
`solution :`
Here's what could be happening:

Local and Remote Branches Have Diverged: If you've made commits to your local branch that aren't in the remote master branch, Git can't perform a fast-forward merge because it would potentially overwrite your local changes.

Changes in Remote master Since Last Pull: Someone else might have pushed changes to the master branch since your last pull. This creates a divergence between your local master and the remote master.

    
    To resolve this, you have a few options:
    
    1. **Merge Changes**: Instead of using **`git pull`**, you could use **`git fetch`** to fetch the changes from the remote branch without merging them into your local branch immediately. Then, you can inspect the changes using **`git log origin/master`** and decide how to integrate them into your local branch, using **`git merge`** or **`git rebase`**.
    2. **Rebase Your Changes**: If you prefer a cleaner history, you could rebase your local changes on top of the remote **`master`**. This can be done with **`git pull --rebase`** or by manually rebasing with **`git rebase origin/master`**.
    3. **Force Update (Caution)**: If you're sure you want to discard your local changes and simply take the remote **`master`** as-is, you could force the update with **`git reset --hard origin/master`**. However, this will overwrite any local changes you've made.

## Rebasing

Rebasing in Git is a way to integrate changes from one branch into another by moving or "rebasing" the commits. This is different from a merge, which creates a new commit for the merge itself. Here's a step-by-step explanation of what rebasing does:

### Scenario

Imagine you have the following situation:

- Your local branch (`feature`) has diverged from the remote branch (`master`).
- The `master` branch has had new commits added to it, and you want to incorporate those changes into your `feature` branch.

### Current State

```scss
scssCopy code
A---B---C  master (remote)
     \
      D---E---F  feature (local)

```

### Rebase Process

1. **Move to the `feature` branch**:
    
    ```bash
    bashCopy code
    git checkout feature
    
    ```
    
2. **Start the rebase onto `master`**:
    
    ```bash
    bashCopy code
    git rebase master
    
    ```
    
    What happens now is:
    
    - Git will temporarily remove your `feature` branch commits (`D`, `E`, `F`).
    - It will then move the `feature` branch to the tip of the `master` branch (`C`).
    - Finally, it will reapply your commits (`D`, `E`, `F`) on top of `master`.

### Intermediate State

```css
cssCopy code
         D'---E'---F'  feature (rebased, not yet completed)
        /
A---B---C  master

```

- Commits `D`, `E`, `F` are replayed as `D'`, `E'`, `F'` on top of `C`.

### Resolving Conflicts

During the rebase process, if there are conflicts between your changes and the changes in `master`, Git will pause and ask you to resolve the conflicts. You resolve the conflicts and continue the rebase:

```bash
bashCopy code
# After resolving conflicts
git add <resolved files>
git rebase --continue

```

If you want to abort the rebase at any point, you can do:

```bash
bashCopy code
git rebase --abort

```

### Final State

After resolving any conflicts and completing the rebase, you have the following:

```css
cssCopy code
A---B---C---D'---E'---F'  master, feature

```

Your `feature` branch now contains all the commits from `master` followed by your changes, and it looks like your changes were made on top of the latest state of `master`.

### Benefits of Rebase

1. **Clean History**: Rebasing results in a linear, clean commit history, which is easier to follow and understand.
2. **Avoids Merge Commits**: Unlike merging, rebasing does not create an additional merge commit, keeping the history cleaner.

### Considerations

- **Local Only**: Rebase your local changes before pushing them to a shared branch. Rebasing changes history, so doing it on shared branches can confuse others working on the same branch.
- **Conflicts**: Rebasing might require more conflict resolution if there are significant changes between the branches.

In summary, rebasing helps to keep your commit history clean and linear by applying your changes on top of the latest changes from another branch. This can make it easier to understand the project history and integrate changes smoothly.

If you have a branch that was originally taken from `master`, and you want to update your branch with the latest changes from `master` before pushing your work, you can follow these steps:

### Steps to Update Your Branch with Latest Changes from Master

1. **Fetch the latest changes from the remote repository**:
    
    ```bash
    bashCopy code
    git fetch origin
    
    ```
    
2. **Switch to your branch (assuming it's called `feature-branch`)**:
    
    ```bash
    bashCopy code
    git checkout feature-branch
    
    ```
    
3. **Rebase your branch onto the updated `master`**:
    
    ```bash
    bashCopy code
    git rebase origin/master
    
    ```
    
    During the rebase process, Git will attempt to apply your changes on top of the latest `master` branch. If there are conflicts, Git will pause and prompt you to resolve them. Resolve any conflicts and continue the rebase:
    
    ```bash
    bashCopy code
    # After resolving conflicts
    git add <resolved files>
    git rebase --continue
    
    ```
    
    If you want to abort the rebase process at any point, you can use:
    
    ```bash
    bashCopy code
    git rebase --abort
    
    ```
    
4. **Push your updated branch to the remote repository**:
    
    ```bash
    bashCopy code
    git push origin feature-branch
    
    ```
    
    If you have previously pushed this branch and the rebase altered its history, you will need to force push the changes:
    
    ```bash
    bashCopy code
    git push --force-with-lease origin feature-branch
    
    ```
    
    The `--force-with-lease` option is safer than `--force` as it ensures you don’t overwrite any changes on the remote that you don’t know about.
    

### Summary of Commands

```bash
bashCopy code
git fetch origin
git checkout feature-branch
git rebase origin/master
# Resolve any conflicts, if necessary, then continue
git push origin feature-branch  # or `git push --force-with-lease origin feature-branch` if history was rewritten

```

### Important Notes

- **Rebasing vs. Merging**: Rebasing rewrites commit history, making it look like your changes were made on top of the latest `master`. Merging retains the original branch structure but adds a merge commit.
- **Conflict Resolution**: Be prepared to resolve conflicts during the rebase process if there are any changes in `master` that conflict with your work.
- **Force Push with Caution**: Only use `-force-with-lease` or `-force` if you understand the implications, as it can overwrite changes on the remote repository. `-force-with-lease` is generally safer.

By following these steps, you ensure that your branch is up-to-date with the latest changes from `master` before you push your work, maintaining a clean and consistent project history.

To revert the last commit, the method depends on whether the commit has been pushed to a remote repository or not. Here are the options:

---

### **1. If the Commit Has NOT Been Pushed**

Use the following commands:

### To undo the last commit but keep the changes in your working directory:

```bash

git reset --soft HEAD~1
```

- `-soft`: Keeps the changes in the staging area (you can commit them again or modify them).

### To undo the last commit and remove the changes entirely:

```bash
bash
CopyEdit
git reset --hard HEAD~1

```

- `-hard`: Completely discards the changes, and your working directory will match the previous commit.

---

### **2. If the Commit HAS Been Pushed**

Reverting a pushed commit requires extra care to avoid issues for others working on the same branch.

### Option A: Revert the Commit Safely

This creates a new commit that undoes the last commit:

```bash
bash
CopyEdit
git revert HEAD

```

- A revert commit is created, and it keeps the history intact.
- This is the **preferred option** if the branch has been shared.

### Option B: Force Reset (Risky, Avoid If Others Are Using the Branch)

If you still want to completely remove the commit from history:

```bash
bash
CopyEdit
git reset --hard HEAD~1
git push origin --force

```

- **Warning:** This rewrites history and may cause problems for others if they have already pulled the branch.

---

### **Summary:**

- Use `git reset` for local commits that haven't been pushed.
- Use `git revert` for pushed commits to keep history safe.
- Avoid `git push --force` unless absolutely necessary.

Let me know if you need help with a specific scenario!