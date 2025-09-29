---
title: Commit Message Good Practice
date: 2025-09-22
draft: true
tags:
  - git
  - good_practices
---

Here are some **best practices** followed in industry (inspired by **Conventional Commits** + real-world usage):

---

## 🔹 General Guidelines

1. **Use the imperative mood** (as if giving a command):
    
    ✅ `Add user authentication`
    
    ❌ `Added user authentication`
    
    ❌ `Adds user authentication`
    
2. **Keep the subject short & focused** (~50 characters).
    
    If more detail is needed, use the message body.
    
3. **Capitalize the first letter** of the subject.
4. **No period (.) at the end** of the subject line.
5. **Explain *what* and *why*, not just how** in the body (if needed).
    - Subject → high-level change.
    - Body → reasoning, context, breaking changes.
6. **Reference issues/tickets** if applicable:
    
    Example: `Fix login redirect (#123)`.
    

---

## 🔹 Recommended Commit Message Format

```
<type>(optional scope): <short summary>

[optional body]

[optional footer(s)]

```

### Types (common ones):

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code change that’s not a feature/bugfix
- **perf**: Performance improvement
- **test**: Adding/fixing tests
- **chore**: Maintenance tasks (build, deps, configs, etc.)

---

## 🔹 Examples

✅ Good:

```
feat(auth): add JWT authentication for login

- Implement token generation and validation
- Store tokens securely in cookies

```

```
fix(call-service): handle null prospectId in call details

This prevents crashes when Exotel returns empty prospect data.

```

```
docs(readme): update setup instructions for MongoDB

```

---

## 🔹 TL;DR

- **Format**: `<type>(scope): short description`
- **Tone**: Imperative mood (“Add”, “Fix”, not “Added”, “Fixed”)
- **Clarity**: Explain *why* if it’s not obvious
- **Consistency**: Stick to the same convention across the team