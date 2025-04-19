# 🧩 Working with Arrays in Sequelize

## Why Arrays Matter
PostgreSQL allows columns to store arrays directly (e.g., `TEXT[]`, `INTEGER[]`). Sequelize supports querying and manipulating these arrays when using PostgreSQL. This is helpful in tagging systems, multiple-choice fields, etc.

---

## 🛠️ Defining an Array Column in a Model
```js
const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  tags: DataTypes.ARRAY(DataTypes.STRING)
});
```

---

## 🔍 Querying Array Fields

### ✅ Find records containing a value in the array
```js
const result = await Product.findAll({
  where: {
    tags: {
      [Op.contains]: ['electronics']
    }
  }
});
```
> `Op.contains` checks if the array contains all specified elements.

### ✅ Find records where array contains ANY of multiple values
```js
const result = await Product.findAll({
  where: {
    tags: {
      [Op.overlap]: ['home', 'garden']
    }
  }
});
```
> `Op.overlap` checks if any of the values exist in the array.

### ✅ Find records with exact array match
```js
const result = await Product.findAll({
  where: {
    tags: ['electronics', 'mobile']
  }
});
```

### ✅ Array Length
You can use a raw query for this:
```js
const result = await sequelize.query(`
  SELECT * FROM "Products" WHERE array_length("tags", 1) = 2
`, { model: Product, mapToModel: true });
```

---

## ➕ Adding or Removing Array Elements
You generally need to fetch, modify, and then update the model:
```js
const product = await Product.findByPk(1);
product.tags.push('newTag');
await product.save();
```

For removal:
```js
product.tags = product.tags.filter(tag => tag !== 'oldTag');
await product.save();
```

---

## 💥 Gotchas
- Array support is **only** for PostgreSQL.
- Be cautious when checking exact equality; order matters.
- Filtering with `Op.contains` and `Op.overlap` is PostgreSQL-specific.

---

## 💡 Tips
- Use arrays for fast lookup and filtering on tags, roles, categories.
- Prefer normalized many-to-many relations when the array gets large or frequently updated.
- Use raw queries when you need custom array operations (e.g. checking length, slicing, etc).

---

## 🧠 Summary
Sequelize makes working with PostgreSQL arrays simple using `DataTypes.ARRAY`. Use operators like `Op.contains`, `Op.overlap` for flexible querying. For advanced manipulation, raw queries give you full PostgreSQL power.

