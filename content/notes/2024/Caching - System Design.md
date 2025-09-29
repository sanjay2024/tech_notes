---
title: Caching - System Design
date: 2025-09-21
draft: true
tags:
  - system_design
  - caching
  - cdn
---


[Caching - System Design Concept - GeeksforGeeks](https://www.geeksforgeeks.org/caching-system-design-concept-for-beginners/)

When the expected data is not in the cache is known as cache miss

when the expected data is in the cache and we get it from the cache is known as cache hit

Types of Caching

1. Application Server Cache
2. Distrubuted Cache
3. Global Cache

## CDN - Content Distrubuted Network

[What is Content Delivery Network(CDN) in System Design - GeeksforGeeks](https://www.geeksforgeeks.org/what-is-content-delivery-networkcdn-in-system-design/?ref=lbp)

### How a CDN Works

1. **Content Distribution**: When a user requests a resource (e.g., an image, CSS file, or HTML page), the CDN delivers the content from the closest edge server to the user, reducing latency and load times.
2. **Caching**: CDNs cache content on edge servers. The first time a resource is requested, the CDN fetches it from the origin server and caches it. Subsequent requests are served from the cache.
3. **Load Balancing**: CDNs use load balancing to distribute traffic across multiple servers, preventing overload on any single server and ensuring high availability.
4. **Content Purging**: When content is updated, CDNs provide mechanisms to purge outdated content from the cache, ensuring users receive the latest version.

### Steps to Implement a CDN in a Node.js Application

1. **Choose a CDN Provider**: Select a CDN provider such as Cloudflare, AWS CloudFront, Akamai, Fastly, or others based on your needs and budget.
2. **Configure the CDN**:
    - **Sign Up and Create a CDN Distribution**: Sign up for the CDN service and create a new CDN distribution or zone. Specify your origin server (e.g., your Node.js application's server).
    - **Set Cache Behavior**: Configure cache behavior, including cache expiration, cache-control headers, and any specific rules for different types of content.
3. **Update DNS Settings**:
    - **CDN URL**: After setting up the CDN distribution, you'll receive a CDN URL. You can use this URL to serve your static assets.
    - **Custom Domain**: To use a custom domain (e.g., `cdn.yourdomain.com`), create a CNAME record in your DNS settings pointing to the CDN URL provided by your CDN provider.
4. **Modify Your Node.js Application**: Update your application to serve static assets via the CDN.

### Example with Express.js

```javascript
const express = require('express');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve static files via CDN
const cdnUrl = 'https://cdn.yourcdnprovider.com'; // Replace with your CDN URL
app.use((req, res, next) => {
  if (req.url.startsWith('/static')) {
    const cdnPath = `${cdnUrl}${req.url}`;
    res.redirect(cdnPath);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('<html><head><link rel="stylesheet" href="/static/styles.css"></head><body>Hello World!</body></html>');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

```

1. **Set Cache-Control Headers**: Ensure your server sets appropriate cache-control headers to instruct the CDN on how long to cache the content.

```javascript

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  next();
});

```

1. **Test the CDN Integration**:
    - Verify that static assets are served via the CDN by inspecting the network requests in your browser's developer tools.
    - Ensure the CDN is caching content as expected by checking response headers and CDN analytics.
2. **Monitor and Optimize**:
    - Monitor CDN performance using the analytics provided by your CDN provider.
    - Optimize cache settings based on traffic patterns and user behavior.

By following these steps, you can integrate a CDN with your Node.js application, improving performance and scalability.

Questions : 

1. How  we implemented CDN  in Klenty ?

Different types of caching in system ?

1. L1 Cache
2. L2 Cache
3. L3 Cache

![Untitled](pics/Untitled.png)

