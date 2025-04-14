# 📦 `$mergeObjects` — MongoDB Aggregation Operator

## 🔧 Syntax

```js
{ $mergeObjects: [ <object1>, <object2>, ... ] }
```

- Accepts two or more documents (objects or expressions that evaluate to documents).
- Returns a **new merged document**.
- **Right-most values override left-most** on field conflicts.

---

## 🌟 Use Cases

### 1. **Merging Lookup Results**
When you join collections using `$lookup`, you often get a subdocument. To flatten and merge it with the root document:

```js
{
  $replaceRoot: {
    newRoot: {
      $mergeObjects: [ { $arrayElemAt: ["$managerDetails", 0] }, "$$ROOT" ]
    }
  }
}
```

### 2. **Overriding Fields Dynamically**

You can override specific fields in a document:

```js
{
  $addFields: {
    updatedDoc: {
      $mergeObjects: [
        "$$ROOT",
        { status: "archived", updatedAt: new Date() }
      ]
    }
  }
}
```

### 3. **Combining Multiple Sources**

Merge multiple field groups (like metadata, user profile, preferences) into one doc.

```js
{
  $project: {
    combined: {
      $mergeObjects: [ "$meta", "$userInfo", "$preferences" ]
    }
  }
}
```

---

## ⚠️ Caveats & Gotchas

### ❗ 1. Order Matters
Fields in later objects override those in earlier ones.

```js
{ $mergeObjects: [ { name: "A" }, { name: "B" } ] } // Result: { name: "B" }
```

### ❗ 2. Array Inputs Must Be Handled
If you're merging an array like from `$lookup`, always use `$arrayElemAt`:

```js
$mergeObjects: [ { $arrayElemAt: ["$lookupResult", 0] }, "$$ROOT" ]
```

### ❗ 3. Nested Objects Not Deep-Merged
It’s **shallow merge** only:
```js
$mergeObjects: [
  { config: { theme: "dark", lang: "en" } },
  { config: { lang: "fr" } }
]
// Result: { config: { lang: "fr" } } — not both fields
```

### ❗ 4. Works Only in Aggregation Pipeline
This is **not available** in update queries or normal find operations.

---

## 🧪 Examples

### ✅ Example 1: Simple Merge

```js
{
  $project: {
    mergedDoc: {
      $mergeObjects: [
        { name: "Yash", role: "dev" },
        { role: "senior dev", location: "Pune" }
      ]
    }
  }
}
// Result:
// {
//   mergedDoc: {
//     name: "Yash",
//     role: "senior dev",
//     location: "Pune"
//   }
// }
```




