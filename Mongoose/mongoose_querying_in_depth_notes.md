
# Mongoose Querying in Depth

## Table of Contents
1. [Query Conditions](#query-conditions)
   - 1.1 [$eq](#eq)
   - 1.2 [$ne](#ne)
   - 1.3 [$gt](#gt)
   - 1.4 [$gte](#gte)
   - 1.5 [$lt](#lt)
   - 1.6 [$lte](#lte)
   - 1.7 [$in](#in)
   - 1.8 [$nin](#nin)
2. [Logical Operators](#logical-operators)
   - 2.1 [$or](#or)
   - 2.2 [$and](#and)
   - 2.3 [$not](#not)
   - 2.4 [$nor](#nor)
3. [Projection](#projection)
4. [Sorting, Limiting, and Skipping](#sorting-limiting-and-skipping)
   - 4.1 [Using .sort()](#sort)
   - 4.2 [Using .limit()](#limit)
   - 4.3 [Using .skip()](#skip)
5. [Caveats and Gotchas](#caveats-and-gotchas)
6. [Tips and Best Practices](#tips-and-best-practices)

---

## Query Conditions

Mongoose query conditions are used to filter the results when querying a MongoDB collection. These conditions map to MongoDB operators.

### 1.1 $eq (Equality)
The `$eq` operator checks for equality.

```js
User.find({ age: { $eq: 25 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `$eq` is the default for equality, so it can be omitted for simple equality checks.
- Performance impact can occur with more complex conditions like `$eq` combined with `$gt` or `$lt`.

---

### 1.2 $ne (Not Equal)
The `$ne` operator checks for inequality.

```js
User.find({ age: { $ne: 30 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Be careful with `$ne` as it can result in large datasets being returned, which could lead to performance issues.

---

### 1.3 $gt (Greater Than)
The `$gt` operator checks if a value is greater than the specified value.

```js
User.find({ age: { $gt: 18 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Make sure the field being queried is indexed for better performance.

---

### 1.4 $gte (Greater Than or Equal)
The `$gte` operator checks if a value is greater than or equal to the specified value.

```js
User.find({ age: { $gte: 18 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Works similarly to `$gt`, but includes the boundary value.

---

### 1.5 $lt (Less Than)
The `$lt` operator checks if a value is less than the specified value.

```js
User.find({ age: { $lt: 18 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Ensure your query returns a reasonable number of documents to avoid memory overhead.

---

### 1.6 $lte (Less Than or Equal)
The `$lte` operator checks if a value is less than or equal to the specified value.

```js
User.find({ age: { $lte: 18 } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Works similarly to `$lt`, but includes the boundary value.

---

### 1.7 $in (In Array)
The `$in` operator checks if a value is within a specified array.

```js
User.find({ age: { $in: [18, 20, 25] } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- If the array is large, it can negatively impact performance.

---

### 1.8 $nin (Not In Array)
The `$nin` operator checks if a value is not in the specified array.

```js
User.find({ age: { $nin: [18, 20, 25] } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Like `$in`, be cautious of large arrays as they may result in performance issues.

---

## Logical Operators

Logical operators allow you to combine multiple conditions.

### 2.1 $or (OR Condition)
The `$or` operator allows you to specify multiple conditions, and it returns documents that satisfy at least one of the conditions.

```js
User.find({ $or: [{ age: { $lt: 18 } }, { age: { $gt: 30 } }] })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `$or` can negatively impact performance if not used with proper indexing.

---

### 2.2 $and (AND Condition)
The `$and` operator ensures that all conditions in the array must be true for the document to match.

```js
User.find({ $and: [{ age: { $gt: 18 } }, { age: { $lt: 30 } }] })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `$and` can be avoided if the conditions can be simply written as a JavaScript object, as Mongoose will automatically treat them as an AND condition.

---

### 2.3 $not (Negation)
The `$not` operator negates the condition.

```js
User.find({ age: { $not: { $gt: 30 } } })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Be cautious with `$not` as it may lead to complex queries that are difficult to optimize.

---

### 2.4 $nor (NOR Condition)
The `$nor` operator is the inverse of `$or` and ensures that none of the conditions are true.

```js
User.find({ $nor: [{ age: { $lt: 18 } }, { age: { $gt: 30 } }] })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `$nor` is powerful but can be harder to optimize. Use with care.

---

## Projection

Projection allows you to specify which fields to include or exclude in the query results.

```js
User.find({ age: { $gt: 18 } }, 'name age')
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

- In this case, only the `name` and `age` fields will be returned for each user.

**Caveats & Gotchas:**
- Mongoose will return all fields by default, but you can limit the fields returned using projection.
- You can exclude a field by prefixing it with a `-`.

```js
User.find({ age: { $gt: 18 } }, '-_id')
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

---

## Sorting, Limiting, and Skipping

These methods allow you to control the order and number of documents returned by your queries.

### 4.1 Using .sort()

The `.sort()` method sorts the documents based on one or more fields.

```js
User.find().sort({ age: 1 })  // Ascending order
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

```js
User.find().sort({ age: -1 }) // Descending order
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Ensure the fields being sorted are indexed for better performance.
- Sorting large datasets without indexes can significantly degrade performance.

---

### 4.2 Using .limit()

The `.limit()` method is used to restrict the number of documents returned by the query.

```js
User.find().limit(10)
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Using `.limit()` is particularly useful for pagination.
- Be cautious of returning large datasets with high values for `limit`.

---

### 4.3 Using .skip()

The `.skip()` method is used to skip a specified number of documents, useful for pagination.

```js
User.find().skip(10).limit(10)
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.skip()` can be inefficient with large datasets and should be used carefully for pagination.
- For better performance, consider using range-based pagination with indexes.

---

## Caveats and Gotchas

1. **Query Performance**: Always ensure that your query fields are indexed when using conditions like `$gt`, `$lt`, and `$in`.
2. **Projection**: Avoid requesting too many fields in projection, especially in large collections.
3. **Pagination**: `.skip()` can become inefficient for large datasets. Use range-based pagination with proper indexes for better performance.

---

## Tips and Best Practices

1. **Indexing**: Always index frequently queried fields like `name`, `age`, or `email` for faster query results.
2. **Limit the Fields**: Use projection to limit the number of fields returned by the query, reducing memory usage.
3. **Use Lean Queries**: If you don’t need Mongoose documents (just plain JS objects), use `.lean()` to improve query performance.

---

