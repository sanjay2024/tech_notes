---
title: Mongodb Connection and mongoose behind the scene
draft: false
tags:
  - database
  - backend
---

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, which simplifies how you interact with MongoDB. It provides an abstraction over MongoDB's native driver to work with collections and documents in a more structured way.

Here's a detailed breakdown of how MongoDB connection works with Mongoose, the behind-the-scenes processes, and how `connectOptions` influence these connections.

### 1. **Connecting to MongoDB with Mongoose**

When you connect to MongoDB with Mongoose, you typically use the `mongoose.connect()` method, which establishes a connection between your Node.js application and the MongoDB server.

Example:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
```

The string `'mongodb://localhost:27017/mydatabase'` is the **connection string** that points to the MongoDB instance running on `localhost` at port `27017`. It specifies the database (`mydatabase`) that you are connecting to.

### Behind the scenes process:

1. **DNS Resolution & Connection**: When the `mongoose.connect()` is called, Mongoose uses the MongoDB Node.js driver under the hood. The driver resolves the host name (e.g., `localhost`) to its IP address.
2. **Establishing Connection**: The driver then opens a TCP connection to the MongoDB instance. It sends authentication credentials (if needed) and opens communication.
3. **Connection Pooling**: Mongoose creates a **connection pool**. A connection pool is a set of reusable connections between your application and MongoDB, which improves performance by avoiding the overhead of opening and closing connections for each request. The size of the pool can be controlled by the `poolSize` option in `connectOptions`.
4. **Handshaking**: The MongoDB server and Mongoose driver perform a handshake to ensure compatibility (e.g., MongoDB version, authentication, and protocol version).

Once the connection is established, Mongoose can perform read and write operations using schemas and models.

### 2. **How Mongoose Reads and Writes Data**

Mongoose uses **Schemas** and **Models** to handle the interaction between your application and MongoDB.

- **Schema**: Defines the structure of a MongoDB document. It includes data types, validation rules, and default values.
- **Model**: A wrapper for the MongoDB document that provides an interface to interact with the database (read/write).

**Writing Data**:
When you create a new document in MongoDB via Mongoose, here’s what happens:

1. You create a new instance of a model:
```javascript
const User = mongoose.model('User', new mongoose.Schema({ name: String }));
const newUser = new User({ name: 'Alice' });
```

2. When you call `newUser.save()`, Mongoose:
    - Validates the document based on the schema.
    - Converts the JavaScript object into BSON (Binary JSON format).
    - Sends an `insertOne` operation to MongoDB.
    - MongoDB writes the document to its collection, using the WiredTiger storage engine to persist the data.

**Reading Data**:

When you query MongoDB using Mongoose (e.g., `User.find()`):

1. Mongoose compiles the query into MongoDB's native query language.
2. It sends a `find` operation over the established connection.
3. The MongoDB server retrieves the document from storage, converts it from BSON to JSON, and returns it.
4. Mongoose converts the JSON back into a JavaScript object that conforms to the schema.

### 3. **`connectOptions` in Mongoose**

The `connectOptions` parameter in `mongoose.connect()` allows you to configure the connection between your application and MongoDB. Some important options:

- **useNewUrlParser**: This option tells Mongoose to use the new MongoDB connection string parser. The old parser was deprecated due to edge-case handling issues.
- **useUnifiedTopology**: This option removes support for several connection mechanisms that MongoDB drivers previously supported but are no longer needed. It enables the new Server Discovery and Monitoring engine, improving how the driver handles failover and replica sets.
- **useCreateIndex**: Ensures Mongoose uses MongoDB's `createIndex()` instead of `ensureIndex()`. This is because `ensureIndex()` was deprecated in MongoDB.
- **useFindAndModify**: This prevents Mongoose from using the deprecated `findAndModify()` method for update operations. Instead, it uses newer MongoDB functions like `findOneAndUpdate()`, `findOneAndRemove()`, etc.
- **poolSize**: This option sets the maximum number of sockets (connections) in the MongoDB connection pool. A larger pool size allows more concurrent operations, but consumes more memory.

```javascript
	poolSize: 10 // The default is 5
