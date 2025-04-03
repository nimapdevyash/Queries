# MongoDB Aggregation Stages Cheat Sheet

## **Core Aggregation Stages**

1. **$match** → Filters documents (like `find()`).
2. **$group** → Groups documents, performs accumulations.
3. **$project** → Reshapes documents (include/exclude fields, computed fields).
4. **$sort** → Sorts documents.
5. **$limit** → Limits the number of documents.
6. **$skip** → Skips a specific number of documents.
7. **$unwind** → Deconstructs arrays into separate documents.

## **Intermediate Stages**

8. **$lookup** → Joins collections (like SQL joins).
9. **$facet** → Runs multiple pipelines in parallel.
10. **$bucket / $bucketAuto** → Categorizes data into buckets (histograms).
11. **$replaceRoot** → Replaces a document with a nested field.
12. **$merge** → Writes aggregation results back to a collection.

## **Advanced Stages**

13. **$set / $addFields** → Adds new fields or modifies existing ones.
14. **$redact** → Filters nested documents dynamically.
15. **$out** → Exports results to another collection.
16. **$densify** → Fills gaps in numeric or date sequences.
17. **$fill** → Backfills missing values in documents.

## **Expression-Based Operators**

- **$expr** → Uses aggregation expressions in queries.
- **$cond, $switch, $ifNull** → Conditional logic.
- **$elemMatch** → Filters array elements.
- **$arrayElemAt, $concatArrays** → Array manipulation.
- **$toString, $toInt, $toObjectId** → Type conversions.

## **Learning Path**

1. Start with **$match, $group, $project, $lookup, $unwind, and $facet** (covers 80% of real-world use cases).
2. Master **conditional logic ($cond, $switch)** and **array operations ($elemMatch, $arrayElemAt)**.
3. Learn advanced stages like **$redact, $merge, and $out** for complex use cases.

---

> 🚀 **Tip**: MongoDB aggregation is powerful; breaking it down into small, structured learning steps will help you master it effectively!
