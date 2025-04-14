# MongoDB `$replaceRoot` Stage

The `$replaceRoot` stage in MongoDB's aggregation pipeline is used to **replace the entire input document** with a specified document. This is especially useful when restructuring documents, flattening embedded fields, or merging data from other collections (e.g., after `$lookup`).

---

## 🔧 Syntax

```js
{
  $replaceRoot: {
    newRoot: <replacementDocument>
  }
}
```

- `newRoot`: An expression that defines the new document structure. Typically, this is the result of a `$mergeObjects` operation.

---

## 📌 Use Cases

### 1. 🔄 Flattening Embedded Documents

Given:
```js
{
  _id: 1,
  user: {
    name: "Alice",
    age: 25
  },
  location: "Mumbai"
}
```

You can flatten the `user` object:
```js
{
  $replaceRoot: { newRoot: "$user" }
}
```

Result:
```js
{
  name: "Alice",
  age: 25
}
```

### 2. 🔗 After `$lookup` to Promote Foreign Data

You perform a `$lookup` and want to merge the joined result into the main document:

```js
{
  $replaceRoot: {
    newRoot: {
      $mergeObjects: [ { $arrayElemAt: ["$managerDetails", 0] }, "$$ROOT" ]
    }
  }
}
```

Result:
- Merges the first matched `managerDetails` object into the root document.
- Then replaces the root with this merged object.

### 3. 🧹 Cleaning Up Temporary Nesting

When working with `$group` or reshaped pipelines, sometimes documents are nested unnecessarily. `$replaceRoot` can promote a nested field to the top level.

---

## ⚠️ Caveats

1. **Does Not Persist Changes**: Like all aggregation operations, `$replaceRoot` is non-destructive unless followed by `$merge` or `$out`.
2. **Document Must Be an Object**: The result of `newRoot` must evaluate to a valid object. Arrays or scalar values will throw errors.
3. **Array Handling**: If used with arrays (e.g., from `$lookup`), ensure you're referencing a specific element (e.g., `$arrayElemAt`) to avoid structure errors.

---

## ✅ Best Practices

- Use `$mergeObjects` with `$replaceRoot` to prevent losing important fields.
- Always validate the structure of the new document with `$project` before replacing the root.
- Avoid deeply nested `$mergeObjects` chains for readability.

---

## 🔁 Example: Merge Lookup Result into Root

Given:
```js
{
  _id: 1,
  project: "X",
  managerDetails: [
    { _id: 101, name: "Raj", region: "North" }
  ]
}
```

Pipeline:
```js
{
  $replaceRoot: {
    newRoot: {
      $mergeObjects: [
        { $arrayElemAt: ["$managerDetails", 0] },
        "$$ROOT"
      ]
    }
  }
}
```

Result:
```js
{
  _id: 1,
  project: "X",
  _id: 101,
  name: "Raj",
  region: "North",
  managerDetails: [ ... ]
}
```

You can follow up with `$project` to remove duplicate or unneeded fields.

---

## 🧠 Summary
- `$replaceRoot` is a powerful stage for restructuring documents.
- It shines when used with `$lookup` and `$mergeObjects` to promote and flatten foreign collection data.
- Ensure you're always producing an object and handling arrays properly to avoid aggregation errors.




