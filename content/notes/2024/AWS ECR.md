---
title: AWS ECR
date: 2025-09-21
draft: false
tags:
  - aws
  - devops
  - ecr
---


## 🧊 What is **AWS ECR**?

**ECR (Elastic Container Registry)** is a **fully managed container image registry** provided by **Amazon Web Services (AW**.

### 🔑 Key Features:

- Stores, manages, and deploys **Docker container images**.
- Integrated with other AWS services like **ECS, EKS, Lambda**.
- Supports both **private and public** registries.
- **Highly available and secure** (integrates with IAM for access control).

---

## 🐳 AWS ECR vs Docker Hub

| Feature | **AWS ECR** | **Docker Hub** |
| --- | --- | --- |
| **Ownership** | Amazon | Docker Inc. |
| **Integration** | Deep integration with AWS (ECS, EKS, Lambda) | Works with all environments |
| **Access Control** | IAM roles/policies | Username/password or tokens |
| **Pricing** | Pay per GB (storage and transfer) | Free tier, then subscription plans |
| **Private Repos** | Unlimited (charged) | Limited on free tier |
| **Performance** | Optimized for AWS networks (faster pulls within AWS) | Public cloud, might be slower for AWS workloads |
| **Security** | IAM + KMS + scan on push (with image scanning) | Basic auth + scanning (Pro & Team plans) |

