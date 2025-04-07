# Symmetric vs Non-Symmetric Operators in MongoDB Aggregation

In MongoDB aggregation pipelines, the **order of operands** in expressions can
sometimes matter — and sometimes it doesn’t. Understanding this helps prevent
logic bugs and makes expressions more readable and reliable.

---

## ✅ Symmetric Operators

These operators **do not care** about the order of operands. You can place the
field or value on either side.

### Examples:

- `$eq`: Equal
- `$ne`: Not Equal
- `$and`: Logical AND
- `$or`: Logical OR
- `$setEquals`: Set equality

### Example Usage:

```js
{
  $eq: ["$status", "active"];
}
{
  $eq: ["active", "$status"];
}
// Both are equivalent
```

---

## ⚠️ Non-Symmetric Operators

These operators **do care** about the order of operands. Swapping them will
change the logic or break the operation.

### Examples:

- `$gt`: Greater Than
- `$lt`: Less Than
- `$gte`: Greater Than or Equal To
- `$lte`: Less Than or Equal To
- `$subtract`: Subtraction
- `$divide`: Division
- `$ifNull`: Falls back to the second value only if the first is null
- `$cond`: Ternary logic
- `$switch`: Conditional branching
- `$first`, `$last`: Order-sensitive array operations

### Example Usage:

```js
{
  $gt: ["$age", 18];
} // age > 18 ✅
{
  $gt: [18, "$age"];
} // 18 > age ❌ (different meaning)

{
  $subtract: [100, "$discount"];
} // 100 - discount ✅
{
  $subtract: ["$discount", 100];
} // discount - 100 ❌ (flipped logic)
```

---

## 💡 Pro Tip

Ask yourself:

> "If I swap the operands, does the meaning change?"

- If **yes**, it’s **non-symmetric**
- If **no**, it’s **symmetric**

---

## 🔁 Best Practice

- Use **field first** by convention for readability:\
  `["$field", value]`
- Always double-check order-sensitive operators when writing expressions.