```

- **socketTimeoutMS**: Specifies the time in milliseconds a socket stays open without activity before closing. This prevents unnecessary connections from staying open too long.
- **connectTimeoutMS**: The amount of time Mongoose will wait to establish a connection before timing out. If MongoDB is down or unreachable, this controls how long Mongoose waits before failing.

```javascript
connectTimeoutMS: 30000 // 30 seconds
```

- **retryWrites**: This enables retryable writes, which allows MongoDB to retry certain write operations automatically if they fail due to transient network errors.

```javascript
	retryWrites: true
```

- **authSource**: Defines which database the credentials are associated with when connecting to a MongoDB instance.

 ```javascript
	 authSource: 'admin'
 ```

### Example of `connectOptions`:

```javascript

mongoose.connect('mongodb://username:password@localhost:27017/mydatabase', {
    useNewUrlParser: true,         // Use the new MongoDB connection string parser
    useUnifiedTopology: true,      // Use the new server topology engine
    useCreateIndex: true,          // Use `createIndex()` instead of deprecated `ensureIndex()`
    useFindAndModify: false,       // Use `findOneAndUpdate()` rather than deprecated `findAndModify()`
    poolSize: 10,                  // Max number of socket connections
    connectTimeoutMS: 30000,       // Wait up to 30 seconds for a connection
    retryWrites: true,             // Enable retryable writes
    authSource: 'admin',           // Authenticate with the admin database
});

```

### 4. **Process Flow of a Query in Mongoose**

1. **Connection Established**: Once the connection is opened, Mongoose sends the query (e.g., `find`, `insertOne`, `update`) to the MongoDB server using a pooled connection.
2. **MongoDB Execution**: MongoDB processes the query using its internal mechanisms (indexing, query planner, execution engines).
3. **Response Sent**: MongoDB sends the query result (in BSON) over the connection.
4. **Mongoose Response Handling**: Mongoose converts the result into a JavaScript object and returns it.

### Summary

Mongoose simplifies MongoDB interaction by abstracting the connection process and data management. Under the hood, it uses the MongoDB Node.js driver for communication. The `connectOptions` are used to fine-tune the connection behavior, such as pooling, timeouts, and retry mechanisms, which can impact performance and reliability.


**Connection pooling** is a technique used to manage multiple database connections efficiently. Instead of opening and closing a new database connection for each request or query, a connection pool maintains a set of open, reusable connections. When a new query or operation needs a connection, the pool provides an already established connection from its pool, saving the overhead of establishing a new connection. Once the operation is done, the connection is returned to the pool for reuse by another query.

### How Connection Pooling Works:

1. **Creation**: When the application starts, a pool of database connections is created. The size of the pool (number of connections) is usually predefined by parameters like `poolSize`.
2. **Reuse**: When the application makes a request to the database, instead of opening a new connection, it checks the pool. If there is an available connection, it is reused for the new request.
3. **Return to Pool**: After the database operation is completed, the connection is not closed. Instead, it is returned to the pool and can be reused for the next request.
4. **Connection Limits**: The pool has a limited number of connections (e.g., 10 connections). If all connections in the pool are busy and a new request comes in, the application can either:
    - Wait until a connection becomes available.
    - Open a new connection (if allowed by the pool configuration).
    - Fail with a timeout or an error if no connections are available within a certain time frame.

### Benefits of Connection Pooling:

1. **Performance Improvement**: Creating and closing database connections is expensive in terms of time and resources. Reusing connections reduces the overhead of establishing new connections, leading to faster response times.
2. **Resource Management**: By limiting the number of active connections (through the `poolSize`), connection pooling helps manage server resources, preventing the database from being overwhelmed by too many connections.
3. **Scalability**: Pooling allows for better handling of concurrent database requests by reusing the available connections, enabling the application to scale more efficiently.

### Mongoose and Connection Pooling:

Mongoose, like many database libraries, uses connection pooling by default through the underlying MongoDB Node.js driver.

### Pooling in Mongoose:

- Mongoose manages the pool of connections automatically when you connect to the MongoDB server.
- The number of connections in the pool can be configured with the `poolSize` option.

Example:

```javascript
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    poolSize: 10, // Maximum 10 concurrent connections in the pool
    useNewUrlParser: true,
    useUnifiedTopology: true
});

