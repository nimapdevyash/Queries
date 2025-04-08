## 🔹 MongoDB Array Operators

| Operator           | Description                                                      | Example                                                   | Caveats / Gotchas                                                                                                |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `$in`              | Matches if the field's value is **inside** an array              | `{ country: { "$in": ["India", "USA", "UK"] } }`          | Useful for filtering multiple values, but does **not** match elements inside nested arrays.                      |
| `$nin`             | Matches if the field's value is **not inside** an array          | `{ category: { "$nin": ["electronics", "furniture"] } }`  | Opposite of `$in`. Be cautious when using with **missing fields**, as it will match documents without the field. |
| `$all`             | Matches arrays containing **all specified values**               | `{ tags: { "$all": ["mongodb", "database"] } }`           | Works only with arrays, unlike `$in`, which works with both arrays and scalars.                                  |
| `$size`            | Matches arrays with a **specific number of elements**            | `{ items: { "$size": 3 } }`                               | `$size` only works with exact matches, not ranges (e.g., cannot find arrays **greater than** a size).            |
| `$elemMatch`       | Matches at least one element in an array based on criteria       | `{ items: { "$elemMatch": { "price": { "$gt": 50 } } } }` | Useful for matching **multiple conditions** inside a single array element.                                       |
| `$push`            | Adds an element to an array **(Used in updates, not in $match)** | `{ "$push": { "tags": "newTag" } }`                       | Can cause unbounded array growth. Use `$slice` to limit array size.                                              |
| `$addToSet`        | Adds an element only if it **does not already exist**            | `{ "$addToSet": { "tags": "uniqueTag" } }`                | Prevents duplicates but **does not** guarantee uniqueness for deeply nested arrays.                              |
| `$pop`             | Removes the **first** or **last** element from an array          | `{ "$pop": { "items": -1 } }` (Removes first)             | Use `-1` to remove the first element, `1` to remove the last.                                                    |
| `$pull`            | Removes specific elements from an array                          | `{ "$pull": { "tags": "mongodb" } }`                      | Matches **and removes** all occurrences of the value.                                                            |
| `$pullAll`         | Removes **multiple** specific values from an array               | `{ "$pullAll": { "tags": ["mongodb", "database"] } }`     | Unlike `$pull`, `$pullAll` removes **only** the specified elements.                                              |
| `$push with $each` | Adds **multiple** elements at once                               | `{ "$push": { "tags": { "$each": ["tag1", "tag2"] } } }`  | Useful for batch insertions; can be combined with `$position`, `$slice`, and `$sort`.                            |

### 📌 **Operators That Can Be Used Inside `$match`**

- `$in`
- `$nin`
- `$all`
- `$size`
- `$elemMatch`
