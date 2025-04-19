# 🔗 JOINING DATA IN SEQUELIZE

## Why Joins Matter
In relational databases, data is usually normalized into different tables to reduce redundancy. Joins help you fetch related data from multiple tables in a single query. Sequelize handles joins through **associations** (hasOne, belongsTo, hasMany, belongsToMany).

---

## 🔁 Sequelize Join Techniques

| Type of Join     | Sequelize Method       | Description                                        |
|------------------|-------------------------|----------------------------------------------------|
| INNER JOIN       | `include` (default)     | Returns records with matching associated records   |
| LEFT OUTER JOIN  | `include + required: false` | Returns all records from left table with matched records or NULL from right table |
| RIGHT OUTER JOIN | Not directly supported  | Can be done using raw queries                     |

---

## 🔗 Basic INNER JOIN Example
```js
const users = await User.findAll({
  include: [{ model: Profile }] // INNER JOIN
});
```
> By default, `include` performs an INNER JOIN.

---

## 🔗 LEFT OUTER JOIN Example
```js
const users = await User.findAll({
  include: [{ model: Profile, required: false }] // LEFT OUTER JOIN
});
```
> Setting `required: false` makes it a LEFT OUTER JOIN.

---

## 🔗 JOIN with Selected Attributes
```js
const users = await User.findAll({
  attributes: ['id', 'username'],
  include: [{
    model: Profile,
    attributes: ['bio', 'location']
  }]
});
```

---

## 🔗 JOIN with WHERE condition inside JOINED table
```js
const users = await User.findAll({
  include: [{
    model: Profile,
    where: { location: 'Pune' }
  }]
});
```
> This filters the `Profile` model before joining, resulting in fewer User rows.

---

## 🔗 JOIN with WHERE on Parent and Child
```js
const users = await User.findAll({
  where: { isActive: true },
  include: [{
    model: Profile,
    where: { location: 'Pune' },
    required: true
  }]
});
```

---

## 🔁 Multiple Joins
```js
const users = await User.findAll({
  include: [
    { model: Profile },
    { model: Role }
  ]
});
```
> You can join as many associated models as you like.

---

## 🔄 Nested Joins (Join within a Join)
```js
const users = await User.findAll({
  include: [{
    model: Profile,
    include: [{ model: Address }]
  }]
});
```
> Sequelize supports deep/nested includes.

---

## 🎯 Filtering with LEFT OUTER JOIN (NULL Check)
```js
const usersWithNoProfiles = await User.findAll({
  include: [{
    model: Profile,
    required: false
  }],
  where: {
    '$Profile.id$': null
  }
});
```
> `$Model.field$` allows filtering on JOINED model fields.

---

## 💥 Gotchas
- Sequelize doesn't directly support RIGHT JOIN.
- Always add `required: true/false` based on expected results.
- Use `$Model.field$` in `where` when filtering on JOINED fields.
- Using `include` triggers joins even if not all fields are used—be aware of performance.

---

## 💡 Tips
- Prefer INNER JOIN (`required: true`) for filtering based on joined data.
- Prefer LEFT OUTER JOIN (`required: false`) when fetching parent data regardless of associated child data.
- Use aliases in associations for clarity and flexibility.
- Use `subQuery: false` if Sequelize adds subqueries unnecessarily and you want a flatter join.

---

## 🛠️ Real-World Use Cases

### ✅ 1. Users with Profile Info
```js
const users = await User.findAll({
  include: [Profile]
});
```

### ✅ 2. Active Users in Pune
```js
const users = await User.findAll({
  where: { isActive: true },
  include: [{
    model: Profile,
    where: { location: 'Pune' }
  }]
});
```

### ✅ 3. Users without Profiles
```js
const users = await User.findAll({
  include: [{ model: Profile, required: false }],
  where: { '$Profile.id$': null }
});
```

### ✅ 4. Nested Join: Users > Profile > Address
```js
const users = await User.findAll({
  include: [{
    model: Profile,
    include: [Address]
  }]
});
```

---

## 🧠 Summary
Sequelize joins are powerful when you use `include`, and the `required` flag allows you to switch between INNER and LEFT OUTER joins. Use `$Model.field$` to filter on joined model fields. Avoid overfetching by selecting only required attributes. Sequelize makes joining structured and intuitive, but a good understanding of SQL join principles always helps.

Next, we’ll explore advanced join scenarios like join with alias, polymorphic associations, and raw query joins when Sequelize's abstraction doesn't meet our needs.

