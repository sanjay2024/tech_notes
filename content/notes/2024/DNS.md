---
title: DNS
draft: false
tags:
  - backend
  - networking
  - dns
---

### **How DNS Works Behind the Scenes?**

When you type a website URL (like `www.example.com`) into your browser, DNS translates that domain name into an IP address so your browser can load the website. Here's the process step-by-step:

### a. **The User's Request**

1. **User Enters URL:** A user types `www.example.com` into their browser.
2. **Browser Queries DNS:** The browser asks the DNS resolver (usually provided by your ISP) for the IP address of `www.example.com`.

### b. **DNS Lookup Process**

1. **Check Local Cache:** The DNS resolver first checks its local cache to see if it has the IP address stored. If it does, it returns the IP address right away.
2. **Contact Root DNS Server:** If the IP address is not in the cache, the resolver contacts one of the root DNS servers, which manages top-level domains (TLDs) like `.com`, `.org`, etc. There are 13 root DNS servers globally, maintained by organizations like ICANN (Internet Corporation for Assigned Names and Numbers).
3. **TLD DNS Server:** The root server directs the resolver to the DNS server responsible for the `.com` TLD, called the **TLD nameserver**.
4. **Authoritative DNS Server:** The TLD nameserver tells the resolver which authoritative DNS server knows the IP address for `example.com`. This server is typically managed by the domain registrar or hosting provider (e.g., Heroku if it manages DNS for you).
5. **IP Address Response:** The authoritative DNS server returns the IP address of the domain (e.g., `192.168.1.1`), and the DNS resolver caches this IP to speed up future queries.

### c. **Connecting to the Website**

1. **Browser Makes a Request:** The browser now knows the IP address (e.g., `192.168.1.1`) and makes a request to that IP address to load the website.
2. **Website is Loaded:** The server at that IP address (e.g., Heroku) sends back the website's content, and the browser renders the page.

### 4. **Where are IP Addresses Stored?**

- **DNS Records:** IP addresses are stored in DNS records on **authoritative DNS servers**. When you configure DNS for your website, you manage these records through a DNS service (like Cloudflare, GoDaddy, or a hosting provider like Heroku).
- **Types of DNS Records:**
    - **A Record:** Maps a domain name to an IP address (e.g., `example.com` → `192.168.1.1`).
    - **CNAME Record:** Maps a domain name to another domain name (e.g., `www.example.com` → `example.com`).
    - **MX Record:** Maps a domain name to an email server.
    - **NS Record:** Points to the DNS servers that are authoritative for a domain.

### 5. **Does Heroku Register My Website in DNS?**

When you deploy your application on Heroku, Heroku provides a default subdomain (e.g., `yourapp.herokuapp.com`). However, **Heroku does not automatically register your custom domain in DNS**. If you want to use a custom domain (e.g., `www.yourdomain.com`), you must do the following:

### a. **Custom Domain Setup with Heroku**

1. **Buy a Domain:** First, you buy a domain from a domain registrar (like GoDaddy, Namecheap, or Google Domains).
2. **Point DNS to Heroku:** You log in to your domain registrar’s DNS settings and create DNS records that point your domain to Heroku. Usually:
    - **A Record** (or **ALIAS/CNAME** if using `www`) that points to Heroku’s IP address or specific Heroku endpoint.
    - **CNAME Record** if you're using a subdomain like `www.yourdomain.com`, which points to `yourapp.herokuapp.com`.
3. **Configure in Heroku Dashboard:** In Heroku’s dashboard, you configure your application to recognize your custom domain.

Once these steps are completed, Heroku doesn’t "register" the domain name itself. That’s the responsibility of the DNS server (usually your registrar), but Heroku acts as the server that serves your app when the DNS points to it.

### 6. **How DNS and Heroku Work Together (Example)**

Let’s look at an example to make this clearer.

### **Example Scenario:**

You have an app deployed at Heroku (`myapp.herokuapp.com`), and you want to access it via your custom domain `www.mywebsite.com`.

### a. **Step 1: Buy a Domain**

- You buy the domain `mywebsite.com` from a domain registrar like Namecheap.

### b. **Step 2: DNS Configuration**

- You log into your Namecheap account (or whichever registrar you used).
- You configure a **CNAME Record** for `www.mywebsite.com` pointing to `myapp.herokuapp.com`.
- Optionally, you also create an **A Record** pointing the root domain (`mywebsite.com`) to Heroku's IP address, or use an ALIAS.

### c. **Step 3: Configure Heroku**

