---
title: Tree Shaking
date: 2025-09-22
draft: true
tags:
  - front-end
  - tree_shaking
  - webpack
  - react
  - react_optimization
---

## What is Tree shaking?

tree shaking is the process or technique that is used to remove the unwanted which does not need for the final bundle file , it is mainly implemented by bundlers tools like `webpack`, rollup and `esbuild` , By tree shaking the application bundle size will be reduced and improve the application performance 

it is primarily used with ES6 syntax like import and export , it does not work with commonJS module

### Tree Shaking in CRA (Create React App)

- Works out of the box with Webpack (in production mode).
- Add `"sideEffects": false` in your `package.json` if your code has no side effects:

```json

{
  "sideEffects": false
}

```

⚠️ Be careful — this tells the bundler **it’s safe to remove unused imports**, so only use it if you're sure your imports don’t have side effects (e.g. no polyfills, no global styles, etc.).

## Webpack File Stages

1. Stat size - actual size of the bundle before `minification`. → actual source code size
2. parsed size → after the `webpack minification`  →  Parsed sizes are calculated by reading the actual compiled bundle files and making a link back to the modules from the webpack stats file. So if you use a `minifier`, such as UglifyJS, the parsed size shows you the size after `minification`.
3. Gzip size  is the compressed version of the parsed size bundle , which is transferred over the network 

## ⚛️ Example: React App Bundle

Imagine you're building a React app using a tool like **Vite** or **Webpack**. Your final build outputs a file like `main.js`, which includes:

- React
- ReactDOM
- Your components
- Your app logic

---

### 📦 Output File: `main.js`

| File Property | Value |
| --- | --- |
| **Parsed Size** | 300 KB |
| **Gzip Size** | 90 KB |

---

### 🧠 What This Means:

- **Parsed Size (300 KB):**
    - This is the actual size of the JavaScript **after it has been decompressed**.
    - The browser must **parse and interpret** 300 KB of JavaScript.
    - Impacts **main-thread parsing time** and memory usage.
- **Gzip Size (90 KB):**
    - This is the size that was **actually transferred over the network**.
    - Much smaller because Gzip compresses repeated patterns like function names, JSX syntax, etc.
    - Impacts **network download time**.