# MongoDB Aggregation Sub-Operators

## Comparison Operators

| Operator | Syntax                        | Description                                                     | Example                      |
| -------- | ----------------------------- | --------------------------------------------------------------- | ---------------------------- |
| `$eq`    | `{ $eq: [value1, value2 ] }`  | Checks if both values are equal of not                          | `{ $eq: [ "$price", 100 ] }` |
| `$ne`    | `{ $ne: [value1, value2 ] }`  | Checks if a field is not equal to a specific value.             | `{ $ne: [ "$price", 100 ] }` |
| `$gt`    | `{ $gt: [value1, value2 ] }`  | Checks if first value is greater than second value.             | `{ $gt: [ "$price", 50 ] }`  |
| `$gte`   | `{ $gte: [value1, value2 ] }` | Checks if first value is greater than or equal to second value. | `{ $gte: [ "$price", 50 ] }` |
| `$lt`    | `{ $lt: [value1, value2 ] }`  | Checks if first value is less than second values.               | `{ $lt: [ "$price", 50 ] }`  |
| `$lte`   | `{ $lte: [value1, value2 ] }` | Checks if first value is less than or equal to second value.    | `{ $lte: [ "$price", 50 ] }` |

## Logical Operators

| Operator | Syntax                                         | Description                                      | Example                                                                      |
| -------- | ---------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `$and`   | `{ $and: [ { condition1 }, { condition2 } ] }` | Returns true if all conditions are true.         | `{ $and: [ { "$gt": [ "$price", 50 ] }, { "$lt": [ "$price", 200 ] } ] }`    |
| `$or`    | `{ $or: [ { condition1 }, { condition2 } ] }`  | Returns true if at least one condition is true.  | `{ $or: [ { "$eq": [ "$status", "A" ] }, { "$eq": [ "$status", "B" ] } ] }`  |
| `$not`   | `{ $not: { condition } }`                      | Inverts the Boolean result of a condition.       | `{ $not: { "$eq": [ "$status", "A" ] } }`                                    |
| `$nor`   | `{ $nor: [ { condition1 }, { condition2 } ] }` | Returns true if none of the conditions are true. | `{ $nor: [ { "$eq": [ "$status", "A" ] }, { "$eq": [ "$status", "B" ] } ] }` |

## Arithmetic Operators

| Operator    | Syntax                               | Description                             | Example                          |
| ----------- | ------------------------------------ | --------------------------------------- | -------------------------------- |
| `$add`      | `{ $add: [value1, value2 ] }`        | Adds numbers together.                  | `{ $add: [ "$price", 10 ] }`     |
| `$subtract` | `{ $subtract: [ "$field", value ] }` | Subtracts second number from first one. | `{ $subtract: [ "$price", 5 ] }` |
| `$multiply` | `{ $multiply: [ "$field", value ] }` | Multiplies numbers.                     | `{ $multiply: [ "$price", 2 ] }` |
| `$divide`   | `{ $divide: [ "$field", value ] }`   | Divides first number by second one.     | `{ $divide: [ "$price", 2 ] }`   |
| `$mod`      | `{ $mod: [ "$field", value ] }`      | Returns the remainder of division.      | `{ $mod: [ "$price", 2 ] }`      |

## String Operators

| Operator    | Syntax                                               | Description                        | Example                                           |
| ----------- | ---------------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
| `$concat`   | `{ $concat: [ "$field1", "separator", "$field2" ] }` | Concatenates multiple strings.     | `{ $concat: [ "$firstName", " ", "$lastName" ] }` |
| `$substrCP` | `{ $substrCP: [ "$field", start, length ] }`         | Extracts a substring (UTF-8 safe). | `{ $substrCP: [ "$name", 0, 3 ] }`                |
| `$toUpper`  | `{ $toUpper: "$field" }`                             | Converts a string to uppercase.    | `{ $toUpper: "$name" }`                           |
| `$toLower`  | `{ $toLower: "$field" }`                             | Converts a string to lowercase.    | `{ $toLower: "$name" }`                           |

## Array Operators

MongoDB provides a variety of array operators to manipulate and analyze arrays
within documents. Below is a categorized list of array operators, along with
their descriptions and examples.

### 📌 Array Query Operators

