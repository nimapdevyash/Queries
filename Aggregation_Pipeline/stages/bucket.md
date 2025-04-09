# 🔹 MongoDB `$set` Stage Operator

The `$set` stage in MongoDB's aggregation pipeline is used to **add new fields**
or **update existing fields** in the documents that pass through the pipeline.

> 📌 `$set` is an alias of `$addFields`. Both can be used interchangeably.

---

## 📌 Syntax

```json
{
  "$set": {
    "newField": <expression>,
    "existingField": <updated_expression>
  }
}
```

---

## ✅ Example: Add a new field

```json
{
  "$set": {
    "isActive": true
  }
}
```

### Result:

```json
{
  "_id": 1,
  "name": "Alice",
  "isActive": true
}
```

---

## ✅ Example: Update existing field

```json
{
  "$set": {
    "score": { "$add": ["$score", 10] }
  }
}
```

### Result:

```json
{
  "_id": 1,
  "score": 90 // assuming original score was 80
}
```

---

## ✅ Example: Add nested fields

```json
{
  "$set": {
    "status": {
      "level": "high",
      "priority": 1
    }
  }
}
```

---

## ✅ Example: Combine with `$cond` for conditional logic

```json
{
  "$set": {
    "status": {
      "$cond": [{ "$gte": ["$score", 90] }, "passed", "failed"]
    }
  }
}
```

---

## ⚠️ Caveats & Gotchas

1. Fields added/updated using `$set` are immediately available to next stages.
2. You can overwrite existing fields, but be cautious if the field is crucial to
   previous logic.
3. `$set` is exactly the same as `$addFields` – no performance or functional
   difference.
4. You can add multiple fields in one `$set` stage.
5. Works best when paired with `$project`, `$match`, or `$group` for effective
   data shaping.
