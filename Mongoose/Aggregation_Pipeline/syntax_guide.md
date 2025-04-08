# 🧠 Understanding MongoDB Aggregation Syntax Styles

In MongoDB aggregation pipelines, you'll notice two main syntax styles when
writing stages. These styles are often confused, but they follow a consistent
rule of thumb:

👇 **The structure of your syntax depends on whether you are writing a query or
an expression.**

Let’s explore this with examples to clarify the difference.

---

## 🎩 Two Core Syntax Styles in Aggregation

### 1. **Query Syntax**

> Rule of Thumb: Used when you're asking MongoDB to **find documents that match
> a condition** (like in `$match` or `$redact`).

- **Operators use `{}` syntax**

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

- **Operators use `[]` syntax**

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

- **🧠 Reminder:** When you prefix a field with `$`, like `"$age"`, it refers to
  the field value from the current document, not a string literal.

---

## ⚙️ Why the Two Styles Exist

- **Query Style** is designed to look like traditional MongoDB `find()` queries.
  It tells MongoDB: "Show me only documents that meet this condition."

- **Expression Style** is used to evaluate values during transformation. It
  says: "Compute this value using the fields in the document."

👇 The syntax reflects intent: **Are you filtering documents?** Or **are you
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

## 🧠 Query-Style vs Expression-Style Inside `$match`

MongoDB allows you to use **expression syntax inside `$match`** by using the
`$expr` operator:

```js
// Query-style $match
{
  $match: {
    age: {
      $gte: 18;
    }
  }
}

// Expression-style $match using $expr
{
  $match: {
    $expr: {
      $gte: ["$age", 18];
    }
  }
}
```

✅ Use `$expr` when you want to:

- Compare two fields: `{ $expr: { $gt: ["$score", "$passingScore"] } }`
- Use expression-only operators in `$match`:
  `{ $expr: { $concat: ["$first", "$last"] } }`

---

## 🧩 Which Stages Expect Which Syntax?

| Stage        | Expected Syntax Style    | Notes                                             |
| ------------ | ------------------------ | ------------------------------------------------- |
| `$match`     | Query Style (or `$expr`) | `$expr` enables expression-style inside `$match`  |
| `$project`   | Expression Style         | For reshaping or computing new fields             |
| `$group`     | Expression Style         | Common for `$sum`, `$avg`, `$first`, etc.         |
| `$addFields` | Expression Style         | Similar to `$project`, adds computed fields       |
| `$redact`    | Expression Style         | Returns special control values like `$$KEEP`      |
| `$sort`      | Neither                  | Uses scalar direction: `1` for ASC, `-1` for DESC |
| `$limit`     | Scalar Number            | Not an expression or query                        |
| `$skip`      | Scalar Number            | Not an expression or query                        |

---

## 🔄 Operators That Support Both Syntax Styles

Some operators work in **both query-style and expression-style**, adapting their
input format based on context:

| Operator | Purpose          | Query Style (`$match`)    | Expression Style (`$project`, `$group`, `$expr`) |
| -------- | ---------------- | ------------------------- | ------------------------------------------------ |
| `$eq`    | Equals           | ✅ `{ age: { $eq: 30 } }` | ✅ `{ isThirty: { $eq: ["$age", 30] } }`         |
| `$ne`    | Not Equals       | ✅                        | ✅                                               |
| `$gt`    | Greater Than     | ✅                        | ✅                                               |
| `$gte`   | Greater or Equal | ✅                        | ✅                                               |
| `$lt`    | Less Than        | ✅                        | ✅                                               |
| `$lte`   | Less or Equal    | ✅                        | ✅                                               |
| `$in`    | In Array         | ✅                        | ✅ _(note: extra nesting may apply)_             |
| `$nin`   | Not In Array     | ✅                        | ✅                                               |
| `$and`   | Logical AND      | ✅                        | ✅                                               |
| `$or`    | Logical OR       | ✅                        | ✅                                               |
| `$not`   | Logical NOT      | ✅                        | ✅                                               |
| `$regex` | Pattern Matching | ✅                        | ✅ _(via `$regexMatch`)_                         |

---

## 🚫 Query-Only Operators

These operators are **only supported in query syntax** and cannot be used in
expression contexts like `$project` or `$group`:

| Operator     | Purpose                               | Example                                   |
| ------------ | ------------------------------------- | ----------------------------------------- |
| `$exists`    | Check if field exists                 | `{ name: { $exists: true } }`             |
| `$type`      | Match documents by field type         | `{ age: { $type: "number" } }`            |
| `$mod`       | Modulus operation                     | `{ age: { $mod: [5, 0] } }`               |
| `$size`      | Match array length                    | `{ tags: { $size: 3 } }`                  |
| `$all`       | Match all specified elements in array | `{ tags: { $all: ["js", "mongo"] } }`     |
| `$elemMatch` | Match at least one array element      | `{ scores: { $elemMatch: { $gt: 90 } } }` |
| `$geoWithin` | Geospatial queries                    | `{ location: { $geoWithin: ... } }`       |
| `$near`      | Geospatial proximity                  | `{ location: { $near: ... } }`            |

---

## 🔢 Expression-Only Operators

These operators **only** support expression-style syntax and cannot be used
inside query-style conditions:

| Operator        | Purpose                  | Example                                                                   |
| --------------- | ------------------------ | ------------------------------------------------------------------------- |
| `$sum`          | Add values               | `{ total: { $sum: ["$price", "$tax"] } }`                                 |
| `$avg`          | Calculate average        | `{ avgScore: { $avg: "$score" } }`                                        |
| `$concat`       | Concatenate strings      | `{ fullName: { $concat: ["$first", "$last"] } }`                          |
| `$substr`       | Substring extraction     | `{ initials: { $substr: ["$name", 0, 2] } }`                              |
| `$toUpper`      | Convert to uppercase     | `{ upper: { $toUpper: "$city" } }`                                        |
| `$dateToString` | Format date strings      | `{ formatted: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } }` |
| `$map`          | Transform array elements | `{ mapped: { $map: { input: "$items", as: "i", in: "$i.value" } } }`      |

These are mostly **transformation, computation, or formatting** operators used
to **generate new values**.

---

## ✅ Final Tip

📌 If you're passing a value directly to a **field**, you’ll often use
`field: { $operator: value }` → _Query Style_

📌 If you're **computing a value or transforming** a document, use
`{ $operator: [fieldOrValue1, fieldOrValue2] }` → _Expression Style_

📌 If you're inside `$match` but need expression power, wrap it in `$expr` →
_Expression-in-query Style_

Stick to this rule of thumb, and your pipelines will make more sense and work
more reliably. 🚀
