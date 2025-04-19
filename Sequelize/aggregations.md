
# Sequelize Aggregations – Mastering Aggregation Queries

Sequelize supports powerful aggregation functions like `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, and more, enabling you to perform calculations and retrieve summarized data directly from your database.

---

## 1. Using Sequelize Functions (`fn`, `col`)

Sequelize’s `Sequelize.fn` allows you to use database functions such as `COUNT`, `SUM`, `AVG`, etc., within your queries. You can also use `Sequelize.col` to refer to columns in your database.

### Example: `COUNT`
Let’s start with the `COUNT` function to count the number of records.

```js
const result = await Model.findAll({
  attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'totalUsers']],
});
```

Here, `COUNT` counts the number of records in the column `id`. The result will have a field `totalUsers` representing the count.

---

### Example: `SUM` and `AVG`
You can also perform summation and average calculations.

```js
const result = await Model.findAll({
  attributes: [
    [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
    [Sequelize.fn('AVG', Sequelize.col('age')), 'averageAge'],
  ],
});
```

This example calculates the sum of the `amount` field and the average of the `age` field.

---

## 2. Grouping Results (`group`)

When working with aggregation, grouping data is essential. The `group` option helps you group results based on specific columns, similar to SQL’s `GROUP BY`.

### Example: Grouping by a Column
```js
const result = await Model.findAll({
  attributes: [
    'category',
    [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalProducts'],
  ],
  group: ['category'],
});
```

This query counts the number of products in each `category` field.

---

### Example: Grouping with a `WHERE` condition
You can combine `group` with `where` conditions to filter the groups.

```js
const result = await Model.findAll({
  attributes: [
    'category',
    [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalProducts'],
  ],
  where: { status: 'active' },
  group: ['category'],
});
```

This counts only the active products grouped by `category`.

---

## 3. Nested Aggregations

Sometimes, you may want to use aggregations inside other aggregations or within conditions like `HAVING`.

### Example: Nested Aggregation in `HAVING`
```js
const result = await Model.findAll({
  attributes: [
    'category',
    [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalProducts'],
  ],
  group: ['category'],
  having: Sequelize.literal('totalProducts > 10'),
});
```

Here, we count the products per category and use `HAVING` to filter out categories with fewer than 10 products.

---

## 4. Gotchas, Caveats, and Tips

### Gotchas:
- **Performance**: Aggregation queries can be resource-intensive, especially on large datasets. Use indexes and limit results when possible.
- **Aliases**: Always provide aliases for aggregated columns to make them readable and avoid conflicts.

### Tips:
- **Use `Sequelize.col` for column references** in aggregation functions.
- **Use `group` correctly** to avoid misleading or incorrect aggregations.
- **Be cautious with `HAVING`**: Sequelize's `having` option works similarly to SQL, so ensure you're using it in the right context.

---

## Conclusion

Sequelize’s aggregation capabilities are powerful for summarizing data directly in your database. By using `Sequelize.fn` for functions like `COUNT`, `SUM`, and `AVG`, and combining them with `group`, you can efficiently process large datasets. However, always be mindful of performance, especially when working with large tables.