| Operator | Syntax                                                    | Description                                                          | Example                                                  |
| -------- | --------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| `$in`    | `{ $in: [ value, "$field which resolves to an array" ] }` | Checks if **the specified value** exists inside the **array field**. | `{ $set: { hasLaptop: { $in: ["Laptop", "$items"] } } }` |
| `$size`  | `{ $size: "$field" }`                                     | Returns the **number of elements** in the array field.               | `{ $set: { itemCount: { $size: "$items" } } }`           |

### 📌 Array Element Manipulation Operators

| Operator    | Syntax                                                              | Description                                                    | Example                                               |
| ----------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| `$push`     | `{ $push: { field: value } }`                                       | Adds an element to an array.                                   | `{ $push: { items: "Tablet" } }`                      |
| `$pop`      | `{ $pop: { field: <1 or -1> } }`                                    | Removes the first (`-1`) or last (`1`) element from an array.  | `{ $pop: { items: 1 } }`                              |
| `$pull`     | `{ $pull: { field: condition } }`                                   | Removes all matching elements from an array.                   | `{ $pull: { tags: "obsolete" } }`                     |
| `$pullAll`  | `{ $pullAll: { field: [values] } }`                                 | Removes all occurrences of the specified values.               | `{ $pullAll: { tags: ["deprecated", "old"] } }`       |
| `$addToSet` | `{ $addToSet: { field: value } }`                                   | Adds an element to an array only if it does not already exist. | `{ $addToSet: { tags: "uniqueTag" } }`                |
| `$each`     | `{ $push: { field: { $each: [values to push into the array ] } } }` | Used with `$push` or `$addToSet` to add multiple elements.     | `{ $push: { items: { $each: ["Item1", "Item2"] } } }` |

### 📌 Array Aggregation Operators

| Operator        | Syntax                                                               | Description                                                        | Example                                                                                        |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `$arrayElemAt`  | `{ $arrayElemAt: [array, index] }`                                   | Returns the element at the specified index in an array.            | `{ $arrayElemAt: ["$items", 1] }`                                                              |
| `$concatArrays` | `{ $concatArrays: [array1, array2, ...] }`                           | Merges multiple arrays into one.                                   | `{ $concatArrays: ["$items", "$extras"] }`                                                     |
| `$filter`       | `{ $filter: { input: array, as: var, cond: condition } }`            | Returns an array with elements that satisfy a specified condition. | `{ $filter: { input: "$items", as: "item", cond: { $gt: ["$$item.price", 100] } } }`           |
| `$slice`        | `{ $slice: [array, n] }` or `{ $slice: [array, start, count] }`      | Returns a subset of an array.                                      | `{ $slice: ["$items", 2] }` (first 2 elements)                                                 |
| `$reverseArray` | `{ $reverseArray: array }`                                           | Reverses the order of an array.                                    | `{ $reverseArray: "$items" }`                                                                  |
| `$reduce`       | `{ $reduce: { input: array, initialValue: value, in: expression } }` | Processes an array to compute a single value.                      | `{ $reduce: { input: "$items", initialValue: 0, in: { $add: ["$$value", "$$this.price"] } } }` |
| `$map`          | `{ $map: { input: array, as: var, in: expression } }`                | Transforms each element in an array.                               | `{ $map: { input: "$items", as: "item", in: "$$item.price" } }`                                |
| `$zip`          | `{ $zip: { inputs: [array1, array2, ...] } }`                        | Merges arrays by combining elements at corresponding indexes.      | `{ $zip: { inputs: ["$array1", "$array2"] } }`                                                 |

## Type Conversion Operators

| Operator     | Syntax                  | Description                            | Example                     |
| ------------ | ----------------------- | -------------------------------------- | --------------------------- |
| `$toString`  | `{ $toString: value }`  | Converts a value to a string.          | `{ $toString: "$price" }`   |
| `$toInt`     | `{ $toInt: value }`     | Converts a value to an integer.        | `{ $toInt: "$price" }`      |
| `$toDouble`  | `{ $toDouble: value }`  | Converts a value to a double (float).  | `{ $toDouble: "$rating" }`  |
| `$toDecimal` | `{ $toDecimal: value }` | Converts a value to a decimal.         | `{ $toDecimal: "$amount" }` |
| `$toBool`    | `{ $toBool: value }`    | Converts a value to a boolean.         | `{ $toBool: "$isActive" }`  |
| `$toDate`    | `{ $toDate: value }`    | Converts a value to a date.            | `{ $toDate: "$timestamp" }` |
| `$toLong`    | `{ $toLong: value }`    | Converts a value to a 64-bit integer.  | `{ $toLong: "$bigNumber" }` |
| `$type`      | `{ $type: value }`      | Returns the BSON data type of a value. | `{ $type: "$someField" }`   |

