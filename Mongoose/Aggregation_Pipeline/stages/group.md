## 🔹 MongoDB `$group` Stage Operators

The `$group` stage is used to aggregate data by grouping documents based on a
specified field.

| Operator        | Description                                   | Example                                                                | Caveats / Gotchas                                                   |
| --------------- | --------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `$sum`          | Computes the sum of numeric values            | `{ _id: "$category", totalSales: { "$sum": "$amount" } }`              | Returns `0` for missing values. Ensure field is numeric.            |
| `$avg`          | Computes the average value of a numeric field | `{ _id: "$department", avgSalary: { "$avg": "$salary" } }`             | Ignores missing values but returns `null` if no documents match.    |
| `$min`          | Returns the minimum value                     | `{ _id: "$product", minPrice: { "$min": "$price" } }`                  | Works on both numbers and dates.                                    |
| `$max`          | Returns the maximum value                     | `{ _id: "$product", maxPrice: { "$max": "$price" } }`                  | Works on both numbers and dates.                                    |
| `$push`         | Creates an array of values for each group     | `{ _id: "$category", products: { "$push": "$name" } }`                 | Can result in large arrays, affecting performance.                  |
| `$addToSet`     | Creates an array with unique values           | `{ _id: "$team", uniqueCities: { "$addToSet": "$city" } }`             | Ensures uniqueness but does not preserve order.                     |
| `$first`        | Returns the first value from a group          | `{ _id: "$department", firstEmployee: { "$first": "$employeeName" } }` | Order is based on document appearance in the pipeline.              |
| `$last`         | Returns the last value from a group           | `{ _id: "$department", lastEmployee: { "$last": "$employeeName" } }`   | Order is based on document appearance in the pipeline.              |
| `$count`        | Returns the number of documents in each group | `{ _id: "$status", total: { "$sum": 1 } }`                             | `$count` itself is not an operator; `$sum: 1` is used for counting. |
| `$stdDevPop`    | Computes population standard deviation        | `{ _id: "$category", stdDev: { "$stdDevPop": "$price" } }`             | Requires numeric values; returns `null` for empty groups.           |
| `$stdDevSamp`   | Computes sample standard deviation            | `{ _id: "$category", stdDevSample: { "$stdDevSamp": "$price" } }`      | Similar to `$stdDevPop`, but for sample datasets.                   |
| `$mergeObjects` | Merges multiple documents into one            | `{ _id: "$userId", mergedData: { "$mergeObjects": "$details" } }`      | Works well with embedded documents but can overwrite fields.        |

### 📌 **Caveats & Gotchas**

1. The `_id` field **must** be specified in `$group`. Use `null` to group all
   documents into one.
2. `$push` can lead to **memory issues** if arrays grow too large.
3. `$sum` with non-numeric fields returns `0`.
4. `$first` and `$last` are **order-dependent**, which depends on the sorting
   before `$group`.
5. `$addToSet` only removes **duplicate values within a group**, not across the
   collection.

This document now categorizes `$group` stage operators with their use cases,
examples, and caveats. 🚀
