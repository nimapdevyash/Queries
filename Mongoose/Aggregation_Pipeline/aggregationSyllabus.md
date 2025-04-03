# 🔹 MongoDB Aggregation Operators Categorized

## ✅ **1️⃣ Comparison Operators**  
| Operator | Description | Example |
|----------|------------|---------|
| `$eq`    | Matches values equal to a specified value | `{ age: { "$eq": 25 } }` |
| `$ne`    | Matches values **not** equal to a specified value | `{ status: { "$ne": "active" } }` |
| `$gt`    | Matches values **greater than** a specified value | `{ price: { "$gt": 100 } }` |
| `$gte`   | Matches values **greater than or equal** to a specified value | `{ price: { "$gte": 100 } }` |
| `$lt`    | Matches values **less than** a specified value | `{ age: { "$lt": 18 } }` |
| `$lte`   | Matches values **less than or equal** to a specified value | `{ age: { "$lte": 18 } }` |

---

## ✅ **2️⃣ Logical Operators**  
| Operator | Description | Example |
|----------|------------|---------|
| `$and`   | Matches documents that satisfy **all** conditions | `{ "$and": [{ age: { "$gt": 18 } }, { age: { "$lt": 60 } }] }` |
| `$or`    | Matches documents that satisfy **at least one** condition | `{ "$or": [{ status: "active" }, { age: { "$gt": 50 } }] }` |
| `$nor`   | Matches documents that **fail** all conditions | `{ "$nor": [{ status: "inactive" }, { age: { "$lt": 18 } }] }` |
| `$not`   | Inverts the result of another query operator | `{ price: { "$not": { "$gt": 100 } } }` |

---

## ✅ **3️⃣ Array Operators**  
| Operator | Description | Example |
|----------|------------|---------|
| `$in`    | Matches if the field's value is **inside** an array | `{ country: { "$in": ["India", "USA", "UK"] } }` |
| `$nin`   | Matches if the field's value is **not inside** an array | `{ category: { "$nin": ["electronics", "furniture"] } }` |
| `$all`   | Matches arrays containing **all specified values** | `{ tags: { "$all": ["mongodb", "database"] } }` |
| `$size`  | Matches arrays with a **specific number of elements** | `{ items: { "$size": 3 } }` |
| `$elemMatch` | Matches at least one element in an array based on criteria | `{ items: { "$elemMatch": { "price": { "$gt": 50 } } } }` |

---

## ✅ **4️⃣ Element Operators**  
| Operator | Description | Example |
|----------|------------|---------|
| `$exists` | Checks if a field exists | `{ discount: { "$exists": true } }` |
| `$type`   | Matches fields of a specific data type | `{ price: { "$type": "number" } }` |

---

## ✅ **5️⃣ Evaluation Operators**  
| Operator | Description | Example |
|----------|------------|---------|
| `$regex` | Matches strings using regular expressions | `{ name: { "$regex": "^A", "$options": "i" } }` |
| `$expr`  | Allows usage of aggregation expressions inside `$match` | `{ "$expr": { "$gt": ["$salary", 50000] } }` |
| `$mod`   | Matches numbers that are divisible by a given value | `{ count: { "$mod": [4, 0] } }` |
| `$text`  | Performs text search on indexed fields | `{ "$text": { "$search": "mongodb" } }` |
| `$where` | Matches documents using JavaScript expressions (deprecated) | `{ "$where": "this.age > 18" }` |

---

## ✅ **6️⃣ Aggregation Pipeline Stages**  
| Stage Operator | Description |
|---------------|------------|
| `$match` | Filters documents based on specified conditions |
| `$project` | Reshapes documents, including or excluding fields |
| `$group` | Aggregates documents to compute values (SUM, AVG, COUNT, etc.) |
| `$sort` | Sorts documents |
| `$limit` | Limits the number of documents |
| `$skip` | Skips a number of documents |
| `$unwind` | Deconstructs an array field into separate documents |
| `$lookup` | Performs a left outer join to another collection |
| `$facet` | Runs multiple aggregation pipelines in parallel |
| `$bucket` | Categorizes documents into specified ranges |
| `$addFields` | Adds new fields to documents |
| `$set` | Alias for `$addFields` |
| `$unset` | Removes specified fields from documents |
| `$replaceRoot` | Replaces the root document with a specified sub-document |
| `$merge` | Writes the aggregation results to a collection |
| `$count` | Returns the number of documents |
| `$redact` | Restricts the content of documents based on conditions |

