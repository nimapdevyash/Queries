# MongoDB Aggregation Sub-Operators

## Comparison Operators

| Operator | Description                                            | Example                      |
| -------- | ------------------------------------------------------ | ---------------------------- |
| `$eq`    | Checks if values are equal.                            | `{ $eq: [ "$price", 100 ] }` |
| `$ne`    | Checks if values are not equal.                        | `{ $ne: [ "$price", 100 ] }` |
| `$gt`    | Checks if a value is greater than another.             | `{ $gt: [ "$price", 50 ] }`  |
| `$gte`   | Checks if a value is greater than or equal to another. | `{ $gte: [ "$price", 50 ] }` |
| `$lt`    | Checks if a value is less than another.                | `{ $lt: [ "$price", 50 ] }`  |
| `$lte`   | Checks if a value is less than or equal to another.    | `{ $lte: [ "$price", 50 ] }` |

## Logical Operators

| Operator | Description                                      | Example                                                                      |
| -------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `$and`   | Returns true if all conditions are true.         | `{ $and: [ { "$gt": [ "$price", 50 ] }, { "$lt": [ "$price", 200 ] } ] }`    |
| `$or`    | Returns true if at least one condition is true.  | `{ $or: [ { "$eq": [ "$status", "A" ] }, { "$eq": [ "$status", "B" ] } ] }`  |
| `$not`   | Inverts the Boolean result of a condition.       | `{ $not: { "$eq": [ "$status", "A" ] } }`                                    |
| `$nor`   | Returns true if none of the conditions are true. | `{ $nor: [ { "$eq": [ "$status", "A" ] }, { "$eq": [ "$status", "B" ] } ] }` |

## Arithmetic Operators

| Operator    | Description                        | Example                          |
| ----------- | ---------------------------------- | -------------------------------- |
| `$add`      | Adds numbers together.             | `{ $add: [ "$price", 10 ] }`     |
| `$subtract` | Subtracts one number from another. | `{ $subtract: [ "$price", 5 ] }` |
| `$multiply` | Multiplies numbers.                | `{ $multiply: [ "$price", 2 ] }` |
| `$divide`   | Divides one number by another.     | `{ $divide: [ "$price", 2 ] }`   |
| `$mod`      | Returns the remainder of division. | `{ $mod: [ "$price", 2 ] }`      |

## String Operators

| Operator    | Description                        | Example                                           |
| ----------- | ---------------------------------- | ------------------------------------------------- |
| `$concat`   | Concatenates multiple strings.     | `{ $concat: [ "$firstName", " ", "$lastName" ] }` |
| `$substrCP` | Extracts a substring (UTF-8 safe). | `{ $substrCP: [ "$name", 0, 3 ] }`                |
| `$toUpper`  | Converts a string to uppercase.    | `{ $toUpper: "$name" }`                           |
| `$toLower`  | Converts a string to lowercase.    | `{ $toLower: "$name" }`                           |

## Array Operators

MongoDB provides a variety of array operators to manipulate and analyze arrays
within documents. Below is a categorized list of array operators, along with
their descriptions and examples.

### 📌 Array Query Operators

| Operator     | Description                                                                            | Example                                                              |
| ------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `$size`      | Returns the number of elements in an array.                                            | `{ $size: "$items" }`                                                |
| `$all`       | Matches arrays that contain all specified elements.                                    | `{ tags: { $all: ["mongodb", "database"] } }`                        |
| `$elemMatch` | Matches documents where at least one array element satisfies all specified conditions. | `{ reviews: { $elemMatch: { rating: { $gte: 4 }, user: "John" } } }` |

### 📌 Array Element Manipulation Operators

