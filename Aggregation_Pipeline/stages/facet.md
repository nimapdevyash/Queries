# 🔹 MongoDB `$facet` Stage Operators

The `$facet` stage allows executing multiple aggregation pipelines **in
parallel**, returning multiple computed results within a **single document**.
This is especially useful for **multi-dimensional analysis** like pagination +
metadata + filters in a single query.

---

## 📌 **Basic Syntax**

```json
{
  "$facet": {
    "facet1": [ ... ],
    "facet2": [ ... ],
    "facet3": [ ... ]
  }
}
```

Each facet runs **independently**, and their results are returned under their
respective keys.

---

## 📦 **Common Operators Used Inside `$facet`**

| Operator       | Description                                            | Example                                                                                         | Caveats / Gotchas                                                      |
| -------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `$bucket`      | Categorizes documents into fixed ranges                | `{ "$bucket": { "groupBy": "$price", "boundaries": [0, 100, 500, 1000], "default": "Other" } }` | Boundaries **must be sorted** in ascending order.                      |
| `$bucketAuto`  | Automatically categorizes into **equal-sized** buckets | `{ "$bucketAuto": { "groupBy": "$age", "buckets": 5 } }`                                        | Bucket size is **approximate**, based on data distribution.            |
| `$sortByCount` | Groups documents by field and counts occurrences       | `{ "$sortByCount": "$category" }`                                                               | Equivalent to `$group` + `$sort`, but limited to one field.            |
| `$count`       | Returns the total number of documents                  | `{ "$count": "totalDocs" }`                                                                     | Returns a **single document** with one field (the counter).            |
| `$match`       | Filters documents before processing facets             | `{ "$match": { "status": "active" } }`                                                          | Run `$match` **before `$facet`** to reduce input dataset size.         |
| `$group`       | Groups documents based on a field                      | `{ "$group": { "_id": "$category", "total": { "$sum": 1 } } }`                                  | Frequently used in analytics and statistics pipelines.                 |
| `$project`     | Reshapes documents inside each facet                   | `{ "$project": { "name": 1, "price": 1 } }`                                                     | Use it to return only required fields for each facet.                  |
| `$unwind`      | Deconstructs arrays before processing                  | `{ "$unwind": "$tags" }`                                                                        | Converts array elements into multiple documents for deeper processing. |

---

## ⚠️ **Caveats & Gotchas**

1. ✅ `$facet` **always returns** a **single document** with multiple computed
   fields (each an array).
2. 🚫 Pipelines inside `$facet` **cannot use `$out` or `$merge`**.
3. 💡 Use `$match` before `$facet` to reduce input volume for better
   performance.
4. 🧮 `$bucketAuto` is **data-dependent** and not deterministic.
5. 🐢 Can become **resource-heavy** with large datasets or many facet pipelines.
6. 📂 Always index the fields used in `$match`, `$groupBy`, and `$sortByCount`
   to optimize speed.

---

## ✅ **Best Practices**

- Structure your facets clearly with naming like `metadata`, `results`,
  `counts`.
- Combine with `$match`, `$sort`, and `$limit` for powerful pagination queries.
- Use `$project` to keep only the needed fields and reduce memory usage.
- Prefer `$bucket` for known categories and `$bucketAuto` for exploratory
  buckets.
