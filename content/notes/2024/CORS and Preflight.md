---
title: CORS and Preflight
date: 2025-09-21
draft: false
tags:
  - cors
  - web_security
  - backend
---


# Technical Documentation: Understanding Same-Origin Policy (SOP) and CORS in Web Development

## Overview

This document explains the Same-Origin Policy (SOP), Cross-Origin Resource Sharing (CORS), and related CORS headers, tailored for Node.js developers. It also includes a security deep dive into why `Access-Control-Allow-Origin: *` cannot be used with credentials.

---

## 1. What is the Same-Origin Policy (SOP)?

### Definition:

SOP is a security measure implemented by browsers to restrict how documents or scripts loaded from one origin can interact with resources from another origin.

### Origin:

An origin is defined by:

- Protocol (http/https)
- Host (domain or IP)
- Port

### Example:

If your frontend runs on:

```
http://localhost:3000

```

It can only make requests to:

```
http://localhost:3000/some-api

```

Any attempt to access `http://localhost:8080` will be blocked by the browser **unless** the server explicitly allows it using CORS headers.

---

## 2. What is CORS?

### Definition:

CORS is a mechanism that allows a web server to indicate that it permits a web page from another origin to access its resources.

### Example:

Frontend (React): `http://localhost:3000`

Backend (Node.js/Express): `http://localhost:8080`

Without CORS, the browser blocks the request. With proper CORS headers, the backend allows the request.

---

## 3. What is the Preflight Request?

### Definition:

Before making certain types of requests (e.g., `POST`, custom headers, `credentials`), the browser sends a `OPTIONS` request to the server to check if the actual request is safe.

### Purpose:

To prevent unexpected side effects from cross-origin requests.

---

## 4. Key Response Headers in Preflight (OPTIONS) Response

### Important Headers:

- `Access-Control-Allow-Origin`: Specifies allowed origin (cannot be  if credentials are used)
- `Access-Control-Allow-Credentials`: Allows cookies/auth headers if set to `true`
- `Access-Control-Allow-Methods`: Specifies allowed HTTP methods (e.g., GET, POST)
- `Access-Control-Allow-Headers`: Specifies allowed request headers (e.g., Content-Type)

---

## 5. Why `Access-Control-Allow-Origin: *` Cannot Be Used with Credentials

### Scenario:

You are logged into `https://yourbank.com` and a malicious site `https://evil.com` runs this code:

```javascript

fetch('https://yourbank.com/account', {
  credentials: 'include'
});

```

### If server responds with:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

```

Then:

- Cookies from your session at `yourbank.com` are sent ✅
- Response is visible to `evil.com` ❌

### This causes a major security vulnerability:

`evil.com` can now read your private banking info — this is why CORS forbids `*` when credentials are included.

### Correct Usage:

Server must explicitly echo the origin:

```
Access-Control-Allow-Origin: https://yourbank.com
Access-Control-Allow-Credentials: true

```

---

## 6. Secure CORS Configuration in Express

```
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://yourfrontend.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

```

---

## 7. Summary

| Header | Can be `*`? | With `credentials: true`? |
| --- | --- | --- |
| `Access-Control-Allow-Origin` | ✅ Yes | ❌ No |
| `Access-Control-Allow-Credentials` | ✅ Yes | ✅ Yes (with exact origin) |

> To securely support cross-origin requests with credentials (cookies or tokens), always specify the exact origin.
> 

---
