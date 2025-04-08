## 🔹 MongoDB `$facet` Stage Operators

The `$facet` stage allows executing multiple aggregation pipelines in parallel,
returning multiple computed results within a **single document**.

| Operator       | Description                                            | Example                                                                                         | Caveats / Gotchas                                                                                           |
| -------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `$bucket`      | Categorizes documents into fixed ranges                | `{ "$bucket": { "groupBy": "$price", "boundaries": [0, 100, 500, 1000], "default": "Other" } }` | Boundaries **must be sorted** in ascending order.                                                           |
| `$bucketAuto`  | Automatically categorizes into **equal-sized** buckets | `{ "$bucketAuto": { "groupBy": "$age", "buckets": 5 } }`                                        | The number of buckets is **not guaranteed** to be exact.                                                    |
| `$sortByCount` | Groups documents by field and counts occurrences       | `{ "$sortByCount": "$category" }`                                                               | Equivalent to `{ "$group": { "_id": "$category", "count": { "$sum": 1 } } }, { "$sort": { "count": -1 } }`. |
| `$count`       | Returns the total number of documents                  | `{ "$count": "totalDocs" }`                                                                     | Returns a **single document** with a count field.                                                           |
| `$match`       | Filters documents before processing facets             | `{ "$match": { "status": "active" } }`                                                          | Helps improve performance by **reducing** dataset size before `$facet`.                                     |
| `$group`       | Groups documents based on a field                      | `{ "$group": { "_id": "$category", "total": { "$sum": 1 } } }`                                  | Used inside facets to **group different computations**.                                                     |
| `$project`     | Reshapes documents inside each facet                   | `{ "$project": { "name": 1, "price": 1 } }`                                                     | Helps control what each facet pipeline outputs.                                                             |
| `$unwind`      | Deconstructs arrays before processing                  | `{ "$unwind": "$tags" }`                                                                        | Expands each element into separate documents.                                                               |

### 📌 **Caveats & Gotchas**

1. `$facet` **always** returns a **single document** with multiple computed
   fields.
2. `$facet` pipelines **cannot** change the structure of the document.
3. `$bucketAuto` **estimates** bucket sizes and may not be perfectly equal.
4. `$sortByCount` is a shortcut for `$group` + `$sort` but is **limited to
   single-field grouping**.
5. `$facet` can slow down queries if sub-pipelines process **large datasets**.

This document now categorizes `$facet` stage operators with their use cases,
examples, and caveats. 🚀