```

In this example, Mongoose maintains a pool of 10 connections that are reused throughout the lifetime of the application. When a new query is executed, it uses one of the available connections from the pool, and when the query finishes, that connection is returned to the pool for future use.

### Key Configuration Options for Pooling in Mongoose:

- **`poolSize`**: Specifies the maximum number of connections in the pool. The default is 5, but you can adjust it based on the expected workload.
- **`socketTimeoutMS`**: Defines how long a connection should remain open while idle before being closed.
- **`connectTimeoutMS`**: Sets how long to wait when establishing a new connection before timing out.

### Example of Connection Pooling Workflow:

1. The application starts and initializes the connection pool (e.g., 10 connections).
2. Each time the application needs to perform a database operation, it requests a connection from the pool.
3. If there is an available connection in the pool, it is assigned to handle the request.
4. Once the operation is done, the connection is returned to the pool.
5. If all connections are in use, new requests either wait for a free connection or fail with a timeout if no connection is available within a defined period.

### Summary:

Connection pooling is a critical technique for optimizing database performance and managing resources effectively. By reusing established connections, it reduces the overhead of connecting and disconnecting from the database and provides faster response times in high-concurrency environments.

### behaviour of Connections in a Pool

1. **Initial State**:
When the connection pool is first created (e.g., when the application starts), not all the connections are immediately opened. Instead, connections are opened **on-demand** when queries or operations are made, and the pool grows up to its maximum size (`poolSize`).
2. **Active and Idle Connections**:
    - Some connections in the pool will be **active** (open and in use) when queries or operations are being processed.
    - Others may be **idle** (open but not currently in use) if no queries are running. These idle connections remain open, waiting for the next operation to use them.
3. **Connection Timeout**:
Idle connections may not remain open forever. Depending on the configuration, if a connection stays idle (unused) for too long, it might be closed by the pool to free up resources. This can be controlled by settings like `socketTimeoutMS` or `idleTimeout`.
4. **Re-opening Connections**:
If a connection is closed due to idling or other factors, the pool can automatically re-open a new connection when needed. For example, if all current connections are closed but a new query comes in, the pool will create and open a new connection (up to the maximum `poolSize`).

### Key Options Controlling Connection Pooling Behavior:

- **`poolSize`**: Defines the maximum number of connections that can exist in the pool at any given time. This controls the upper limit of connections that can remain open.
- **`socketTimeoutMS`**: Determines how long a connection remains open while idle before being considered inactive and potentially closed by the pool. If a connection remains idle for longer than this timeout, it is closed.
- **`connectTimeoutMS`**: Defines the maximum time allowed to establish a new connection before it times out.
- **`maxIdleTimeMS`**: Sets the maximum time that a connection can remain idle before being closed. This is used to ensure that idle connections don't stay open forever and consume resources unnecessarily.

### Example of Managing Connection Timeout in Mongoose:

You can configure the behavior of the connections using these options in Mongoose:

```jsx
javascript
Copy code
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    poolSize: 10,             // Maximum 10 concurrent connections
    socketTimeoutMS: 30000,    // Close idle connections after 30 seconds
    connectTimeoutMS: 10000,   // Wait up to 10 seconds for a connection
    maxIdleTimeMS: 60000       // Maximum time a connection can be idle before closing
});

```

### Summary:

Not all connections in the pool remain open at all times. Connections are opened when needed and can remain open while idle. However, idle connections may eventually be closed if they are not used for a specified time, depending on the pool's configuration. When the pool needs more connections (up to the `poolSize`), it will open them as necessary.