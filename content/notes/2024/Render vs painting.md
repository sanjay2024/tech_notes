---
title: Render vs painting
date: 2025-09-22
draft: true
tags:
  - react
  - front-end
---

Excellent question — **"render"** and **"paint"** are both crucial steps in how React (and the browser) updates the UI, but they mean very different things.

Let’s break it down:

---

## 🧠 **1. Render (in React)**

### 🧾 What it means:

> Render in React means running your component function to generate the virtual DOM (a JavaScript representation of the UI).
> 

### 🛠️ Steps involved:

- React calls your component
- Reads props, state
- Returns JSX → converted to virtual DOM
- Compares with previous virtual DOM (diffing)
- Prepares updates for the actual DOM (but hasn't touched it yet!)

### ⏱️ When:

- Happens **in JavaScript**, before the browser touches the screen

---

## 🎨 **2. Paint (in Browser)**

### 🧾 What it means:

> Paint is when the browser actually draws pixels to the screen, based on the updated DOM & CSS.
> 

### 🛠️ Steps involved:

- Browser receives updated DOM
- Calculates layout and styles
- 
- **Paints it on screen**

### ⏱️ When:

- Happens **after React renders and commits to the real DOM**

---

## 📊 Render vs Paint — Comparison Table

| Concept | Render (React) | Paint (Browser) |
| --- | --- | --- |
| What | Running component to return JSX | Drawing pixels to the screen |
| Who does it | React (JavaScript/JSX) | Browser (Rendering Engine) |
| Output | Virtual DOM updates | Visible pixels |
| Happens in | Memory / JavaScript context | Actual screen |
| Triggers | State/props/context change | DOM changes + CSS changes |
| Blocking? | No (unless expensive JS logic) | Can be blocked by expensive rendering work |

---

## 🔄 Flow Summary:

```

React state/props change
    ↓
Component re-renders (returns new JSX)
    ↓
React diffs and commits DOM changes
    ↓
Browser receives updated DOM
    ↓
Browser paints to screen
```

---

## 👀 Real Example:

```jsx

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Painted!"); // Happens AFTER paint
  }, [count]);

  return <div>{count}</div>;
}

```

- When `setCount` is called:
    - React renders → updates virtual DOM
    - DOM is committed
    - **Browser paints new count**
    - Then `useEffect` runs → so you know paint is done

---

## ✅ TL;DR

| Term | Meaning | When It Happens |
| --- | --- | --- |
| Render | React builds virtual DOM from JSX | During state/prop/context updates |
| Paint | Browser draws updated UI on screen | After DOM is updated by React |