---
title: Rate Limiter
draft: false
tags:
  - rate_limiter
  - system_design
---
 
The rest of your content lives here. You can use **Markdown** here :)
# Rate Limiter Design

## 1) Goals & Requirements

- **Scope**: per-user, per-API-key, per-IP, or global?  
  → Assume **per-API-key**
- **Limits**: e.g., `100 requests / minute` with burst up to `200`
- **Behavior on exceed**: reject (`HTTP 429`), queue, or degrade?  
  → Use **reject**
- **Distributed**: single-process (dev) or multi-instance (prod)?  
  → Assume **multi-instance**
- **Strictness**: hard limit vs soft smoothing (token bucket allows bursts)

---

## 2) Common Algorithms

### Fixed Window Counter
- **How**: Count requests in fixed time buckets (e.g., per minute).  
- ✅ Pros: Easy, low cost.  
- ❌ Cons: Bursty at boundaries.  
- **Use when**: simple and low-precision is OK.

### Sliding Window Log
- **How**: Store timestamps of requests, count those within last interval.  
- ✅ Pros: Accurate.  
- ❌ Cons: Storage heavy (one entry per request).  
- **Use when**: strict fairness and accuracy matter.

### Sliding Window Counter (approx)
- **How**: Keep counts for current & previous window, weight them.  
- ✅ Pros: Less memory, approximate.  
- **Use when**: low storage, approximation acceptable.

### Token Bucket
- **How**: Tokens refill at rate *r*; requests consume tokens.  
- ✅ Pros: Smooth limiting, supports bursts.  
- ❌ Cons: Needs atomic ops in distributed setups.

### Leaky Bucket
- **How**: Queue-like constant outflow.  
- ❌ Less common for API limiting.

---

### ✅ Recommendation
- **Dev (single-node)** → In-memory **Token Bucket**  
- **Prod (multi-instance)** →  
  - Redis-backed sliding window (sorted set) **or**  
  - Redis token-bucket via Lua (atomic, less memory)

---

## 3) Rate Limit Response Headers

Best practice response headers:
- `X-RateLimit-Limit`: maximum requests in window
- `X-RateLimit-Remaining`: remaining requests in current window
- `X-RateLimit-Reset`: epoch seconds until limit resets

On `429` return:
- `Retry-After`: seconds until allowed.

---

## 4) In-memory Token Bucket (TypeScript)

```ts
// tokenBucket.ts
export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,        // max tokens (burst)
    private refillRatePerSec: number // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now() / 1000;
  }

  private refill() {
    const now = Date.now() / 1000;
    const elapsed = Math.max(0, now - this.lastRefill);
    const tokensToAdd = elapsed * this.refillRatePerSec;
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  public tryRemove(count = 1): boolean {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  public getRemaining() {
    this.refill();
    return this.tokens;
  }
}
```


## Express Middleware

```ts
import { Request, Response, NextFunction } from "express";
import { TokenBucket } from "./tokenBucket";

const buckets = new Map<string, TokenBucket>();

export function rateLimitMiddleware(
  capacity = 100,
  refillRatePerSec = 100 / 60
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers["x-api-key"] as string || req.ip;
    let bucket = buckets.get(key);

    if (!bucket) {
      bucket = new TokenBucket(capacity, refillRatePerSec);
      buckets.set(key, bucket);
    }

    if (bucket.tryRemove(1)) {
      res.setHeader("X-RateLimit-Limit", capacity);
      res.setHeader("X-RateLimit-Remaining", Math.floor(bucket.getRemaining()));
      const secondsToFull = Math.ceil((capacity - bucket.getRemaining()) / refillRatePerSec);
      res.setHeader("X-RateLimit-Reset", Math.floor(Date.now()/1000) + secondsToFull);
      return next();
    } else {
      res.setHeader("Retry-After", "1");
      res.status(429).send({ error: "Too Many Requests" });
    }
  };
}
```

## Redis-backed Sliding Window (accurate + distributed)

Steps per request:

1. Remove old timestamps (`ZREMRANGEBYSCORE`)
    
2. Add current timestamp (`ZADD`)
    
3. Count requests (`ZCARD`)
    
4. Set TTL for cleanup (`PEXPIRE`)

```ts
import Redis from "ioredis";
const redis = new Redis({ host: '127.0.0.1', port: 6379 });

async function allowRequest(key: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const zkey = `rl:${key}`;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(zkey, 0, windowStart);
  pipeline.zadd(zkey, now, `${now}:${Math.random()}`);
  pipeline.zcard(zkey);
  pipeline.pexpire(zkey, Math.ceil(windowMs / 1000) + 1);
  const results = await pipeline.exec();

  const currentCount = Number(results[2][1]);
  return { allowed: currentCount <= maxRequests, currentCount, resetAfterMs: windowMs - (now - windowStart) };
}

export function redisSlidingWindowMiddleware(maxRequests = 100, windowMs = 60_000) {
  return async (req, res, next) => {
    const key = req.headers['x-api-key'] as string || req.ip;
    const { allowed, currentCount, resetAfterMs } = await allowRequest(key, maxRequests, windowMs);

    res.setHeader("X-RateLimit-Limit", String(maxRequests));
    res.setHeader("X-RateLimit-Remaining", String(Math.max(0, maxRequests - currentCount)));
    res.setHeader("X-RateLimit-Reset", String(Math.floor((Date.now() + resetAfterMs) / 1000)));

    if (!allowed) {
      res.setHeader("Retry-After", String(Math.ceil(resetAfterMs / 1000)));
      return res.status(429).send({ error: "Too Many Requests" });
    }
    return next();
  };
}

```


## 6) Redis Token Bucket (Lua, atomic)

Lua script (atomic refill + consume):

```ts
-- KEYS[1] => key
-- ARGV[1] => capacity
-- ARGV[2] => refill_rate_per_ms
-- ARGV[3] => now_ms
-- ARGV[4] => requested_tokens

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "tokens", "last")
local tokens = tonumber(data[1]) or capacity
local last = tonumber(data[2]) or now

local elapsed = math.max(0, now - last)
local add = elapsed * refill_rate
tokens = math.min(capacity, tokens + add)
last = now

local allowed = 0
if tokens >= requested then
  tokens = tokens - requested
  allowed = 1
end

redis.call("HMSET", key, "tokens", tokens, "last", last)
redis.call("PEXPIRE", key, math.ceil((capacity/refill_rate) * 2))
return { allowed, tokens }

```

## 7) Authentication & Keying

- Rate limit should be **per authenticated entity** (API key / user ID).
    
- Use IP-based only for unauthenticated routes.
    

---

## 8) Tuning & Ops Notes

- **Burst vs steady**: adjust capacity + refill rate.
    
- **Backoff**: clients should use exponential backoff on 429.
    
- **Metrics**: track `rate_limit_hits`, `rejections`, Redis latency/errors.
    
- **Monitoring**: Redis memory, latency.
    
- **Per-endpoint limits**: e.g., `/login` vs `/data`.
    
- **Grace periods**: whitelist trusted services.
    
- **Testing**: load test with k6/vegeta.
    

---

## 9) Which Should You Use?

- **Dev/single-node** → in-memory Token Bucket
    
- **Prod, moderate accuracy** → Redis Token Bucket (Lua)
    
- **Prod, strict fairness** → Redis Sliding Window
    

---

## 10) Quick Checklist

-  Define scope & limits per key
    
-  Pick algorithm (Redis token-bucket recommended)
    
-  Implement Lua or pipeline for atomic ops
    
-  Add middleware with headers + `429 Retry-After`
    
-  Add unit + integration tests
    
-  Add metrics & alerts
