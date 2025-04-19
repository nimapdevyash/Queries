
# Mongoose Document Operations Notes

## Table of Contents
1. [Creating Documents](#creating-documents)
   - 1.1 [Using .save()](#using-save)
   - 1.2 [Using .create()](#using-create)
2. [Reading Documents](#reading-documents)
   - 2.1 [Using .find()](#using-find)
   - 2.2 [Using .findOne()](#using-findone)
   - 2.3 [Using .findById()](#using-findbyid)
3. [Updating Documents](#updating-documents)
   - 3.1 [Using .updateOne()](#using-updateone)
   - 3.2 [Using .updateMany()](#using-updatemany)
   - 3.3 [Using .findOneAndUpdate()](#using-findoneandupdate)
4. [Deleting Documents](#deleting-documents)
   - 4.1 [Using .deleteOne()](#using-deleteone)
   - 4.2 [Using .deleteMany()](#using-deletemany)
   - 4.3 [Using .findOneAndDelete()](#using-findoneanddelete)
5. [Caveats and Gotchas](#caveats-and-gotchas)
6. [Tips and Best Practices](#tips-and-best-practices)

---

## Creating Documents

### 1.1 Using .save()

The `.save()` method is used to persist an individual document to the database. It can be used on an instance of a model.

```js
const User = mongoose.model('User', new mongoose.Schema({ name: String }));

const newUser = new User({ name: 'John Doe' });

newUser.save()
  .then(() => console.log('User saved!'))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.save()` triggers validation and hooks, which can impact performance. 
- You can disable validation and hooks by passing `{ validate: false }` as an option.

```js
newUser.save({ validate: false })
  .then(() => console.log('User saved without validation!'));
```

---

### 1.2 Using .create()

The `.create()` method is used to create one or more documents in a collection. It is a shortcut for creating and saving documents.

```js
User.create({ name: 'Jane Doe' })
  .then(() => console.log('User created!'))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Unlike `.save()`, `.create()` bypasses validation on the document before it is saved. This means you don’t have hooks executed in the same way.
- You can create multiple documents at once by passing an array of objects to `.create()`.

---

## Reading Documents

### 2.1 Using .find()

The `.find()` method is used to find multiple documents based on query criteria.

```js
User.find({ name: 'John Doe' })
  .then(users => console.log(users))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.find()` returns an array of documents. If no documents match the query, it returns an empty array.
- It is important to set pagination limits if you’re expecting large datasets to avoid overwhelming the system.
- The `.lean()` method can be used to retrieve plain JavaScript objects instead of Mongoose documents, improving performance.

```js
User.find({ name: 'John Doe' }).lean()
  .then(users => console.log(users));
```

### 2.2 Using .findOne()

The `.findOne()` method returns a single document based on the query criteria.

```js
User.findOne({ name: 'John Doe' })
  .then(user => console.log(user))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Returns `null` if no document matches the query.
- It can be slower if not indexed properly. Ensure common search fields like email or username are indexed.

### 2.3 Using .findById()

The `.findById()` method is a shortcut for finding a document by its `_id`.

```js
User.findById('someMongoObjectId')
  .then(user => console.log(user))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.findById()` is a simplified version of `.find()` where the query is specifically for `_id`.
- It can be slower than `.find()` when querying by fields other than `_id`.

---

## Updating Documents

### 3.1 Using .updateOne()

The `.updateOne()` method is used to update a single document that matches the specified filter.

```js
User.updateOne({ name: 'John Doe' }, { $set: { name: 'John Smith' } })
  .then(result => console.log(result))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.updateOne()` does not trigger validation by default. To trigger validation, use `.findOneAndUpdate()` instead.
- Only one document will be updated, even if multiple documents match the query.

### 3.2 Using .updateMany()

The `.updateMany()` method is used to update multiple documents that match the filter.

```js
User.updateMany({ name: 'John Doe' }, { $set: { name: 'John Smith' } })
  .then(result => console.log(result))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Similar to `.updateOne()`, it doesn’t trigger validation.
- It’s a good practice to ensure your filter is as specific as possible to avoid unintentional updates.

### 3.3 Using .findOneAndUpdate()

The `.findOneAndUpdate()` method updates a single document and returns the updated document.

```js
User.findOneAndUpdate({ name: 'John Doe' }, { $set: { name: 'John Smith' } })
  .then(user => console.log(user))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Triggers validation by default.
- The updated document is returned, not the original one. If you need the original document, you can use the `new: false` option.
- If no document is found, `null` is returned.

---

## Deleting Documents

### 4.1 Using .deleteOne()

The `.deleteOne()` method removes a single document that matches the specified filter.

```js
User.deleteOne({ name: 'John Doe' })
  .then(result => console.log(result))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- `.deleteOne()` will only remove the first document that matches the filter.
- If no documents match, it returns an object with a `deletedCount` of 0.

### 4.2 Using .deleteMany()

The `.deleteMany()` method removes all documents that match the specified filter.

```js
User.deleteMany({ name: 'John Doe' })
  .then(result => console.log(result))
  .catch(err => console.log('Error:', err));
```

**Caveats & Gotchas:**
- Use `.deleteMany()` with caution as it could delete large amounts of data.
- Ensure your filter is as specific as possible.

### 4.3 Using .findOneAndDelete()

The `.findOneAndDelete()` method deletes a single document and returns the deleted document.

```js
User.findOneAndDelete({ name: 'John Doe' })
  .then(user => console.log(user))
  .catch(err => console.log('Error:", err));
```

**Caveats & Gotchas:**
- Returns the deleted document.
- Triggers validation, so you can use it for more controlled document deletions.

---

## Caveats and Gotchas

1. **Validation Impact**: Operations like `.updateOne()`, `.updateMany()`, and `.deleteOne()` do not trigger validation by default. Ensure to use `.findOneAndUpdate()` or similar methods if validation is needed.
2. **Concurrency Issues**: If you are performing multiple operations in parallel (like updating the same document in different places), make sure to handle potential race conditions.
3. **Defaults and Hooks**: Mongoose hooks (like `pre` and `post`) are only called when the document is saved via `.save()` or when updating via `.findOneAndUpdate()`, not `.updateOne()` or `.updateMany()`.

---

## Tips and Best Practices

1. **Use Lean Queries for Performance**: When you don’t need Mongoose documents (just plain JS objects), use `.lean()` to improve performance.
2. **Avoid Overusing `findOneAndUpdate`**: It’s often slower than other update methods, especially when handling a large dataset.
3. **Pagination in Queries**: When using `.find()`, always implement pagination (`limit()` and `skip()`) to avoid overwhelming your database and application.
4. **Avoid Using `.save()` in Loops**: Instead of calling `.save()` multiple times in a loop, consider using `.insertMany()` or `.updateMany()` for better performance.

---

