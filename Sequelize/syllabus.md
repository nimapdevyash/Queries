# Mastering Querying in Sequelize

## **1. Querying Concepts in Sequelize (Brief Overview)**

### **1.1 Basic Queries**

- Fetching all records:
  ```js
  Model.findAll();
  ```
- Fetching a single record:
  ```js
  Model.findOne();
  ```
- Fetching by primary key:
  ```js
  Model.findByPk(id);
  ```
- Counting records:
  ```js
  Model.count();
  ```

### **1.2 Filtering with `where`**

- Basic conditions:
  ```js
  {
    where: {
      name: "John";
    }
  }
  ```
- Operators (like `$gt`, `$lt`, `$in`):
  ```js
  { age: { [Op.gt]: 18 } }
  ```
- Multiple conditions with `AND` & `OR`
- Complex filtering with `Op.and`, `Op.or`

### **1.3 Selecting Specific Columns**

- Using `attributes`:
  ```js
  {
    attributes: ["name", "email"];
  }
  ```
- Excluding columns:
  ```js
  {
    attributes: {
      exclude: ["password"];
    }
  }
  ```

### **1.4 Sorting & Pagination**

- Sorting results:
  ```js
  {
    order: [["createdAt", "DESC"]];
  }
  ```
- Limiting and offset:
  ```js
  { limit: 10, offset: 20 }
  ```

### **1.5 Aggregations & Grouping**

- Counting, summing, averaging:
  ```js
  Model.findAll({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "totalUsers"]],
  });
  ```
- Grouping:
  ```js
  {
    group: ["category"];
  }
  ```

### **1.6 Joins & Associations**

- `include` for eager loading related models
- Specifying required or left joins
- Nesting associations

### **1.7 Transactions & Query Scoping**

- Running queries inside transactions
- Defining scopes for reusable filters

### **1.8 Raw Queries**

- Executing raw SQL:
  ```js
  sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT });
  ```

---

This gives us a high-level overview. Let me know which topic you’d like to dive
deep into first!
