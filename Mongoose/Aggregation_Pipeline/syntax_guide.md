# 🧠 Understanding MongoDB Aggregation Syntax Styles

In MongoDB aggregation pipelines, you'll notice two main syntax styles when
writing stages. These styles are often confused, but they follow a consistent
rule of thumb:

👉 **The structure of your syntax depends on whether you are writing a query or
an expression.**

Let’s explore this with examples to clarify the difference.

---

## 🧩 Two Core Syntax Styles in Aggregation

### 1. **Query Syntax**

> Rule of Thumb: Used when you're asking MongoDB to **find documents that match
> a condition** (like in `$match` or `$redact`).

- **Operators use {} syntax**

- **Structure:**
  ```js
  {
    field: {
      $operator: value;
    }
  }
  ```

- **Example – Filter users aged 18 or older:**
  ```js
  {
    $match: {
      age: { $gte: 18 },
      isVerified: true
    }
  }
  ```

- **Explanation:** This is equivalent to querying a collection. You're saying:
  "Give me all documents where `age >= 18` and `isVerified` is true."

### 2. **Expression Syntax**

> Rule of Thumb: Used when you're **constructing a new value** inside a stage
> like `$project`, `$group`, or `$addFields`.

- **Operators use [] syntax**

- **Structure:**
  ```js
  { newField: { $operator: [expression1, expression2, ...] } }
  ```

- **Example – Add `isAdult` field:**
  ```js
  {
    $project: {
      name: 1,
      isAdult: { $gte: ["$age", 18] }
    }
  }
  ```

- **Explanation:** You are building a new field called `isAdult` based on
  evaluating an expression. Expression operators like `$gte`, `$eq`, `$sum`,
  etc., expect **array-style arguments**.

---

## ⚙️ Why the Two Styles Exist

- **Query Style** is designed to look like traditional MongoDB `find()` queries.
  It tells MongoDB: "Show me only documents that meet this condition."

- **Expression Style** is used to evaluate values during transformation. It
  says: "Compute this value using the fields in the document."

👉 The syntax reflects intent: **Are you filtering documents?** Or **are you
computing a value?**

---

## 🔁 Example: `$group` + `$match`

Even after grouping documents, if you use `$match` to filter the result, the
syntax stays in **query format**:

```js
{
  $match: {
    totalSaleAmount: {
      $gte: 100;
    }
  }
}
```

This is because `$match` still needs a filter condition, regardless of which
stage it's in.

---

## 🧪 Summary Table

| Use Case         | Example Stage        | Syntax Style     | Example Syntax                        |
| ---------------- | -------------------- | ---------------- | ------------------------------------- |
| Filter documents | `$match`             | Query Style      | `{ age: { $gte: 18 } }`               |
| Compute a value  | `$project`, `$group` | Expression Style | `{ isAdult: { $gte: ["$age", 18] } }` |

---

## ✅ Final Tip

📌 If you're passing a value directly to a **field**, you’ll often use
`field: { $operator: value }`. 📌 If you're **computing a value inside an
expression**, use `{ $operator: [fieldOrValue1, fieldOrValue2] }`.

Stick to this rule of thumb, and your pipelines will make more sense and work
more reliably. 🚀
