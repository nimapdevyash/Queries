# Operators and Filtering in Sequelize

Sequelize provides a variety of operators to filter data, which helps to build complex queries easily. In this section, we’ll cover some of the most commonly used operators like `Op.eq`, `Op.ne`, `Op.gt`, and more. We’ll also dive into combining multiple conditions with logical operators like `Op.or` and `Op.and`.

---

## 📋 Sequelize Operators Table

| Operator       | Syntax                                | Description                          | Example Snippet |
|----------------|----------------------------------------|--------------------------------------|-----------------|
| `Op.eq`        | `{ field: { [Op.eq]: value } }`        | Equal to a value                     | `{ age: { [Op.eq]: 18 } }` |
| `Op.ne`        | `{ field: { [Op.ne]: value } }`        | Not equal to a value                 | `{ name: { [Op.ne]: 'admin' } }` |
| `Op.gt`        | `{ field: { [Op.gt]: value } }`        | Greater than                         | `{ age: { [Op.gt]: 18 } }` |
| `Op.gte`       | `{ field: { [Op.gte]: value } }`       | Greater than or equal to            | `{ age: { [Op.gte]: 18 } }` |
| `Op.lt`        | `{ field: { [Op.lt]: value } }`        | Less than                            | `{ age: { [Op.lt]: 30 } }` |
| `Op.lte`       | `{ field: { [Op.lte]: value } }`       | Less than or equal to               | `{ age: { [Op.lte]: 30 } }` |
| `Op.between`   | `{ field: { [Op.between]: [x, y] } }`  | Value between two numbers           | `{ age: { [Op.between]: [18, 30] } }` |
| `Op.like`      | `{ field: { [Op.like]: '%val%' } }`    | Case-sensitive pattern matching     | `{ name: { [Op.like]: '%john%' } }` |
| `Op.iLike`     | `{ field: { [Op.iLike]: '%val%' } }`   | Case-insensitive pattern matching   | `{ name: { [Op.iLike]: '%john%' } }` |
| `Op.not`       | `{ field: { [Op.not]: value } }`       | Negates a condition                 | `{ role: { [Op.not]: 'admin' } }` |
| `Op.or`        | `{ [Op.or]: [cond1, cond2] }`          | Any condition must match            | `{ [Op.or]: [{ age: 18 }, { name: 'admin' }] }` |
| `Op.and`       | `{ [Op.and]: [cond1, cond2] }`         | All conditions must match           | `{ [Op.and]: [{ age: 18 }, { name: 'yash' }] }` |

---

## 1. Basic Operators

### `Op.eq` (Equal)
The `Op.eq` operator is used to find records where a field is equal to a specified value.

### Example:
```js
const user = await User.findOne({
  where: { username: { [Op.eq]: 'yash' } }
});
```

---

### `Op.ne` (Not Equal)
The `Op.ne` operator finds records where the value is not equal to the specified value.

### Example:
```js
const user = await User.findOne({
  where: { username: { [Op.ne]: 'admin' } }
});
```

---

### `Op.gt` (Greater Than) and `Op.lt` (Less Than)
These operators filter records based on whether a field’s value is greater than or less than the specified value.

### Example:
```js
const users = await User.findAll({
  where: { age: { [Op.gt]: 18 } }
});
```

---

### `Op.like` and `Op.iLike`
The `Op.like` operator is used for string pattern matching (case-sensitive), while `Op.iLike` is case-insensitive.

### Example:
```js
const users = await User.findAll({
  where: {
    username: { [Op.like]: '%yash%' }
  }
});
```

---

## 2. Logical Operators

### `Op.or`
The `Op.or` operator allows you to specify multiple conditions where at least one condition must be true.

### Example:
```js
const users = await User.findAll({
  where: {
    [Op.or]: [
      { age: { [Op.gte]: 18 } },
      { username: { [Op.like]: '%admin%' } }
    ]
  }
});
```

### Gotchas:
- Be mindful of combining `Op.or` with other conditions; it can unintentionally create broader queries than intended.
- Using `Op.or` with large datasets may reduce performance; always limit the results.

---

### `Op.and`
The `Op.and` operator ensures that multiple conditions must be true.

### Example:
```js
const users = await User.findAll({
  where: {
    [Op.and]: [
      { age: { [Op.gte]: 18 } },
      { username: { [Op.like]: '%yash%' } }
    ]
  }
});
```

---

### `Op.not`
The `Op.not` operator negates a condition, ensuring the value is not equal to a specified value.

### Example:
```js
const users = await User.findAll({
  where: {
    username: { [Op.not]: 'admin' }
  }
});
```

---

## 3. Advanced Filtering

### `Op.between`
The `Op.between` operator allows you to filter data between a range of values.

### Example:
```js
const users = await User.findAll({
  where: {
    age: { [Op.between]: [18, 30] }
  }
});
```

---

### `Op.gte` and `Op.lte`
The `Op.gte` and `Op.lte` operators are used for "greater than or equal to" and "less than or equal to" conditions.

### Example:
```js
const users = await User.findAll({
  where: {
    createdAt: { [Op.gte]: '2023-01-01' }
  }
});
```

---

## 4. Gotchas, Caveats, and Tips

### Gotchas:
- **Always sanitize inputs**: Although Sequelize protects against SQL injection, ensure that you're not inadvertently passing user input directly into queries.
- **Using `Op.like` with large datasets** can lead to performance issues. Consider full-text search solutions if you expect frequent use of `like`.
- **`Op.or` with large queries** can impact performance as it performs a logical OR for each condition.

### Tips:
- **Use the `Op` operators with caution**, especially when working with large datasets. Combining many conditions could lead to inefficient queries.
- **Leverage `Op.iLike`** for case-insensitive queries when working with user input or partial string matching.
- Always **limit** the number of results returned when using `Op.or` or `Op.like` to avoid performance bottlenecks.

---

## Conclusion

With Sequelize operators like `Op.eq`, `Op.ne`, `Op.like`, `Op.and`, and `Op.or`, you can build sophisticated queries that filter data based on various conditions. However, it’s essential to keep performance in mind when working with large datasets and logical operators. In the next section, we'll dive deeper into more advanced query techniques such as associations and aggregations!

