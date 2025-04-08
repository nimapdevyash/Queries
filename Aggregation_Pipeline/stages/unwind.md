## 🔹 MongoDB `$unwind` Stage Operator

The `$unwind` stage is used in MongoDB's aggregation pipeline to **deconstruct**
an array field from the input documents, creating **a separate document for each
element** of the array.

---

### 📌 **Syntax**

```json
{
  "$unwind": "$arrayField"
}
```

You can also use a more advanced syntax:

```json
{
  "$unwind": {
    "path": "$arrayField",
    "preserveNullAndEmptyArrays": true,
    "includeArrayIndex": "index"
  }
}
```

---

### 📌 **Parameters**

| Option                       | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `path`                       | The field path to an array field.                                          |
| `preserveNullAndEmptyArrays` | If `true`, documents with null or empty arrays are kept in the output.     |
| `includeArrayIndex`          | Optional. Adds the index of the array element to each document as a field. |

---

### 📌 **Example Usage**

#### Basic `$unwind`

**Document:**

```json
{
  "_id": 1,
  "name": "Alice",
  "hobbies": ["reading", "gaming", "coding"]
}
```

**Aggregation:**

```json
{ "$unwind": "$hobbies" }
```

**Result:**

```json
{ "_id": 1, "name": "Alice", "hobbies": "reading" }
{ "_id": 1, "name": "Alice", "hobbies": "gaming" }
{ "_id": 1, "name": "Alice", "hobbies": "coding" }
```

#### With `includeArrayIndex`

```json
{
  "$unwind": {
    "path": "$hobbies",
    "includeArrayIndex": "hobbyIndex"
  }
}
```

**Result:**

```json
{ "_id": 1, "name": "Alice", "hobbies": "reading", "hobbyIndex": 0 }
{ "_id": 1, "name": "Alice", "hobbies": "gaming", "hobbyIndex": 1 }
{ "_id": 1, "name": "Alice", "hobbies": "coding", "hobbyIndex": 2 }
```

#### With `preserveNullAndEmptyArrays`

```json
{
  "$unwind": {
    "path": "$hobbies",
    "preserveNullAndEmptyArrays": true
  }
}
```

**Input Document with null hobbies:**

```json
{ "_id": 2, "name": "Bob", "hobbies": null }
```

**Output:**

```json
{ "_id": 2, "name": "Bob", "hobbies": null }
```

---

### ⚠️ **Caveats & Gotchas**

1. **Empty or missing array field**:
   - If `preserveNullAndEmptyArrays` is `false` (default), the document is
     **removed**.
   - If `true`, the document is **retained** with a null/empty field.

2. **Non-array values** in the `path` field are treated as single-element
   arrays.

3. `$unwind` **increases the number of documents** in the output stage.

4. Best used before `$group`, `$match`, or `$project` for detailed breakdowns.

5. Useful for **denormalizing** data or working with **nested arrays**.

---

### ✅ **Best Practices**

- Combine with `$group` to compute stats on array elements.
- Use `includeArrayIndex` for **pagination** or ordering.
- Enable `preserveNullAndEmptyArrays` when you don’t want to lose data.
- Use cautiously with large arrays to avoid performance issues.
