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

| Operator            | Description                                                       | Example                                                                                                                            |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`$size`**         | Returns the number of elements in an array.                       | `{ $size: "$tags" }` → Returns the length of `tags` array.                                                                         |
| **`$slice`**        | Returns a subset of an array.                                     | `{ $slice: ["$items", 3] }` → Returns the first 3 elements from `items`.                                                           |
| **`$arrayElemAt`**  | Returns the element at a specified index.                         | `{ $arrayElemAt: ["$products", 1] }` → Returns the second element of `products`.                                                   |
| **`$concatArrays`** | Merges multiple arrays into a single array.                       | `{ $concatArrays: ["$array1", "$array2"] }` → Merges `array1` and `array2`.                                                        |
| **`$filter`**       | Returns an array containing only elements that match a condition. | `{ $filter: { input: "$grades", as: "grade", cond: { $gte: ["$$grade", 75] } } }` → Filters `grades` to include only values >= 75. |
| **`$map`**          | Applies a transformation to each element of an array.             | `{ $map: { input: "$prices", as: "price", in: { $multiply: ["$$price", 0.9] } } }` → Applies a 10% discount on `prices`.           |
| **`$reduce`**       | Condenses an array into a single value using an accumulator.      | `{ $reduce: { input: "$numbers", initialValue: 0, in: { $add: ["$$value", "$$this"] } } }` → Computes the sum of `numbers`.        |
| **`$reverseArray`** | Reverses the order of elements in an array.                       | `{ $reverseArray: "$names" }` → Returns `names` array in reverse order.                                                            |
| **`$zip`**          | Merges elements from multiple arrays based on their index.        | `{ $zip: { inputs: ["$arr1", "$arr2"] } }` → Combines `arr1` and `arr2` element-wise.                                              |
| **`$first`**        | Returns the first element of an array.                            | `{ $first: "$items" }` → Returns the first item of `items`.                                                                        |
| **`$last`**         | Returns the last element of an array.                             | `{ $last: "$items" }` → Returns the last item of `items`.                                                                          |
| **`$range`**        | Generates an array of numbers within a range.                     | `{ $range: [0, 10, 2] }` → Returns `[0, 2, 4, 6, 8]`.                                                                              |
| **`$in`**           | Checks if a value exists in an array.                             | `{ $in: ["apple", "$fruits"] }` → Checks if `apple` is in `fruits` array.                                                          |

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
