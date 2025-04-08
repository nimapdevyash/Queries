# 🔹 MongoDB `$match` Stage

The `$match` stage filters documents based on specified conditions, similar to
the `find` query, but within an aggregation pipeline.

## ✅ **Operators Used in `$match`**

| Operator     | Description                                                   | Example                                                   | Caveats / Gotchas                                                                        |
| ------------ | ------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `$eq`        | Matches values equal to a specified value                     | `{ age: { "$eq": 25 } }`                                  | Equivalent to `{ age: 25 }` in normal queries.                                           |
| `$ne`        | Matches values **not** equal to a specified value             | `{ status: { "$ne": "active" } }`                         | Matches documents where the field **exists** but is not equal to the value.              |
| `$gt`        | Matches values **greater than** a specified value             | `{ price: { "$gt": 100 } }`                               | Only works with numeric and date values.                                                 |
| `$gte`       | Matches values **greater than or equal** to a specified value | `{ price: { "$gte": 100 } }`                              | Similar to `$gt`, but includes equality.                                                 |
| `$lt`        | Matches values **less than** a specified value                | `{ age: { "$lt": 18 } }`                                  | Use `$lte` to include the boundary value.                                                |
| `$lte`       | Matches values **less than or equal** to a specified value    | `{ age: { "$lte": 18 } }`                                 | Works on dates, numbers, and strings.                                                    |
| `$in`        | Matches if the field's value is **inside** an array           | `{ country: { "$in": ["India", "USA", "UK"] } }`          | Does **not** match elements inside nested arrays.                                        |
| `$nin`       | Matches if the field's value is **not inside** an array       | `{ category: { "$nin": ["electronics", "furniture"] } }`  | Can match documents where the field is missing.                                          |
| `$all`       | Matches arrays containing **all specified values**            | `{ tags: { "$all": ["mongodb", "database"] } }`           | `$all` works only with arrays, unlike `$in`.                                             |
| `$size`      | Matches arrays with a **specific number of elements**         | `{ items: { "$size": 3 } }`                               | Cannot be used to match ranges (e.g., cannot find arrays with **more than** 3 elements). |
| `$elemMatch` | Matches at least one element in an array based on criteria    | `{ items: { "$elemMatch": { "price": { "$gt": 50 } } } }` | Useful for matching **multiple conditions** inside a single array element.               |
| `$exists`    | Checks if a field exists                                      | `{ discount: { "$exists": true } }`                       | `{ "$exists": false }` matches documents where the field is missing.                     |
| `$type`      | Matches fields of a specific data type                        | `{ price: { "$type": "number" } }`                        | Can specify multiple types using an array, e.g., `{ "$type": ["double", "int"] }`.       |
| `$regex`     | Matches strings using regular expressions                     | `{ name: { "$regex": "^A", "$options": "i" } }`           | Indexes do not always work efficiently with regex queries.                               |
| `$expr`      | Allows usage of aggregation expressions inside `$match`       | `{ "$expr": { "$gt": ["$salary", 50000] } }`              | Useful for comparing fields within the same document.                                    |
| `$mod`       | Matches numbers that are divisible by a given value           | `{ count: { "$mod": [4, 0] } }`                           | `$mod: [4, 0]` means **divisible by 4** (i.e., remainder is 0).                          |
| `$text`      | Performs text search on indexed fields                        | `{ "$text": { "$search": "mongodb" } }`                   | Requires a **text index** on the field.                                                  |

---

## 📌 **Usage Example**

```json
{
  "$match": {
    "$and": [
      { "age": { "$gte": 18 } },
      { "status": { "$eq": "active" } }
    ]
  }
}
```

This query filters documents where:

- `age` is **greater than or equal to 18**
- `status` is **equal to "active"**

This document now provides a structured overview of `$match`, its operators, and
their caveats. 🚀
