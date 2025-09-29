---
title: SSR VS CSR
date: 2025-09-22
draft: true
tags:
  - front-end
  - rendering
---
# SSR VS CSR

As a **React Developer**, understanding the difference between **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)** is crucial for optimizing performance, SEO, and user experience.

---

### ✅ **Client-Side Rendering (CSR)**

In **CSR**, the browser **downloads a minimal HTML**, then **loads JavaScript**, and React **renders the UI in the browser**.

### 🔧 How it works:

1. User requests a page.
2. Server responds with a basic `index.html` and JavaScript bundle.
3. Browser runs JavaScript.
4. React renders the UI on the client side.

### 📦 Tools:

- **Create React App (CRA)**
- Most SPAs (Single Page Applications)

### ⚠️ Drawbacks:

- Slower **initial load**
- Poor **SEO** (because bots see blank HTML before JS runs)

### ✅ Benefits:

- Fast navigation after initial load (thanks to React’s Virtual DOM)

### 📘 Example:

```jsx
// App.jsx (Client-side React App)
function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => <p key={user.id}>{user.name}</p>)}
    </div>
  );
}

```

Here, the data is fetched and rendered **after** the app loads in the browser.

---

### ✅ **Server-Side Rendering (SSR)**

In **SSR**, React components are rendered **on the server**, and a fully populated HTML is sent to the browser.

### 🔧 How it works:

1. User requests a page.
2. Server runs React code and generates full HTML.
3. Browser receives the complete HTML page.
4. React **hydrates** the page for interactivity.

### 📦 Tools:

- **Next.js** (most popular SSR framework for React)

### ✅ Benefits:

- Faster **First Contentful Paint (FCP)**
- **SEO-friendly** (great for pages that must be indexed)

### ⚠️ Drawbacks:

- Higher **server load**
- Slightly slower **navigation between pages** unless pre-rendered

### 📘 Example (Next.js):

```tsx

// pages/users.tsx (SSR)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();
  return { props: { users } };
}

export default function UsersPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => <p key={user.id}>{user.name}</p>)}
    </div>
  );
}

```

Here, the **HML is generated on the server** with all the user data and sent to the browser.

---

### 🚀 TL;DR Table

| Feature | Client-Side Rendering (CSR) | Server-Side Rendering (SSR) |
| --- | --- | --- |
| Initial Load Time | Slower | Faster |
| SEO | Poor (needs hydration first) | Excellent (HTML is ready) |
| JavaScript Dependency | High (needs JS to render UI) | Low (HTML works without JS) |
| Framework Example | Create React App | Next.js |
| Server Load | Low | High |
| Navigation | Fast after load | Can be slower than CSR |