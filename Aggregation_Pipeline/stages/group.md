# 🔹 MongoDB `$group` Stage Operators

The `$group` stage is used to **aggregate documents** by a specified field and
apply **accumulator operations** like `$sum`, `$avg`, `$push`, etc.

---

## 🧱 Basic Syntax

```js
{
  $group: {
    _id: <expression>, // Field to group by
    <outputField1>: { <accumulator1>: <expression1> },
    <outputField2>: { <accumulator2>: <expression2> },
    ...
  }
}
```

---

## ✅ Example

**Use Case:** Calculate total sales and list product names for each category.

### ⚙️ Aggregation Pipeline:

```js
{
  $group: {
    _id: "$category",
    totalSales: { $sum: "$amount" },
    products: { $push: "$name" }
  }
}
```

---

## 🔧 `$group` Stage Operators

| Operator        | Description                               | Example                                                                | Caveats / Gotchas                                                |
| --------------- | ----------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `$sum`          | Computes the sum of numeric values        | `{ _id: "$category", totalSales: { "$sum": "$amount" } }`              | Returns `0` for missing values. Ensure field is numeric.         |
| `$avg`          | Computes the average of numeric fields    | `{ _id: "$department", avgSalary: { "$avg": "$salary" } }`             | Ignores missing values but returns `null` if no documents match. |
| `$min`          | Returns the minimum value                 | `{ _id: "$product", minPrice: { "$min": "$price" } }`                  | Works on both numbers and dates.                                 |
| `$max`          | Returns the maximum value                 | `{ _id: "$product", maxPrice: { "$max": "$price" } }`                  | Works on both numbers and dates.                                 |
| `$push`         | Creates an array of values for each group | `{ _id: "$category", products: { "$push": "$name" } }`                 | Can result in large arrays, affecting performance.               |
| `$addToSet`     | Creates an array with unique values       | `{ _id: "$team", uniqueCities: { "$addToSet": "$city" } }`             | Ensures uniqueness but does not preserve order.                  |
| `$first`        | Returns the first value from a group      | `{ _id: "$department", firstEmployee: { "$first": "$employeeName" } }` | Order is based on document appearance in the pipeline.           |
| `$last`         | Returns the last value from a group       | `{ _id: "$department", lastEmployee: { "$last": "$employeeName" } }`   | Order is based on document appearance in the pipeline.           |
| `$count`        | Returns number of documents in group      | `{ _id: "$status", total: { "$sum": 1 } }`                             | `$count` itself isn't an operator; use `$sum: 1` to count.       |
| `$stdDevPop`    | Computes population standard deviation    | `{ _id: "$category", stdDev: { "$stdDevPop": "$price" } }`             | Needs numeric values; returns `null` for empty groups.           |
| `$stdDevSamp`   | Computes sample standard deviation        | `{ _id: "$category", stdDevSample: { "$stdDevSamp": "$price" } }`      | Similar to `$stdDevPop`, but uses n-1 divisor.                   |
| `$mergeObjects` | Merges multiple documents into one        | `{ _id: "$userId", mergedData: { "$mergeObjects": "$details" } }`      | Good for embedded docs; later fields overwrite earlier ones.     |

---

## 📌 Caveats & Gotchas

1. **`_id` is mandatory** in `$group`. Use `null` to group everything together.
2. **`$push`** can lead to **performance/memory issues** with large arrays.
3. **`$first` / `$last`** depends on document order — use `$sort` before
   `$group` to control it.
4. **`$sum`** on a non-numeric field silently returns `0`.
5. **`$addToSet`** ensures **uniqueness within a group**, not globally.
6. Grouping with `null` as `_id` can be useful for **total stats** across all
   docs.
