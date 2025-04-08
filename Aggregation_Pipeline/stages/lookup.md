## 🔹 MongoDB `$lookup` Operator

The `$lookup` stage in MongoDB's aggregation pipeline is used to perform **left
outer joins** between collections, similar to SQL joins.

### NOTE:

it does not matter if the local field and foreign field are _id or not , it just
needs those two vlues to be same and it'll populate the one in another, you can
reverse populate as well (foreign key is in another documents which is refering
to this document)

---

### 📌 **Syntax**

```json
{
  "$lookup": {
    "from": "other_collection",
    "localField": "field_in_current_collection",
    "foreignField": "field_in_other_collection",
    "as": "new_field_name"
  }
}
```

---

### 📌 **Example Usage**

#### **Basic `$lookup` Example**

**Collections:**

- `orders`
  ```json
  { "_id": 1, "customerId": "C001", "amount": 100 }
  { "_id": 2, "customerId": "C002", "amount": 200 }
  ```
- `customers`
  ```json
  { "_id": "C001", "name": "Alice" }
  { "_id": "C002", "name": "Bob" }
  ```

**Aggregation Query:**

```json
{
  "$lookup": {
    "from": "customers",
    "localField": "customerId",
    "foreignField": "_id",
    "as": "customerDetails"
  }
}
```

**Result:**

```json
{
  "_id": 1,
  "customerId": "C001",
  "amount": 100,
  "customerDetails": [
    { "_id": "C001", "name": "Alice" }
  ]
}
```

---

### 📌 **Advanced `$lookup` Features**

| Feature                            | Description                                        | Example                                                                                                                                                                                                                   |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$lookup` with `pipeline`          | Allows filtering or transformations on joined data | `{ "$lookup": { "from": "customers", "let": { "custId": "$customerId" }, "pipeline": [{ "$match": { "$expr": { "$eq": ["$_id", "$$custId"] } } }], "as": "customerDetails" } }`                                           |
| `$lookup` with `$unwind`           | Converts array results into separate documents     | `{ "$unwind": "$customerDetails" }`                                                                                                                                                                                       |
| `$lookup` with multiple conditions | Use `$expr` for complex joins                      | `{ "$lookup": { "from": "customers", "let": { "custId": "$customerId" }, "pipeline": [{ "$match": { "$expr": { "$and": [ { "$eq": ["$_id", "$$custId"] }, { "$gte": ["$age", 18] } ] } } }], "as": "customerDetails" } }` |

---

### ⚠️ **Caveats & Gotchas**

- `$lookup` **only works within the same database**.
- The result is **always an array**, even if there's only one matching document.
- Using `$lookup` on large collections **can be slow**; consider indexing
  `localField` and `foreignField`.
- `$lookup` does **not support cross-database joins**.

---

This document covers the `$lookup` stage with examples, advanced features, and
best practices. 🚀
