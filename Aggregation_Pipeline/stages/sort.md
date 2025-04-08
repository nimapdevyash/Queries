## 🔹 MongoDB `$sort` Stage Operator

The `$sort` stage in MongoDB's aggregation pipeline is used to **order
documents** based on specified fields in **ascending** (`1`) or **descending**
(`-1`) order.

---

### 📌 **Basic Syntax**

```json
{
  "$sort": {
    "field1": 1,
    "field2": -1
  }
}
```

- `1` — Ascending order
- `-1` — Descending order

---

### 📌 **Examples**

#### ✅ Sort by a Single Field (Ascending)

```json
{
  "$sort": { "price": 1 }
}
```

#### ✅ Sort by Multiple Fields

```json
{
  "$sort": { "price": -1, "rating": 1 }
}
```

> Sorts by price descending first, then rating ascending when prices are equal.

---

### 🛠 Common Use Cases

| Use Case                    | Example                                       | Description                                                          |
| --------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| Sort by Date                | `{ "$sort": { "createdAt": -1 } }`            | Shows latest documents first.                                        |
| Sort by Name Alphabetically | `{ "$sort": { "name": 1 } }`                  | Ascending alphabetical order.                                        |
| Combined Sorting            | `{ "$sort": { "category": 1, "price": -1 } }` | Grouped by category, highest price shown first within each category. |

---

### ⚠️ **Caveats & Gotchas**

1. **Sorting is expensive** — especially on large datasets. Always use indexes
   to optimize.
2. You **can only have one `$sort`** stage that acts on a particular order of
   documents unless re-shuffled.
3. `$sort` must come **after `$match` or `$project`** when filtering or
   reshaping documents.
4. Sorting on **nested fields** is supported using dot notation:
   ```json
   { "$sort": { "user.age": -1 } }
   ```
5. Sorting after `$group` means you're sorting grouped documents, not originals.

---

### ✅ **Best Practices**

- ✅ Use indexes on fields being sorted, especially for large collections.
- ✅ Sort after `$match` to reduce the data being sorted.
- ✅ Combine with `$limit` or `$skip` for pagination.
- ⚠️ Avoid sorting after `$lookup` or `$unwind` without optimization.
