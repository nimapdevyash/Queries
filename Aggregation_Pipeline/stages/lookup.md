# 🔹 MongoDB `$lookup` Operator

The `$lookup` stage in MongoDB's aggregation pipeline is used to perform **left outer joins** between collections, similar to SQL joins. It enables combining documents from different collections based on matching field values.

---

## 📘 **Key Concept**

> It doesn't matter whether the fields used are `_id` or not — as long as the `localField` and `foreignField` values match, the join will succeed.

You can also perform **reverse population**, where the foreign field is in another collection referencing the current one.

---

## 📌 **Basic Syntax**

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

- `from`: The collection to join with.
- `localField`: The field from the current collection.
- `foreignField`: The field from the other collection.
- `as`: The name of the new array field to add to each input document.

---

## 📌 **Example Usage**

### ✅ **Basic `$lookup` Example**

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

## 🔍 **Advanced `$lookup` Features**

| Feature                            | Description                                        | Example                                                                                                                                                                                                                   |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$lookup` with `pipeline`          | Allows filtering or transformations on joined data | `{ "$lookup": { "from": "customers", "let": { "custId": "$customerId" }, "pipeline": [{ "$match": { "$expr": { "$eq": ["$_id", "$$custId"] } } }], "as": "customerDetails" } }`                                           |
| `$lookup` with `$unwind`           | Converts array results into separate documents     | `{ "$unwind": "$customerDetails" }`                                                                                                                                                                                       |
| `$lookup` with multiple conditions | Use `$expr` for complex joins                      | `{ "$lookup": { "from": "customers", "let": { "custId": "$customerId" }, "pipeline": [{ "$match": { "$expr": { "$and": [ { "$eq": ["$_id", "$$custId"] }, { "$gte": ["$age", 18] } ] } } }], "as": "customerDetails" } }` |

---

## 🧠 **Deeper Insights into `$lookup` with `let` and `pipeline`**

### ✅ Purpose of `let`
- You use `let` to **declare variables** that capture values from the **local document**.
- These variables can then be used in the foreign collection’s pipeline via `$$varName`.
- This is crucial because using `$fieldName` directly in the pipeline would refer to the foreign document’s field — not the local one.

### ✅ Using Multiple Variables
You can define multiple variables inside the `let` block:

```js
let: {
  var1: "$field1",
  var2: "$field2.subField",
  var3: "$nested.deep.field"
}
```

Use these in the pipeline using `$$var1`, `$$var2`, etc.

### ✅ Example: Multi-variable `$lookup` with Nested Fields

```js
{
  $lookup: {
    from: "customers",
    let: {
      custId: "$customer.id",
      custTier: "$customer.tier"
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$_id", "$$custId"] },
              { $eq: ["$tier", "$$custTier"] }
            ]
          }
        }
      },
      { $project: { name: 1, _id: 0 } }
    ],
    as: "customerDetails"
  }
}
```

This allows powerful, expressive joins that go far beyond simple equality checks.

---

## ⚠️ **Caveats & Gotchas**

1. `$lookup` works **only within the same database** — no cross-database joins.
2. The joined result is **always an array**, even if one or no documents match.
3. For better performance, ensure indexes exist on `localField` and `foreignField`.
4. Consider using `$unwind` to flatten the array when you need a one-to-one join.
5. Using `$lookup` on very large collections can **slow down your aggregation pipeline** — always profile and optimize.
6. When using `let`, always use `$$varName` to reference your variable.
7. You can use **nested field paths** in `let`, such as `$field.subField`, for deeply structured documents.

---

## ✅ **When to Use `$lookup`**

- Fetching referenced documents without embedding.
- Simulating SQL JOINs.
- Handling reverse relationships (e.g., posts referencing authors).
- Adding metadata to base documents from another collection.
- Performing complex conditional joins using pipelines with filters, projections, or sorting logic.

