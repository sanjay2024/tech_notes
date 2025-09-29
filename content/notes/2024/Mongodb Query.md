---
title: Mongodb Query
date: 2025-09-21
draft: false
tags:
  - mongodb
  - database
  - query
---


## `$$` - operator dynamically selects the fields value from the collections

Example → 

```jsx
db.collectionName.find({},{"field_name":`$${fieldName}`})
```

It used for the custom projection, suppose if we want to use that field name with custom name the we can use $$ operator and set it in custom projection