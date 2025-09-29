---
title: Architecture and Algorithms of  Generative AI and Predictive AI
date: 2025-09-23
draft: true
tags:
  - AI
  - genai
  - predictive_ai
---

Most generative AI models rely on these architectures:

## **Diffusion models**

Diffusion models consist of two process , first one is forward process and the second one is reverse process. In forward process it adds noise's to the training data until it is random and unrecognizable data . In reverse process it will recreate the training data by removing noise by itself and create a new content

### 🔊 What "Noise" Means

- **Noise = Random Disturbance**  
    Imagine you take a clear photograph and start sprinkling random white, black, or colored dots over it. If you keep adding enough of these dots, eventually the original picture becomes impossible to recognize — it just looks like static on a TV screen.
    
- **In Machine Learning Terms:**  
    Noise is usually **random numbers** (often sampled from a Gaussian/normal distribution) added to the original data, pixel by pixel (or value by value), to "destroy" the structure gradually.
    

---

### 🎯 Why Add Noise?

Diffusion models are trained in two steps:

1. **Forward Process:**  
    Take real training data and gradually add noise step by step until it becomes pure noise.  
    (Think of this as "scrambling" the data.)
    
2. **Reverse Process (Learning):**  
    Train a neural network to undo this process — step by step — so it learns how to **reconstruct the original image/content** from pure noise.

## Generative  Adversarial Networks

**Generative Adversarial Networks (GANs)** use two neural networks — a **Generator** and a **Discriminator** — that are trained together in a competitive process:

- **Generator:** Creates **new data samples** that mimic the real dataset (e.g., generating realistic images, text, or audio).
    
- **Discriminator:** Evaluates whether the input data is **real** (from the training set) or **fake** (produced by the Generator).
    

During training:

- The **Generator** improves at producing more realistic content that can fool the Discriminator.
    
- The **Discriminator** improves at correctly distinguishing real data from fake data.
    

This back-and-forth process (called **adversarial training**) continues until the Generator produces outputs that are so realistic that the Discriminator can no longer easily tell them apart from real data.


