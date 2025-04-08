# 🔹 MongoDB `$count` Stage

The `$count` stage is used to **count the number of documents** that pass
through the aggregation pipeline. It returns the result as a **single document**
with a specified field name.

---

## 📘 Syntax

```js
{
  $count: "<fieldName>";
}
```

---

## ✅ Example

```js
[
  { $match: { status: "active" } },
  { $count: "activeUsers" },
];
```

This returns:

```js
[{ "activeUsers": 42 }];
```

---

## 🧠 Use Cases

| Use Case                | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| **Total count**         | Count how many documents match certain criteria.                         |
| **Analytics**           | Combine with `$group`, `$match`, or `$project` to generate stats.        |
| **Validation**          | Use in tests or checks to confirm expected document volume.              |
| **Early stage filters** | Combine with `$match` before `$count` to restrict dataset being counted. |

---

## ⚠️ Caveats & Gotchas

| Gotcha / Caveat                                | Explanation                                                                   |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| **Returns a single document**                  | Always returns one document with the count field, or none if count is zero.   |
| **Field name is mandatory**                    | You must provide a name for the count result field.                           |
| **Must be last stage**                         | `$count` should be the **final** stage unless followed by `$merge` or `$out`. |
| **Can't use after `$group` without unwinding** | If your grouped result is an array, you'll need `$unwind` first.              |

---

## ♻️ Alternative: Using `$group` + `$sum`

```js
[
  { $match: { status: "active" } },
  { $group: { _id: null, total: { $sum: 1 } } },
];
```

This also returns a count (`{ total: 42 }`) but gives more flexibility (e.g.,
combining with other grouping logic).

---

## 🚀 Best Practices

- ✅ Use `$count` when you only need the number of documents — it's concise and
  efficient.
- ❌ Don’t use it if you need multiple grouped counts — use `$group` instead.
- ✅ Place `$match` before `$count` to narrow down the dataset first.
- ❌ Don’t follow `$count` with stages like `$project` or `$sort` — it returns a
  single doc only.

---

## 🔎 Sample: Count Users by Country (incorrect)

```js
[
  { $group: { _id: "$country" } },
  { $count: "total" }, // ❌ This just counts country groups, not users
];
```

## ✅ Correct Way: Count Users Per Country

```js
[
  { $group: { _id: "$country", count: { $sum: 1 } } },
];
```

---
