---
title: RabbitMQ Learnings
draft: false
tags:
  - "#message_broker"
  - message_queues
  - backend
  - system_design
---

## Workers vs Consumers

In RabbitMQ:

### 1. **Consumer**

- A **consumer** is any application/service that subscribes to a queue and processes messages.
- It connects to a queue, receives messages, and acknowledges them.
- Can be part of:
  - Web services
  - Background processors
  - Any asynchronous system

### 2. **Worker**

- A **worker** typically refers to a background job processor.
- It **acts as a consumer**, but the term emphasizes the **work done** after receiving the message.

**Summary**:
- A **worker** is often a type of **consumer**, but not all consumers are considered workers.
- Use "consumer" when referring to RabbitMQ API concepts; "worker" is more of an application-level term.

---

## RabbitMQ Core Abstractions

### 1. **Producer**
- Sends messages to **exchanges** (not directly to queues).

### 2. **Exchange**
- Routes messages to queues using rules and routing keys.
- **Types**:
  - **Direct**: Exact match routing key
  - **Topic**: Pattern-based (wildcards like `*` or `#`)
  - **Fanout**: Broadcast to all bound queues
  - **Headers**: Based on headers

### 3. **Queue**
- Stores messages until consumed.
- FIFO by default.
- Attributes:
  - `durable`: survives broker restart
  - `exclusive`: restricted to one connection
  - `autoDelete`: deleted when last consumer disconnects

### 4. **Binding**
- Connects an exchange to a queue using a binding key.

### 5. **Consumer**
- Retrieves and processes messages from queues.

### 6. **Message**
- **Body**: Payload
- **Properties**: Metadata (e.g., headers, delivery mode)

### 7. **Connection and Channel**
- **Connection**: TCP connection between app and RabbitMQ.
- **Channel**: Lightweight virtual connection on a single TCP connection.

### 8. **Virtual Host (vhost)**
- Namespace to isolate exchanges, queues, etc.

### 9. **Broker**
- The RabbitMQ server itself.

### 10. **Routing Key**
- Used by producers to guide message routing via exchanges.

### 11. **Acknowledgment (Ack)**
- Sent by consumers after successfully processing messages.

### 12. **Dead Letter Exchange (DLX)**
- Captures undelivered or rejected messages.

### 13. **Prefetch Count**
- Limits the number of unacknowledged messages sent to consumers.

---

## 🧪 Direct Exchange Example in Node.js

### Setup

**Exchange:** `direct_logs`  
**Queues:** `errorQueue`, `infoQueue`, `warningQueue`

Routing:
- `error` → errorQueue
- `info` → infoQueue
- `warning` → warningQueue

### 1. Producer Code

```js
const amqp = require('amqplib');

async function produceMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'direct_logs';
  const msg = process.argv.slice(2).join(' ') || 'Hello World!';
  const severity = process.argv[2] || 'info';

  await channel.assertExchange(exchange, 'direct', { durable: false });

  channel.publish(exchange, severity, Buffer.from(msg));
  console.log(`[x] Sent ${severity}: '${msg}'`);

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}

produceMessage();
```

### 2. Consumer Code

```js
const amqp = require('amqplib');

async function consumeMessage(routingKey) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'direct_logs';
  await channel.assertExchange(exchange, 'direct', { durable: false });

  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`[x] Waiting for messages in ${q.queue}`);

  await channel.bindQueue(q.queue, exchange, routingKey);

  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      console.log(`[x] Received ${routingKey}: ${msg.content.toString()}`);
    }
  }, { noAck: true });
}

consumeMessage(process.argv[2] || 'info');

```

## Queue Attributes Explained

### 1. Durable

```js
channel.assertQueue('queue_name', { durable: true });`
```

- Queue survives RabbitMQ restarts.
- To persist messages too:

```js
channel.sendToQueue('queue_name', Buffer.from('data'), { persistent: true });
```

### 2. Exclusive

```js
channel.assertQueue('queue_name', { exclusive: true });
```

- Only available to the connection that created it.
    
- Deleted when that connection closes.

### 3. Auto-Delete

```js
channel.assertQueue('queue_name', { autoDelete: true });
```

- Automatically deleted when the last consumer disconnects.

### Combined Example:


```js
channel.assertQueue('queue_name', {   durable: true,   exclusive: true,   autoDelete: true });
```

---

## 🧵 Connection vs Channel in RabbitMQ

### Connection

- A **TCP connection** between your app and RabbitMQ.
    
- Heavyweight: uses system resources.

### Channel

- A **virtual, lightweight connection** over a TCP connection.
    
- Multiple channels can exist on one connection.
    

### Analogy

- **Connection** = Highway
    
- **Channel** = Lanes on that highway
    
- Multiple lanes (channels) can carry different traffic (tasks) efficiently.
    

### Node.js Example

#### Producer (Channel 1)

j

```js
const amqp = require('amqplib');  
async function producer() {   
	const connection = await amqp.connect('amqp://localhost');   
	const channel = await connection.createChannel();    
	await channel.assertQueue('test_queue', { durable: false });     
	channel.sendToQueue('test_queue', Buffer.from('Hello, RabbitMQ!'));     console.log("[x] Sent message");    
	setTimeout(() => 
	   {     
	    channel.close();     
	    connection.close();   
	   }, 500); 
}  
producer();
```

#### Consumer (Channel 2)

```js
const amqp = require('amqplib');

async function consumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue('test_queue', { durable: false });

  console.log("[x] Waiting for messages in test_queue");

  channel.consume('test_queue', (msg) => {
    console.log(`[x] Received: ${msg.content.toString()}`);
  }, { noAck: true });
}

consumer();

```

### Summary

|Concept|Description|
|---|---|
|Connection|TCP link to RabbitMQ (expensive, fewer is better)|
|Channel|Lightweight virtual link on top of connection|
|Use Case|Use **channels** for pub/sub logic over one connection|

---

**Tip**: Always reuse a single connection and use multiple channels in production for better performance and resource management