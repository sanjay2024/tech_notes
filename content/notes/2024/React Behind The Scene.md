---
title: React Behind The Scene
date: 2025-09-22
draft: true
tags:
  - react
  - front-end
---
## Why React ?

Great question! You're basically asking:

**If the real DOM initially has just a root `<div>` and React’s Virtual DOM tree is huge, won’t React have to do a huge number of DOM updates (reconciliation) on first load? If yes, then what’s the point of React’s virtual DOM and diffing?**

---

### Here's how it works and why React still shines:

---

### 1. **Initial Render: Yes, React does many DOM updates**

- When your React app first loads, the real DOM is basically empty except for the root container.
- React builds the Virtual DOM tree from your components.
- Since the real DOM is mostly empty, React **will create and insert all the elements** needed — so yes, lots of DOM operations on the initial load.
- This is **expected and unavoidable** because the page needs to show the UI.

**But this initial cost is a one-time thing!**

---

### 2. **After initial load, React shines with efficient updates**

- When your app state or props change, React generates a **new Virtual DOM tree** for the updated UI.
- React then **diffs** (compares) the new Virtual DOM with the previous one.
- **Only the differences (minimal changes) are applied to the real DOM.**

This is usually way fewer DOM operations than re-rendering everything from scratch.

---

### 3. **Why is this better than manipulating DOM directly?**

- DOM operations are **slow and expensive**, especially for large UI trees.
- Direct DOM manipulation often results in unnecessary updates.
- React batches updates and minimizes actual DOM changes via the Virtual DOM diffing algorithm.
- React abstracts away complex DOM manipulations, making development easier and less error-prone.

---

### 4. **Additional React performance tools**

- React supports **code splitting and lazy loading** so you don’t load the entire app upfront.
- You can use **React.memo**, **PureComponent**, **useMemo**, and **useCallback** to avoid unnecessary re-renders.
- React 18+ has **concurrent rendering** features that improve UI responsiveness.

---

### 5. **Summary**

| Stage | DOM Operations | React Virtual DOM Role |
| --- | --- | --- |
| Initial load | Many DOM insertions (building UI) | Builds Virtual DOM and renders UI once |
| Subsequent updates | Minimal DOM changes based on diff | Efficiently updates only what changed |

---

### TL;DR

- The initial render involves many DOM operations (unavoidable).
- Virtual DOM diffing *really* pays off during updates, drastically reducing DOM manipulations.
- React makes UI development easier, faster, and more maintainable over time.

REF: [https://medium.com/technogise/dom-manipulation-in-browser-59b793bee559](https://medium.com/technogise/dom-manipulation-in-browser-59b793bee559)