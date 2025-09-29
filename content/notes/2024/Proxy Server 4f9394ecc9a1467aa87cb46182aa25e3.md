---
title: Proxy Server
date: 2025-09-21
draft: false
tags:
  - networking
  - proxy
  - backend
---

# Proxy Server

- Reverse Proxy
    
    Here's an example scenario illustrating the use of a reverse proxy:
    
    Let's consider a company that operates an online retail website with multiple web servers behind the scenes. They use a reverse proxy server to manage incoming traffic to their website.
    
    1. **Client Request**: A customer visits the company's website (e.g., [www.example.com](http://www.example.com/)) in their web browser.
    2. **Request Intercepted by Reverse Proxy**: The request first reaches the reverse proxy server, which acts as the entry point for all incoming traffic to the website.
    3. **Reverse Proxy Routes the Request**: The reverse proxy examines the request and determines which web server behind the scenes should handle it. This decision could be based on various factors such as server load, geographic location, or specific content requested.
    4. **Forwarding the Request to Web Server**: The reverse proxy forwards the client's request to the selected web server.
    5. **Web Server Processes the Request**: The web server receives the request from the reverse proxy and processes it accordingly. It generates the necessary response, such as serving a webpage or processing a transaction.
    6. **Response Sent Back to Reverse Proxy**: Once the web server has processed the request, it sends the response back to the reverse proxy server.
    7. **Response Delivered to Client**: Finally, the reverse proxy forwards the response from the web server to the client's web browser, which displays the requested webpage or content.
    
    In this example, the reverse proxy server acts as an intermediary between the client and the web servers, handling incoming requests and routing them to the appropriate backend servers based on predefined rules or algorithms. Reverse proxies are commonly used for load balancing, enhancing security, simplifying SSL termination, and providing caching services, among other purposes.
    
- `Ngrok`
    
    `Ngrok`  is used to make our local server as a live server by creating tunnel between the local and server and the internet , it is mostly used in web development  to test the web hook integration,demo website etc and it enables to access the local server remotely
    
    **How `Ngrok` Works:**
    
    1. **Client-Server Architecture**: `Ngrok` operates on a client-server architecture. The `Ngrok` client runs on your local machine, while the `Ngrok` server is hosted on the internet.
    2. **Secure `Tunneling`**: When you start `Ngrok`, it establishes a secure tunnel between your local machine and `Ngrok's` servers. This tunnel encrypts all traffic, ensuring secure communication.
    3. **Unique URLs**: `Ngrok` provides a unique URL for each tunnel created. These URLs are publicly accessible on the internet, allowing external users or services to connect to your local server through `Ngrok`.
    4. **Traffic Forwarding**: Any traffic received at the `Ngrok` server endpoint is forwarded through the secure tunnel to your local machine. Similarly, responses from your local server are sent back through the tunnel to the client.