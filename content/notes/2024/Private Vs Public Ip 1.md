---
title: Private Vs Public Ip 1
date: 2025-09-22
draft: true
tags:
  - networking
  - ip
---

### **Public IP vs. Private IP: Key Differences**

| **Feature**     | **Public IP**                            | **Private IP**                                                                                                                  |
| --------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**       | Used on the internet (globally unique)   | Used within a local network (not routable on the internet)                                                                      |
| **Assigned by** | ISP (Internet Service Provider)          | Router or local network admin                                                                                                   |
| **Purpose**     | Identifies a device on the internet      | Identifies a device within a LAN (Local Area Network)                                                                           |
| **Range**       | Any IP not reserved for private use      | **Private IP ranges:**• **`10.0.0.0 – 10.255.255.255`**• **`172.16.0.0 – 172.31.255.255`**• **`192.168.0.0 – 192.168.255.255`** |
| **Example**     | **`203.0.113.45`** (assigned by ISP)     | **`192.168.1.10`** (assigned by router)                                                                                         |
| **Security**    | Exposed to the internet (needs firewall) | Only accessible within the local network                                                                                        |
| **Cost**        | Usually paid (dynamic or static IP)      | Free (used internally)                                                                                                          |

### **How They Work Together**

- Your **router** has a **public IP** (given by the ISP) to communicate with the internet.
- Devices inside your home/office (like laptops, phones) get **private IPs** from the router.
- **NAT (Network Address Translation)** allows multiple devices with private IPs to share one public IP when accessing the internet.

### **Why Private IPs Exist?**

- **Saves IPv4 addresses** (since many devices can share one public IP).
- **Enhances security** (private IPs are hidden from the internet).
- **Prevents IP conflicts** (private ranges are reusable in different networks).

### **How to Check Your IPs?**

- **Public IP:** Visit [whatismyip.com](https://whatismyip.com/)
- **Private IP:**
    - **Windows:** **`ipconfig`** in Command Prompt
    - **Mac/Linux:** **`ifconfig`** or **`ip a`** in Terminal

