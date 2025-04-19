
# Basic Retrieval in Sequelize

In this section, we'll cover the basic retrieval methods in Sequelize, such as `findOne`, `findByPk`, and `findAll`. We'll also discuss how to apply `where` conditions, limit and offset, order, and how to use `attributes` to retrieve specific fields.

---

## 1. `findOne` - Retrieve a Single Record

The `findOne` method retrieves a single record from the database based on the conditions specified. It returns the first matching record or `null` if no records are found.

### Example:
```js
const user = await User.findOne({
  where: { username: 'yash' }
});
console.log(user);
```

### Gotchas:
- If there are multiple matching records, `findOne` will only return the first one based on the order (by default, it's unordered).
- If no record matches, `null` is returned. Always check if the result is `null` before attempting to access properties.

---

## 2. `findByPk` - Retrieve a Record by Primary Key

The `findByPk` method retrieves a record based on its primary key (e.g., `id`).

### Example:
```js
const user = await User.findByPk(1);
console.log(user);
```

### Gotchas:
- This method only works with the primary key, so it’s not useful if you want to query by other fields.
- Ensure that the primary key is correctly set in your model, or this method may return `null`.

---

## 3. `findAll` - Retrieve Multiple Records

The `findAll` method retrieves all records that match the specified conditions. You can limit, order, and paginate results.

### Example:
```js
const users = await User.findAll();
console.log(users);
```

### Example with conditions:
```js
const users = await User.findAll({
  where: {
    age: { [Op.gte]: 18 }  // Greater than or equal to 18
  }
});
console.log(users);
```

### Gotchas:
- By default, `findAll` retrieves all records in the table. Use `limit` and `offset` to avoid overwhelming your application with too much data.
- Always consider pagination when retrieving multiple records to enhance performance and user experience.

---

## 4. `attributes` - Selecting Specific Columns

The `attributes` option allows you to select specific columns you want to retrieve, instead of all fields.

### Example:
```js
const namesOnly = await User.findAll({
  attributes: ['id', 'username']
});
console.log(namesOnly);
```

### Gotchas:
- If you only specify certain attributes, Sequelize will exclude the rest of the fields from the result. Be mindful of which attributes are included.
- Using `attributes` can greatly improve query performance by reducing the amount of data fetched.

---

## 5. `order` - Sorting Results

The `order` option allows you to define how the records should be sorted. The default is ascending order, but you can specify `ASC` or `DESC` to control the sorting direction.

### Example:
```js
const users = await User.findAll({
  order: [['createdAt', 'DESC']]
});
console.log(users);
```

### Gotchas:
- If you need multiple sorting conditions, pass an array of arrays: `[ ['field', 'ASC'], ['anotherField', 'DESC'] ]`.
- Be cautious when sorting on large datasets, as it may lead to performance issues. Use indexes on frequently sorted columns.

---

## 6. `limit` and `offset` - Pagination

The `limit` and `offset` options are useful for pagination. `limit` specifies the maximum number of records to retrieve, and `offset` specifies the starting point.

### Example:
```js
const users = await User.findAll({
  limit: 10,  // Get only 10 users
  offset: 20  // Skip the first 20 users
});
console.log(users);
```

### Gotchas:
- Always use `limit` and `offset` for pagination to avoid fetching too many records at once.
- Ensure that `offset` is properly managed in the frontend to prevent skipping records unexpectedly (e.g., on page reload).

---

## Tips for Basic Retrieval:
1. **Use `findOne` for exact matches**: If you're retrieving only one record, `findOne` is a good choice as it’s more efficient than `findAll`.
2. **Leverage `attributes` for performance**: Only select the fields you need to reduce memory usage and improve query speed.
3. **Combine `limit`, `offset`, and `order` for pagination**: Always consider pagination for endpoints that return multiple records.
4. **Check for `null` values**: Always verify if `findOne` or `findByPk` returns `null` before working with the result.

---

## Conclusion

The basic retrieval methods in Sequelize (`findOne`, `findByPk`, and `findAll`) are essential for querying your data. Understanding how to filter, sort, and limit results is key to optimizing your queries for performance and user experience.

