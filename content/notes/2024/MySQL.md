---
title: MySQL
date: 2025-09-22
draft: true
tags:
  - database
  - sql
  - mysql
---

## Basics Commands in MySql

1. **No Default Database**: After connecting, you must run **`USE database_name;`** or include the database in your connection command (e.g., **`mysql -u user -p database_name`**).
2. **System Databases**: MySQL comes with pre-built system databases like:
    - **`mysql`**: Stores user privileges, stored procedures, and other system data.
    - **`information_schema`**: Provides metadata about database objects.
    - **`performance_schema`**: Monitors server performance.
    - **`sys`**: Offers a simplified interface to **`performance_schema`**.

## SQL SERVER LEVEL COMMANDS

1. mysql -u [username] -p [password] → to open the mysql command to line to communicate with mysql server

2. create user in mysql server which is stored in mysql table
```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password'
```

3. To grant the `privilege` for the particular user

 ```sql
    GRANT PRIVILEGE ON [database].[table] TO '[username]'@'[host]';
    ```

here  if the you specify `*.*`  instead of database and table then the user will have the all the privilege to all the database and the tables

we can also mention which are all command the user can perform

 ```sql
     GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD ON database.tables TO 'username'@'host';
    ```


1. To revoke the permission we can use REVOKE Command

```sql 
    REVOKE 
```

2. Creation of database

```sql
    create database [database_name]
```

in the above query the database will created , but if the database of same name is already there then it will throw the error . to avoid that we want to check if the name is already there if not create the database

```jsx
create database if not exists klentyMain
```


## Types of SQL Queries

1. DDL - Data Definition Language. (creation and deletion schema / table)
2. DML - Data Manipulation Language (Basic Curd Commands)
3. DQL - Data Query Language
4. DCL - Data Control Language
5. TCL - Transaction Control Language 

## Data Definition Language

Data Definition Language defines the actual creation modifications, renaming, and dropping (deleting) of the tables, rows, or columns. This type uses basic queries. Any creation of a table starts with this type. Let's see some examples of DDL.

```sql

-- Creating the table
-- We can use CREATE TABLE statement
CREATE TABLE Products
(SrNo INT IDENTITY(1,1),
ProductName VARCHAR(100),
ProductType VARCHAR(100),
LocationonShelf VARCHAR(20)
)

--Suppose we want to alter the table, and rename the column 
ALTER TABLE Products
RENAME COLUMN Producttype To ProductCategory

--Suppose we want to alter the table, and add the column 
ALTER TABLE Products
ADD COLUMN ShelfLife

--Suppose we want to alter the table, and drop the column 
ALTER TABLE Products
DROP COLUMN ShelfLife

-- Suppose we want to drop the table. Meaning if we want to delete 
--the table from the schema
DROP TABLE Products

```