## Conditional Operators

| Operator  | Syntax                                                                          | Description                                            | Example                                                                                            |
| --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `$cond`   | `{ $cond: { if: condition, then: value, else: value } }`                        | If-else logic for conditional expressions.             | `{ $cond: { if: { $gt: [ "$price", 100 ] }, then: "expensive", else: "cheap" } }`                  |
| `$ifNull` | `{ $ifNull: [ field, defaultValue ] }`                                          | Returns a default value if a field is null or missing. | `{ $ifNull: [ "$discount", 0 ] }`                                                                  |
| `$switch` | `{ $switch: { branches: [{ case: condition, then: value }], default: value } }` | Multiple if-else conditions (like switch-case).        | `{ $switch: { branches: [{ case: { $gte: [ "$age", 18 ] }, then: "Adult" }], default: "Minor" } }` |

## Date Operators

| Operator          | Syntax                                                       | Description                                             | Example                                                         |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------- |
| `$dateToString`   | `{ $dateToString: { format: "formatString", date: field } }` | Converts a date to a formatted string.                  | `{ $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }` |
| `$year`           | `{ $year: field }`                                           | Extracts the year from a date.                          | `{ $year: "$orderDate" }`                                       |
| `$month`          | `{ $month: field }`                                          | Extracts the month from a date.                         | `{ $month: "$orderDate" }`                                      |
| `$dayOfMonth`     | `{ $dayOfMonth: field }`                                     | Extracts the day of the month.                          | `{ $dayOfMonth: "$orderDate" }`                                 |
| `$hour`           | `{ $hour: field }`                                           | Extracts the hour from a date.                          | `{ $hour: "$orderDate" }`                                       |
| `$minute`         | `{ $minute: field }`                                         | Extracts the minute from a date.                        | `{ $minute: "$orderDate" }`                                     |
| `$second`         | `{ $second: field }`                                         | Extracts the second from a date.                        | `{ $second: "$orderDate" }`                                     |
| `$millisecond`    | `{ $millisecond: field }`                                    | Extracts the milliseconds from a date.                  | `{ $millisecond: "$orderDate" }`                                |
| `$dayOfWeek`      | `{ $dayOfWeek: field }`                                      | Returns the day of the week (1 = Sunday, 7 = Saturday). | `{ $dayOfWeek: "$orderDate" }`                                  |
| `$week`           | `{ $week: field }`                                           | Returns the week number of the year.                    | `{ $week: "$orderDate" }`                                       |
| `$dateFromString` | `{ $dateFromString: { dateString: field } }`                 | Converts a formatted string to a date.                  | `{ $dateFromString: { dateString: "2025-04-03T10:15:30Z" } }`   |

## Set Operators

| Operator           | Syntax                                           | Description                                  | Example                                        |
| ------------------ | ------------------------------------------------ | -------------------------------------------- | ---------------------------------------------- |
| `$setUnion`        | `{ $setUnion: [ "$array1", "$array2", ... ] }`   | Returns the union of multiple sets (arrays). | `{ $setUnion: [ "$tags1", "$tags2" ] }`        |
| `$setIntersection` | `{ $setIntersection: [ "$array1", "$array2" ] }` | Returns the intersection of multiple sets.   | `{ $setIntersection: [ "$tags1", "$tags2" ] }` |
| `$setDifference`   | `{ $setDifference: [ "$array1", "$array2" ] }`   | Returns the difference between two sets.     | `{ $setDifference: [ "$tags1", "$tags2" ] }`   |

# Regex Operators

| Operator   | Syntax                                     | Description                                       | Example                                                                         |
| ---------- | ------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `$regex`   | `{ "$regex": "pattern" }`                  | Matches a string against a regex pattern.         | `{ "name": { "$regex": "^A" } }` (Names starting with A)                        |
| `$options` | `{ "$regex": "pattern", "$options": "i" }` | Specifies regex options (e.g., case-insensitive). | `{ "name": { "$regex": "john", "$options": "i" } }` (Matches "John" and "john") |

This document provides a structured overview of MongoDB aggregation
sub-operators, making it easier to understand and reference. 🚀
