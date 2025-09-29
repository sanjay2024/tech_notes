---
title: React State Batching
date: 2025-09-22
draft: true
tags:
  - react
  - state
---

In react it will not update the immediately , instead it will batch the group of state updates and render only ones, but if the update is in the asynchronous block the those update will be updated separately

### 🔹 1. **Synchronous Updates Are Batched**

```jsx

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  const handleClick = () => {
    setCount(c => c + 1);
    setText("Updated");
    // Both updates above are batched => 1 re-render
  };

  return (
    <div>
      <p>{count}</p>
      <p>{text}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

```

✅ **What happens here?**

- `setCount` and `setText` are called **synchronously**.
- React **batches** them → **only 1 re-render**.

---

### 🔹 2. **Async Updates Are NOT Always Batched (React <18)**

```jsx

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  const handleClick = () => {
    setTimeout(() => {
      setCount(c => c + 1);
      setText("Updated");
      // These might cause 2 separate re-renders
    }, 1000);
  };

  return (
    <div>
      <p>{count}</p>
      <p>{text}</p>
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

```

⚠️ **Why two re-renders?**

- `setTimeout` is **asynchronous**, and React (prior to React 18) **doesn't batch** updates inside async callbacks.
- So:
    - `setCount` triggers render 1
    - `setText` triggers render 2

---

### 🔸 React 18 Fixes This with Automatic Batching

In **React 18**, automatic batching also works in async contexts like:

- `setTimeout`
- `Promise.then`
- `fetch`
- `event handlers`
- etc.

So in React 18+, the above async example **will be batched** → only **1 re-render**.

---

### 🧠 Summary

| Where Update Happens | Batched in React 17 | Batched in React 18 |
| --- | --- | --- |
| Event Handlers | ✅ Yes | ✅ Yes |
| setTimeout / setInterval | ❌ No | ✅ Yes |
| Promises (then/catch) | ❌ No | ✅ Yes |
| async/await | ❌ No | ✅ Yes |

---

### ✅ If you want to force batching manually:

In React 17, you can use:

```jsx

import { unstable_batchedUpdates } from 'react-dom';

setTimeout(() => {
  unstable_batchedUpdates(() => {
    setCount(c => c + 1);
    setText("Updated");
  });
}, 1000);

```

In React 18+, it's done automatically.

Reference: 

[https://medium.com/swlh/react-state-batch-update-b1b61bd28cd2](https://medium.com/swlh/react-state-batch-update-b1b61bd28cd2)