## 🔹 MongoDB `$project` Stage Operators

The `$project` stage is used to reshape documents by including, excluding, or
modifying fields.

| Operator        | Description                           | Example                                                                                                                | Caveats / Gotchas                                    |
| --------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `1 / 0`         | Includes (1) or excludes (0) a field  | `{ name: 1, age: 1, _id: 0 }`                                                                                          | Cannot mix inclusion & exclusion (except for `_id`). |
| `$literal`      | Returns a fixed value                 | `{ status: { "$literal": "Active" } }`                                                                                 | Useful for adding static fields.                     |
| `$type`         | Returns the BSON type of a field      | `{ fieldType: { "$type": "$age" } }`                                                                                   | Returns type as a string.                            |
| `$toString`     | Converts a field to string            | `{ ageString: { "$toString": "$age" } }`                                                                               | Use cautiously for non-string fields.                |
| `$toInt`        | Converts a field to integer           | `{ priceInt: { "$toInt": "$price" } }`                                                                                 | Non-numeric values cause an error.                   |
| `$toDouble`     | Converts a field to double            | `{ ratingDouble: { "$toDouble": "$rating" } }`                                                                         | Useful for numeric precision.                        |
| `$toDecimal`    | Converts a field to decimal           | `{ priceDecimal: { "$toDecimal": "$price" } }`                                                                         | Ensures precision for monetary values.               |
| `$toBool`       | Converts a field to boolean           | `{ isAvailable: { "$toBool": "$stock" } }`                                                                             | `null` converts to `false`.                          |
| `$toDate`       | Converts a field to date              | `{ dateField: { "$toDate": "$timestamp" } }`                                                                           | String format must be ISO-compliant.                 |
| `$arrayElemAt`  | Retrieves element at a specific index | `{ firstTag: { "$arrayElemAt": ["$tags", 0] } }`                                                                       | Negative index is not supported.                     |
| `$concatArrays` | Merges multiple arrays                | `{ merged: { "$concatArrays": ["$tags", "$categories"] } }`                                                            | Both fields must be arrays.                          |
| `$slice`        | Limits array size in output           | `{ firstTwo: { "$slice": ["$tags", 2] } }`                                                                             | Negative values are not allowed.                     |
| `$filter`       | Filters elements in an array          | `{ filteredTags: { "$filter": { "input": "$tags", "as": "tag", "cond": { "$eq": ["$$tag", "mongodb"] } } } }`          | Uses `$$` for variable reference.                    |
| `$map`          | Transforms array elements             | `{ mapped: { "$map": { "input": "$tags", "as": "tag", "in": { "$concat": ["Tag: ", "$$tag"] } } } }`                   | Helps modify array content dynamically.              |
| `$reduce`       | Applies an operation on an array      | `{ reducedValue: { "$reduce": { "input": "$numbers", "initialValue": 0, "in": { "$add": ["$$value", "$$this"] } } } }` | Similar to JavaScript `reduce()`.                    |
| `$reverseArray` | Reverses an array                     | `{ reversed: { "$reverseArray": "$tags" } }`                                                                           | Field must be an array.                              |
| `$zip`          | Merges arrays element-wise            | `{ zipped: { "$zip": { "inputs": ["$names", "$ages"] } } }`                                                            | Arrays must be of equal length.                      |

### 📌 **Caveats & Gotchas**

1. Mixing field inclusion (1) and exclusion (0) is **not allowed**, except for
   `_id`.
2. `$slice` only supports **positive values**.
3. `$arrayElemAt` does **not** support negative indexes.
4. `$filter`, `$map`, and `$reduce` require `$$` to reference variables.
5. `$concatArrays` expects **both fields to be arrays**, or it will fail.

This document now categorizes `$project` stage operators with their use cases,
examples, and caveats. 🚀