- You go to the **Heroku Dashboard**, find your app, and add the custom domain `www.mywebsite.com` to it.
- Heroku verifies the domain and links it to your app.

### d. **Step 4: User Access**

- Now, when a user types `www.mywebsite.com`:
    1. The browser queries the DNS server for the IP address.
    2. The DNS resolver finds the **CNAME Record** for `www.mywebsite.com` pointing to `myapp.herokuapp.com`.
    3. It retrieves Heroku’s IP address and loads the website.

### 7. **Summary of How It Works Behind the Scenes**

1. **User Typing Domain Name:**
    - User types `www.mywebsite.com`.
2. **DNS Resolution:**
    - The DNS resolver queries the DNS system to find the IP address corresponding to `www.mywebsite.com`.
    - DNS servers respond with either the IP address (for an A Record) or direct the browser to `myapp.herokuapp.com` (for a CNAME Record).
3. **Heroku's Role:**
    - Once the IP address is found, the browser connects to Heroku’s servers.
    - Heroku hosts your app, processes the request, and returns the website content to the user.
4. **Domain Registration:**
    - Your domain is managed by a domain registrar, not Heroku. You must configure DNS records with the registrar to point to Heroku.

---

### Key Takeaways

- **DNS Servers** are maintained by different entities like ISPs, registrars, and cloud service providers. They map domain names to IP addresses using DNS records.
- **IP Addresses** are stored in DNS records like A and CNAME records on authoritative DNS servers.
- **Heroku** provides hosting for your application but doesn’t automatically register your custom domain in DNS. You must configure DNS settings to point your domain to Heroku.
- **DNS Resolution** involves querying root DNS servers, TLD DNS servers, and authoritative DNS servers to resolve the domain name to an IP address, allowing the browser to connect to the correct server.

By understanding DNS and its relationship with hosting platforms like Heroku, you can configure and manage your custom domains effectively.

A **CNAME (Canonical Name)** record is a type of DNS record that maps one domain name (an alias) to another domain name (the canonical name). It's used when you want multiple domain names to point to the same content or server without needing to update each individual DNS record.

### **How CNAME Works:**

- Imagine you have two domain names:
    - `www.example.com` (primary domain)
    - `blog.example.com` (subdomain)
- You want both `www.example.com` and `blog.example.com` to point to the same content or server, so you don’t have to set up separate IP addresses for each domain.

Instead of creating separate **A records** (which map domains to IP addresses), you can create a **CNAME record** for `blog.example.com` that points to `www.example.com`. So, whenever someone visits `blog.example.com`, the DNS system will check the CNAME record and forward them to `www.example.com`.

### **Why Use a CNAME?**

1. **Simplification:** You only need to manage one set of DNS records (the original or "canonical" domain). If the IP address of `www.example.com` changes, you don’t need to update `blog.example.com`; the CNAME will automatically reflect the change.
2. **Multiple Aliases:** You can use CNAME records to create multiple aliases for one canonical domain (e.g., `mail.example.com`, `ftp.example.com`, all pointing to `example.com`).

### **Example:**

- **CNAME Record:**
    
    `blog.example.com CNAME www.example.com`
    
    This means that `blog.example.com` will resolve to `www.example.com` and inherit its DNS settings (like the IP address).
    

### **Important Notes:**

- **CNAMEs can’t point to IP addresses directly.** They only point to another domain name.
- You can't have a CNAME for the root domain (like `example.com`). It's only used for subdomains (like `www.example.com` or `mail.example.com`).

### **When to Use CNAME:**

- When you have subdomains that need to point to the same server as the main domain.
- When you want to redirect traffic from different domain names to a single domain name without managing individual IP addresses.

### **Example in Real Life:**

1. **Heroku Setup:**
    - Suppose you deploy an app on Heroku, and Heroku gives you a domain like `yourapp.herokuapp.com`.
    - You want to use a custom domain `www.mywebsite.com` to point to your Heroku app.
    - You can create a CNAME record that maps `www.mywebsite.com` to `yourapp.herokuapp.com`. This way, when people type `www.mywebsite.com`, they get redirected to your Heroku app.

### **Summary of CNAME:**

- **CNAME = Alias** for another domain.
- It simplifies DNS management and allows multiple domain names to point to the same content.
- Commonly used for subdomains or to point custom domains to third-party services (like Heroku or GitHub Pages).

Let me know if this clears up the concept for you!

[https://www.cloudflare.com/en-gb/learning/dns/dns-server-types/](https://www.cloudflare.com/en-gb/learning/dns/dns-server-types/)