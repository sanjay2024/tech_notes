---
title: Networking
date: 2025-09-22
draft: true
tags:
  - networking
---
## Networking Devices

## Hub

Hub `connects` multiple system and make each system communicates with each other on the same network

In hub if the data packets arrives it will broadcast to every system

Eg: if System A wants to send to B then then hub will broadcast to every system  including B , where other system also know the data

## Switch

switch is also like hub but it sends the data packet with the mac address, where the data packet is only send to the system with respective mac address

## Router

router is used to communicate with other network unlike the hub and switches

it routes the message based on the ip address

## http1.1. vs http2

## `https1` vs `https2`

[https://medium.com/@sim30217/https-and-http-2-93bfd0aa0f9c#:~:text=This ensures the confidentiality%2C integrity,to protect data in transit](Web%20sockets%20and%20Web%20hooks%204eca14b41c734ccda9b2cc215a0dc968.md).

# **What is HTTP? Why is HTTP/2 faster than HTTP/1.1?**

[HTTP](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) stands for hypertext transfer protocol, and it is the basis for almost all web applications. More specifically, HTTP is the method computers and servers use to request and send information. For instance, when someone navigates to cloudflare.com on their laptop, their web browser sends an HTTP request to the Cloudflare servers for the content that appears on the page. Then, Cloudflare servers send HTTP responses with the text, images, and formatting that the browser displays to the user.

# **What is HTTP/1.1?**

The first usable version of HTTP was created in 1997. Because it went through several stages of development, this first version of HTTP was called HTTP/1.1. This version is still in use on the web.

# **What is HTTP/2?**

In 2015, a new version of HTTP called HTTP/2 was created. HTTP/2 solves several problems that the creators of HTTP/1.1 did not anticipate. In particular, HTTP/2 is much faster and more efficient than HTTP/1.1. One of the ways in which HTTP/2 is faster is in how it prioritizes content during the loading process.

# **What is prioritization?**

In the context of [web performance](https://www.cloudflare.com/learning/performance/why-site-speed-matters/), prioritization refers to the order in which pieces of content are loaded. Suppose a user visits a news website and navigates to an article. Should the photo at the top of the article load first? Should the text of the article load first? Should the banner ads load first?

Prioritization affects a webpage's load time. For example, certain resources, like large JavaScript files, may block the rest of the page from loading if they have to load first. More of the page can load at once if these render-blocking resources load last.

In addition, the order in which these page resources load affects how the user perceives page load time. If only behind-the-scenes content (like a CSS file) or content the user can't see immediately (like banner ads at the bottom of the page) loads first, the user will think the page is not loading at all. If the content that's most important to the user loads first, such as the image at the top of the page, then the user will perceive the page as loading faster.

# **How does prioritization in HTTP/2 affect performance?**

In HTTP/2, developers have hands-on, detailed control over prioritization. This allows them to maximize perceived and actual page load speed to a degree that was not possible in HTTP/1.1.

HTTP/2 offers a feature called weighted prioritization. This allows developers to decide which page resources will load first, every time. In HTTP/2, when a [client](https://www.cloudflare.com/learning/serverless/glossary/client-side-vs-server-side/) makes a request for a webpage, the server sends several streams of data to the client at once, instead of sending one thing after another. This method of data delivery is known as multiplexing. Developers can assign each of these data streams a different weighted value, and the value tells the client which data stream to render first.

Imagine that Alice wants to read a novel that her friend Bob wrote, but both Alice and Bob only communicate through the regular mail. Alice sends a letter to Bob and asks Bob to send her his novel. Bob decides to send the novel HTTP/1.1-style: He mails one chapter at a time, and he only mails the next chapter after receiving a reply letter from Alice confirming that she received the previous chapter. Using this method of content delivery, it takes Alice many weeks to read Bob's novel.

Now imagine that Bob decides to send Alice his novel HTTP/2-style: In this case, he sends each chapter of the novel separately (to stay within the postal service's size limits) but all at the same time. He also numbers each chapter: Chapter 1, Chapter 2, etc. Now, Alice receives the novel all at once and can assemble it in the correct order on her own time. If a chapter is missing, she may send a quick reply asking for that specific chapter, but otherwise the process is complete, and Alice can read the novel in just a few days.

In HTTP/2, data is sent all at once, much like Bob when he sends Alice multiple chapters at once. And just like Bob, developers get to number the chapters in HTTP/2. They can decide if the text of a webpage loads first, or the CSS files, or the JavaScript, or whatever they feel is most important for the user experience.

# **What are the other differences between HTTP/2 and HTTP/1.1 that impact performance?**

**Multiplexing:** HTTP/1.1 loads resources one after the other, so if one resource cannot be loaded, it blocks all the other resources behind it. In contrast, HTTP/2 is able to use a single [TCP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) connection to send multiple streams of data at once so that no one resource blocks any other resource. HTTP/2 does this by splitting data into binary-code messages and numbering these messages so that the client knows which stream each binary message belongs to.

**Server push:** Typically, a server only serves content to a client device if the client asks for it. However, this approach is not always practical for modern webpages, which often involve several dozen separate resources that the client must request. HTTP/2 solves this problem by allowing a server to "push" content to a client before the client asks for it. The server also sends a message letting the client know what pushed content to expect – like if Bob had sent Alice a Table of Contents of his novel before sending the whole thing.

**Header compression:** Small files load more quickly than large ones. To speed up web performance, both HTTP/1.1 and HTTP/2 compress HTTP messages to make them smaller. However, HTTP/2 uses a more advanced compression method called HPACK that eliminates redundant information in HTTP header packets. This eliminates a few bytes from every HTTP packet. Given the volume of HTTP packets involved in loading even a single webpage, those bytes add up quickly, resulting in faster loading.

# **What is HTTP/3?**

HTTP/3 is the next proposed version of the HTTP protocol. [HTTP/3](https://www.cloudflare.com/learning/performance/what-is-http3/) does not have wide adoption on the web yet, but it is growing in usage. The key difference between HTTP/3 and previous versions of the protocol is that HTTP/3 runs over [QUIC](https://www.cloudflare.com/learning/ddos/what-is-a-quic-flood/) instead of TCP. QUIC is a faster and more secure transport layer protocol that is designed for the needs of the modern Internet.

## ip and subnetting

A **subnet mask** is a 32-bit number used in IP networking to divide an IP address into network and host portions. It helps define the range of IP addresses that can be used within a network or subnet.

### Key Concepts of a Subnet Mask:

1. **IP Address Structure**:
    - An IPv4 address is a 32-bit number, usually represented in dotted-decimal format, like `192.168.1.10`.
    - It consists of two main parts: the **network portion** and the **host portion**.
2. **Subnet Mask**:
    - The subnet mask, also a 32-bit number, works alongside the IP address to determine which part of the IP address refers to the network and which part refers to the host.
    - It is also represented in dotted-decimal format, like `255.255.255.0`.

### Example of How Subnet Mask Works:

Let's take the IP address `192.168.1.10` and the subnet mask `255.255.255.0`.

1. **Binary Representation**:
    - IP Address: `192.168.1.10` in binary is `11000000.10101000.00000001.00001010`.
    - Subnet Mask: `255.255.255.0` in binary is `11111111.11111111.11111111.00000000`.
2. **Network vs. Host**:
    - The subnet mask's `1` bits indicate the network portion of the IP address, while the `0` bits indicate the host portion.
    - For `255.255.255.0`, the first 24 bits are `1`, so the network portion is `192.168.1`, and the last 8 bits are `0`, indicating the host portion is `10`.
3. **Network Address**:
    - Applying the subnet mask to the IP address, you can determine the network address.
    - **Network Address** for `192.168.1.10` with subnet mask `255.255.255.0` is `192.168.1.0`.
    - This means all IP addresses from `192.168.1.1` to `192.168.1.254` belong to this network, with `192.168.1.255` typically reserved for the broadcast address.

### Common Subnet Masks:

- **255.255.255.0** (or `/24` in CIDR notation): Common for small networks, allows 256 IP addresses, with 254 usable host IPs.
- **255.255.0.0** (or `/16`): Larger networks, allowing 65,536 IP addresses, with 65,534 usable host IPs.
- **255.0.0.0** (or `/8`): Very large networks, allowing over 16 million IP addresses.

### Summary:

The subnet mask is crucial in IP networking, as it defines how an IP address is split into the network and host parts, helping devices determine whether an IP address is within the same local network or if it needs to be routed outside the network.

### What is a MAC Address?

A **MAC address** (Media Access Control address) is a unique identifier assigned to a network interface card (NIC) or network adapter. It's used for communication within a local network. MAC addresses are typically assigned by the manufacturer of the network hardware and are hardcoded into the device.

### Key Characteristics of a MAC Address:

- **Format**: A MAC address is a 48-bit number, typically represented as 12 hexadecimal digits separated by colons or hyphens, e.g., `00:1A:2B:3C:4D:5E` or `00-1A-2B-3C-4D-5E`.
- **Uniqueness**: Each network device has a unique MAC address, which is supposed to be globally unique. The first half of the MAC address identifies the manufacturer (the OUI - Organizationally Unique Identifier), while the second half is specific to the device.
- **Layer**: MAC addresses operate at Layer 2 of the OSI model, which is the Data Link Layer. They are used for communication within the same local network, such as between devices on a Wi-Fi or Ethernet network.
- **Permanent**: Typically, a MAC address is permanent and doesn't change, although it can be altered (spoofed) in some cases through software.

### What is an IP Address?

An **IP address** (Internet Protocol address) is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It is used for identifying devices on a network and for routing traffic between them.

### Key Characteristics of an IP Address:

- **Format**:
    - **IPv4**: A 32-bit address, typically represented in dotted-decimal format, e.g., `192.168.1.1`.
    - **IPv6**: A 128-bit address, represented as eight groups of four hexadecimal digits, e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.
- **Uniqueness**: IP addresses need to be unique within a network. In public networks, they must be globally unique; in private networks, they need only be unique within that private space.
- **Layer**: IP addresses operate at Layer 3 of the OSI model, which is the Network Layer. They are used for routing traffic between different networks (e.g., across the internet).
- **Dynamic vs. Static**: IP addresses can be either static (permanently assigned) or dynamic (temporarily assigned by a DHCP server).

### Differences Between IP Address and MAC Address:

1. **Purpose**:
    - **MAC Address**: Used to uniquely identify devices on a local network (e.g., within the same Ethernet or Wi-Fi network).
    - **IP Address**: Used to identify devices across networks and route traffic between them, typically across the internet.
2. **Layer in OSI Model**:
    - **MAC Address**: Operates at Layer 2 (Data Link Layer).
    - **IP Address**: Operates at Layer 3 (Network Layer).
3. **Permanence**:
    - **MAC Address**: Usually permanent and assigned by the hardware manufacturer.
    - **IP Address**: Can be static (permanent) or dynamic (temporary), and is assigned by a network administrator or DHCP server.
4. **Format**:
    - **MAC Address**: 48-bit hexadecimal, e.g., `00:1A:2B:3C:4D:5E`.
    - **IPv4 Address**: 32-bit dotted-decimal, e.g., `192.168.1.1`.
    - **IPv6 Address**: 128-bit hexadecimal, e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.
5. **Scope of Usage**:
    - **MAC Address**: Used within the local network to ensure data is delivered to the correct hardware device.
    - **IP Address**: Used for identifying and communicating with devices across different networks, such as over the internet.

### Example Scenario:

When you send data from your computer to a server on the internet, your computer uses the MAC address to send data to your router (within the local network). The router then uses the IP address to route the data to the correct server across the internet.

Subnets play a crucial role in enhancing network security by segmenting a large network into smaller, isolated sections. This segmentation allows for better control over traffic, limits exposure to attacks, and enables the enforcement of security policies at a granular level. Here's how subnetting helps in security, along with an example:

### How Subnets Enhance Security

1. **Isolation of Network Segments**:
    - By dividing a network into subnets, you can isolate different parts of the network from each other. This limits the scope of potential security breaches, as an attack on one subnet is contained within that subnet and does not easily spread to other parts of the network.
2. **Access Control**:
    - Subnets allow you to implement access control policies, restricting which devices or users can communicate between different subnets. For instance, sensitive data might be stored on a subnet with restricted access, and only specific subnets (like those for administrative users) might have permission to communicate with it.
3. **Network Monitoring and Traffic Filtering**:
    - With subnets, you can monitor traffic more effectively and apply firewalls or intrusion detection systems (IDS) at the subnet level. This enables you to filter and control traffic based on subnet boundaries, blocking unwanted or malicious traffic before it reaches sensitive parts of the network.
4. **Reduction of Broadcast Traffic**:
    - Subnets reduce the amount of broadcast traffic on the network. Broadcast traffic, which is sent to all devices on a network, can be exploited in certain types of attacks (e.g., ARP spoofing). By limiting broadcast domains, subnets reduce this vulnerability.
5. **Improved Incident Response**:
    - In case of a security breach, subnets allow for quicker identification and isolation of the affected segment. This helps in containing the damage and responding to the incident more effectively.

### Example: Corporate Network with Subnets

### Scenario

Imagine a medium-sized company with different departments: HR, Finance, IT, and General Staff. Each department handles different types of sensitive data and has different security needs.

### Without Subnets

- If the entire company operates on a single flat network (no subnets), every device can communicate directly with every other device. A security breach in one device could potentially expose the entire network, as there are no barriers or controls to limit the spread of the attack.
- For example, if a general staff member's device gets infected with malware, it could spread to devices in the HR or Finance departments, potentially compromising sensitive employee or financial data.

### With Subnets

- The network is divided into subnets based on departments:
    - **HR Subnet**: 192.168.1.0/24
    - **Finance Subnet**: 192.168.2.0/24
    - **IT Subnet**: 192.168.3.0/24
    - **General Staff Subnet**: 192.168.4.0/24
- **Access Control**:
    - The IT department can implement firewall rules allowing communication between IT and other subnets but restrict direct communication between the HR and Finance subnets. This ensures that sensitive data in HR and Finance is not directly accessible by the General Staff subnet.
- **Traffic Filtering**:
    - Each subnet can have its own firewall, filtering traffic based on the specific needs of that department. For instance, the HR subnet may block all traffic except for secure connections to the HR database.
- **Security Incident**:
    - If malware infects a device in the General Staff subnet, it is confined to that subnet due to the restricted access policies. The HR and Finance subnets remain unaffected, containing the breach and protecting sensitive data.

### Conclusion

By implementing subnets, the company can enhance its security posture by isolating sensitive parts of the network, controlling access, and minimizing the impact of security incidents. This helps protect valuable data and reduces the risk of widespread network breaches.

## subnet masking and CIDR

### **What is a Subnet?**

A **subnet** (short for **subnetwork**) is a logically segmented portion of a larger network. Subnets divide a network into smaller, manageable sections to:

1. Improve performance.
2. Enhance security.
3. Simplify administration.

Each subnet operates as its own mini-network but can still communicate with other subnets if configured to do so.

---

### **What is Subnetting?**

**Subnetting** is the process of dividing a large network into smaller subnets. It helps optimize the usage of IP addresses and improve network efficiency by avoiding waste of address space.

### Why Subnetting is Needed:

1. **Efficient IP Address Utilization**:
    - Avoids assigning a large pool of IPs to small networks.
2. **Improves Network Performance**:
    - Reduces congestion by isolating traffic within a subnet.
3. **Enhances Security**:
    - Limits access between subnets.
4. **Simplifies Troubleshooting**:
    - Problems can be isolated to specific subnets.

---

### **What is a Subnet Mask?**

A **subnet mask** is a 32-bit number that identifies the division between the **network ID** and the **host ID** in an IP address.

- **Network ID**: Identifies the subnet.
- **Host ID**: Identifies a specific device in the subnet.

The subnet mask tells which part of the IP address belongs to the network and which part identifies the host.

### Common Subnet Masks:

- **255.255.255.0**: 24 bits for the network, 8 bits for hosts.
- **255.255.0.0**: 16 bits for the network, 16 bits for hosts.

---

### **How Subnetting Works**

### Example:

Consider the IP address `192.168.1.0/24`:

- `192.168.1.0` is the **network address**.
- `/24` (CIDR notation) means 24 bits are reserved for the **network ID**.

### Default Subnet:

- Without subnetting, all devices share the same network, which might result in wasted IP addresses and inefficient traffic routing.

### After Subnetting:

- Subnetting allows us to divide `192.168.1.0/24` into smaller subnets.
- For example, divide it into four subnets:
    - **Subnet 1**: `192.168.1.0/26` (64 addresses)
    - **Subnet 2**: `192.168.1.64/26` (64 addresses)
    - **Subnet 3**: `192.168.1.128/26` (64 addresses)
    - **Subnet 4**: `192.168.1.192/26` (64 addresses)

This way, you can assign smaller IP ranges to different departments or regions.

---

### **Subnet Mask in Action**

### IP Address Example:

Suppose you have:

- **IP Address**: `192.168.1.10`
- **Subnet Mask**: `255.255.255.0`
1. **Convert to Binary**:
    - IP Address: `192.168.1.10` → `11000000.10101000.00000001.00001010`
    - Subnet Mask: `255.255.255.0` → `11111111.11111111.11111111.00000000`
2. **Determine Network and Host IDs**:
    - Network ID: The first 24 bits (`192.168.1`).
    - Host ID: The last 8 bits (`10`).

So:

- **Network ID**: `192.168.1.0`
- **Host Range**: `192.168.1.1` to `192.168.1.254` (usable IPs for devices).

---

### **Real-World Use Case**

### Office Network

- **Total Devices**: 200
- You have an IP block: `192.168.0.0/16` (65,536 IPs).
- Without subnetting, all devices would share the same network, which:
    - Wastes many IP addresses.
    - Causes congestion due to excessive broadcast traffic.

### Subnetting:

You divide `192.168.0.0/16` into smaller subnets:

1. **HR Department**: `192.168.1.0/24` (256 IPs).
2. **IT Department**: `192.168.2.0/24` (256 IPs).
3. **Finance Department**: `192.168.3.0/24` (256 IPs).

Each department has its own subnet, making the network more efficient and easier to manage.

---

### **Summary**

1. **Subnet**: A smaller network within a larger network.
2. **Subnetting**: The process of dividing a network into subnets.
3. **Subnet Mask**: Specifies which part of an IP address is the network ID and which is the host ID.


### Explanation: Why Subnetting Prevents Wasted IP Addresses and Improves Efficiency

When devices share the **same network without subnetting**, all devices:

1. Belong to one large broadcast domain.
2. Compete for the same pool of IP addresses.
3. Contribute to unnecessary traffic that slows the network.

Let's break this down with an example relevant to a **web developer** managing a company's infrastructure.

---

### Scenario: A Web Development Company

- Your company has **two departments**:
    1. **Frontend Team** with 25 devices.
    2. **Backend Team** with 25 devices.
- The company is assigned an IP block: `192.168.0.0/24` (256 IPs).

Without subnetting:

- All devices (frontend, backend, servers, printers, etc.) exist in a **single network**.
- Problems arise:

---

### **1. Wasted IP Addresses**

Without subnetting, the **entire block of 256 IPs** is allocated to this one network.

### Why This is Wasteful:

- Only **50 devices** are active (frontend and backend teams combined).
- 256 IPs are available, but **206 IPs** remain unused. This waste grows when multiple teams are involved.

**Solution with Subnetting:**

- Split the network into **smaller subnets** for each department.
    - Subnet 1: `192.168.0.0/26` (64 IPs) for the Frontend Team.
    - Subnet 2: `192.168.0.64/26` (64 IPs) for the Backend Team.
- Now, each subnet has sufficient space (64 IPs) without wasting addresses.

---

### **2. Inefficient Traffic Routing**

Without subnetting, all devices share the same **broadcast domain**.

### Why This Causes Inefficiency:

- A **broadcast** happens when a device sends a message to all devices in the network.
- In a large, single network:
    - Every broadcast reaches all 256 devices (even if only 50 devices are active).
    - This results in **unnecessary traffic**, slowing communication and affecting performance.

**Solution with Subnetting:**

- Frontend and Backend teams are isolated into separate subnets.
    - Broadcasts in the Frontend subnet (`192.168.0.0/26`) do not reach the Backend subnet (`192.168.0.64/26`).
    - This reduces traffic and improves efficiency.

---

### **3. Real-World Analogy**

Imagine a company building **two web applications**: *App A* and *App B*.

- Without subnetting:
    - Both teams work in the same room (network).
    - Announcements (broadcasts) for *App A* distract the *App B* team, causing delays.
- With subnetting:
    - Each team gets its own room (subnet).
    - Announcements are only relevant to the team in the room, avoiding distractions.

---

### **Subnetting Applied to a Web Developer's Workflow**

### Example: Deploying Apps in Docker Containers

- **Without Subnetting**:
    - All containers use the same bridge network (e.g., `172.17.0.0/16`).
    - A broadcast from one container unnecessarily reaches all containers, including unrelated ones.

### **With Subnetting in Docker**:

- Create separate networks for each application or service:
    - Frontend app: `192.168.1.0/24`.
    - Backend API: `192.168.2.0/24`.
- Traffic is isolated, making deployment more efficient.

---

### Summary for Web Developers

Without subnetting:

1. **Wasted IP Addresses**: You allocate a large number of IPs but use only a small fraction.
2. **Unnecessary Traffic**: All devices share the same network, leading to congestion.

Subnetting solves these problems by:

- Dividing the network into smaller, isolated groups.
- Ensuring traffic stays within relevant subnets.
- Saving IP addresses and improving routing efficiency.


---

### **Understanding the Address Format**

The format `192.168.0.0/26` uses **CIDR notation**, which specifies:

1. **Base IP Address**: `192.168.0.0` — the starting point of the subnet.
2. **Subnet Mask (via `/26`)**: Indicates how many bits are reserved for the **network** portion.

---

### **What Does `/26` Mean?**

The `/26` indicates that **26 bits** out of the 32 bits in the IP address are reserved for the **network ID**:

- The first 26 bits are the same for all devices in this subnet.
- The remaining **6 bits** are available for assigning host addresses (devices).

### Subnet Mask for `/26`:

In binary, the subnet mask is:

```
Copy code
11111111.11111111.11111111.11000000

```

Converted to decimal, it becomes: `255.255.255.192`.

---

### **Calculating the Subnets**

The **subnet mask (`/26`)** divides the IP range into blocks of **64 addresses**.

### Formula for Calculating Subnet Size:

```java
java
Copy code
Subnet Size = 2^(32 - Subnet Mask Bits)
Subnet Size = 2^(32 - 26) = 64 addresses

```

### Example Subnets:

1. **Subnet 1**: `192.168.0.0/26`
    - Network ID: `192.168.0.0`
    - Broadcast Address: `192.168.0.63`
    - Usable Host IPs: `192.168.0.1` to `192.168.0.62`.
2. **Subnet 2**: `192.168.0.64/26`
    - Network ID: `192.168.0.64`
    - Broadcast Address: `192.168.0.127`
    - Usable Host IPs: `192.168.0.65` to `192.168.0.126`.

---

### **How Broadcasts Stay Within Subnets**

- A **broadcast address** is the last IP in the subnet. It is used to send messages to all devices in the same subnet.
- **Example**:
    - In Subnet 1 (`192.168.0.0/26`), the broadcast address is `192.168.0.63`. Broadcasts sent here do **not** reach Subnet 2.
    - In Subnet 2 (`192.168.0.64/26`), the broadcast address is `192.168.0.127`. Broadcasts stay confined to Subnet 2.

This is because devices in Subnet 1 and Subnet 2 have different **network IDs** and do not share the same broadcast domain.

---

### **Address Format Summary**

| **Subnet** | **Network ID** | **Broadcast Address** | **Usable Host Range** |
| --- | --- | --- | --- |
| Subnet 1: `/26` | `192.168.0.0` | `192.168.0.63` | `192.168.0.1` to `192.168.0.62` |
| Subnet 2: `/26` | `192.168.0.64` | `192.168.0.127` | `192.168.0.65` to `192.168.0.126` |

Each subnet is isolated by its **network ID** and **broadcast domain**, ensuring that traffic in one subnet does not interfere with another.

[CIDR Full Form - GeeksforGeeks](https://www.geeksforgeeks.org/cidr-full-form/)

## Networking Concepts

### ARP - Address Resolution Protocol

- arp is used to convert or resolves the ip address to mac address , arp is used in the data link layer in osi model
- In every system there is arp cache
- There two types of arp static and dynamic
- dynamic is like it dynamically map the mac address to ip address
- where static arp is we manually map the ip to mac address by using arp cmd line interface

### OSI

## Data Format

![image 3.png](image%203.png)

![image.png](image%201%201.png)

![image.png](image%202.png)