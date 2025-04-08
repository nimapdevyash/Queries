# 📘 MongoDB Accumulator Operators

Accumulator operators are used **within aggregation stages like `$group`,
`$bucket`, and `$bucketAuto`** to perform calculations across a group of
documents. They're crucial for summarizing data (e.g., totals, averages,
collecting items into arrays, etc.).

---

## 🔹 Syntax Overview

```js
{
  $group: {
    _id: "$<group_by_field>",
    <outputField>: { <accumulator>: <expression> },
    ...
  }
}
```

---

## 📚 List of Accumulator Operators

| Operator         | Description                                          | Example                                       |
| ---------------- | ---------------------------------------------------- | --------------------------------------------- |
| `$sum`           | Sums numeric values                                  | `{ totalSales: { $sum: "$amount" } }`         |
| `$avg`           | Calculates the average of numeric values             | `{ averagePrice: { $avg: "$price" } }`        |
| `$min`           | Returns the minimum value                            | `{ minScore: { $min: "$score" } }`            |
| `$max`           | Returns the maximum value                            | `{ maxScore: { $max: "$score" } }`            |
| `$first`         | Returns the first value in the group                 | `{ firstItem: { $first: "$item" } }`          |
| `$last`          | Returns the last value in the group                  | `{ lastItem: { $last: "$item" } }`            |
| `$push`          | Returns an array of all values in the group          | `{ allProducts: { $push: "$product" } }`      |
| `$addToSet`      | Returns an array of **unique** values in the group   | `{ uniqueTags: { $addToSet: "$tag" } }`       |
| `$mergeObjects`  | Combines embedded documents into a single document   | `{ profile: { $mergeObjects: "$details" } }`  |
| `$stdDevPop`     | Returns population standard deviation                | `{ stdDev: { $stdDevPop: "$price" } }`        |
| `$stdDevSamp`    | Returns sample standard deviation                    | `{ stdDevSample: { $stdDevSamp: "$price" } }` |
| `$count` (alias) | Used indirectly via `{ $sum: 1 }` to count documents | `{ count: { $sum: 1 } }`                      |

---

## 🔍 Notes & Gotchas

### ✅ General

- Accumulators **only work within `$group`, `$bucket`, `$bucketAuto`, or
  `$setWindowFields`**.
- Most operators **ignore non-numeric values** when calculating numeric results
  (e.g., `$avg`, `$sum`).

### ⚠️ Specific Warnings

- `$push` and `$addToSet` can cause memory issues if the result arrays grow too
  large.
- `$first` and `$last` depend on document order—**use `$sort` before `$group`**
  if order matters.
- `$mergeObjects` will **overwrite fields** if same keys are encountered across
  objects.
- `$stdDevPop` and `$stdDevSamp` require numeric inputs and **return null** if
  no values are present.

---

## 🧪 Example Usage

### Example: Grouping and Summarizing Sales

```js
[
  {
    $group: {
      _id: "$category",
      totalSales: { $sum: "$amount" },
      avgSales: { $avg: "$amount" },
      items: { $push: "$item" },
      uniqueTags: { $addToSet: "$tag" },
      firstSale: { $first: "$amount" },
      lastSale: { $last: "$amount" },
    },
  },
];
```

---

## ✅ Summary

- Accumulator operators are powerful tools in MongoDB's aggregation framework.
- Use them to perform rollups, summaries, array collections, and statistical
  calculations.
- Always be mindful of memory consumption, especially with array accumulators
  like `$push` and `$addToSet`.

---

Let me know if you want to explore **custom accumulator expressions**, **window
function variations**, or **performance tuning with accumulators**!
