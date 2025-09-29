---
title: Signed and Unsigned value
draft: false
tags:
  - operating_system
  - os
---
 
# 📘 Two’s Complement & Signed Integers

## 🔹 1. Unsigned vs Signed Integers

- **Unsigned (n bits)**: Range = `0` to `2^n - 1`
    
- **Signed (n bits, two’s complement)**: Range = `-2^(n-1)` to `2^(n-1) - 1`
    

---

## 🔹 2. Why `n-1` in the exponent?

- Total bit patterns with `n` bits = `2^n`
    
- Two’s complement splits them:
    
    - `MSB = 0` → non-negative (0 and positives) → `2^(n-1)` values
        
    - `MSB = 1` → negatives → `2^(n-1)` values
        
- Because `0` is included in the non-negative half, **positive max = `2^(n-1) - 1`**
    

📌 **Final formula:**

`Range = -2^(n-1)  to  2^(n-1) - 1`

---

## 🔹 3. Why one fewer positive value?

- Negatives: from `-2^(n-1)` to `-1` → total `2^(n-1)` numbers
    
- Non-negatives: from `0` to `2^(n-1)-1` → total `2^(n-1)` numbers
    
- **0 takes one slot** on the positive side → so positive side has **one fewer value**
    

Example (4-bit signed):

`Range = -8 to +7`

---

## 🔹 4. Two’s Complement Process

To represent `-X` in n-bit binary:

1. Write `X` in binary
    
2. Invert all bits (one’s complement)
    
3. Add 1
    

---

### Example: `-4` in 8-bit

`4  = 00000100 invert → 11111011 +1     → 11111100`

So:

`-4 = 11111100 (8-bit two’s complement)`

---

## 🔹 5. Subtraction with Two’s Complement

Subtraction `A - B` is done as:

`A - B = A + (two’s complement of B)`

### Example: `8 - 4`

`8  = 00001000 4  = 00000100 -4 = 11111100  8 + (-4): 00001000 +11111100 --------- 00000100  = 4`

✅ Correct result.

---

## 🔹 6. MSB (Most Significant Bit)

- **Definition:** The leftmost bit in a binary number.
    
- In **unsigned integers**: it just represents the largest place value.
    
- In **signed integers (two’s complement)**: it indicates the **sign**.
    
    - `0` → number is non-negative
        
    - `1` → number is negative
        

### Example: 8-bit binary `10110010`

- MSB = `1` → negative
    
- Two’s complement → value = `-78`
    

### Example: 4-bit signed integers

|Binary|MSB|Decimal|
|---|---|---|
|`0111`|0|+7|
|`0000`|0|0|
|`1000`|1|-8|
|`1111`|1|-1|

---

## 🔹 7. LSB (Least Significant Bit)

- **Definition:** The rightmost bit in a binary number.
    
- It represents the **smallest place value (2^0 = 1)**.
    
- Useful in checking parity (even/odd numbers).
    

Example:

`Binary 0111 → LSB=1 (odd number, decimal 7) Binary 0110 → LSB=0 (even number, decimal 6)`

---

## 📝 Summary

- **Range formula:** `-2^(n-1)` to `2^(n-1) - 1`
    
- **MSB:** sign indicator (0=positive, 1=negative) in signed integers
    
- **Two’s complement:** invert + add 1
    
- **Subtraction:** done via addition of two’s complement
    
- Positive side has **one fewer value** than negative side because `0` is included in non-negatives