| Operator    | Description                                                    | Example                                               |
| ----------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| `$push`     | Adds an element to an array.                                   | `{ $push: { items: "Tablet" } }`                      |
| `$pop`      | Removes the first (`-1`) or last (`1`) element from an array.  | `{ $pop: { items: 1 } }`                              |
| `$pull`     | Removes all matching elements from an array.                   | `{ $pull: { tags: "obsolete" } }`                     |
| `$pullAll`  | Removes all occurrences of the specified values.               | `{ $pullAll: { tags: ["deprecated", "old"] } }`       |
| `$addToSet` | Adds an element to an array only if it does not already exist. | `{ $addToSet: { tags: "uniqueTag" } }`                |
| `$set`      | Updates a field, replacing an array entirely.                  | `{ $set: { items: ["NewItem1", "NewItem2"] } }`       |
| `$each`     | Used with `$push` or `$addToSet` to add multiple elements.     | `{ $push: { items: { $each: ["Item1", "Item2"] } } }` |

### 📌 Array Aggregation Operators

| Operator        | Description                                                        | Example                                                                                        |
| --------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `$arrayElemAt`  | Returns the element at the specified index in an array.            | `{ $arrayElemAt: ["$items", 1] }`                                                              |
| `$concatArrays` | Merges multiple arrays into one.                                   | `{ $concatArrays: ["$items", "$extras"] }`                                                     |
| `$filter`       | Returns an array with elements that satisfy a specified condition. | `{ $filter: { input: "$items", as: "item", cond: { $gt: ["$$item.price", 100] } } }`           |
| `$slice`        | Returns a subset of an array.                                      | `{ $slice: ["$items", 2] }` (first 2 elements)                                                 |
| `$reverseArray` | Reverses the order of an array.                                    | `{ $reverseArray: "$items" }`                                                                  |
| `$reduce`       | Processes an array to compute a single value.                      | `{ $reduce: { input: "$items", initialValue: 0, in: { $add: ["$$value", "$$this.price"] } } }` |
| `$map`          | Transforms each element in an array.                               | `{ $map: { input: "$items", as: "item", in: "$item.price" } }`                                 |
| `$zip`          | Merges arrays by combining elements at corresponding indexes.      | `{ $zip: { inputs: ["$array1", "$array2"] } }`                                                 |

## Type Conversion Operators

| Operator    | Description                     | Example                   |
| ----------- | ------------------------------- | ------------------------- |
| `$toString` | Converts a value to a string.   | `{ $toString: "$price" }` |
| `$toInt`    | Converts a value to an integer. | `{ $toInt: "$price" }`    |

## Conditional Operators

| Operator  | Description                                            | Example                                                                                            |
| --------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `$cond`   | If-else logic for conditional expressions.             | `{ $cond: { if: { $gt: [ "$price", 100 ] }, then: "expensive", else: "cheap" } }`                  |
| `$ifNull` | Returns a default value if a field is null or missing. | `{ $ifNull: [ "$discount", 0 ] }`                                                                  |
| `$switch` | Multiple if-else conditions (like switch-case).        | `{ $switch: { branches: [{ case: { $gte: [ "$age", 18 ] }, then: "Adult" }], default: "Minor" } }` |

## Date Operators

| Operator        | Description                            | Example                                                         |
| --------------- | -------------------------------------- | --------------------------------------------------------------- |
| `$dateToString` | Converts a date to a formatted string. | `{ $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }` |
| `$year`         | Extracts the year from a date.         | `{ $year: "$orderDate" }`                                       |
| `$month`        | Extracts the month from a date.        | `{ $month: "$orderDate" }`                                      |

## Set Operators

| Operator           | Description                                  | Example                                        |
| ------------------ | -------------------------------------------- | ---------------------------------------------- |
| `$setUnion`        | Returns the union of multiple sets (arrays). | `{ $setUnion: [ "$tags1", "$tags2" ] }`        |
| `$setIntersection` | Returns the intersection of multiple sets.   | `{ $setIntersection: [ "$tags1", "$tags2" ] }` |
| `$setDifference`   | Returns the difference between two sets.     | `{ $setDifference: [ "$tags1", "$tags2" ] }`   |

This document provides a structured overview of MongoDB aggregation
sub-operators, making it easier to understand and reference. 🚀
