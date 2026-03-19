In **Express.js**, both `express.json()` and `express.urlencoded()` are **middleware functions used to parse the body of incoming HTTP requests**, but they handle **different data formats**.

---

### 1️⃣ `express.json()`

`express.json()` parses **JSON data** sent in the request body.

It is used when the client sends data with:

```
Content-Type: application/json
```

### Example request

```json
{
  "name": "Ahmed",
  "age": 22
}
```

### Example server

```javascript
import express from "express";

const app = express();

app.use(express.json());

app.post("/user", (req, res) => {
    console.log(req.body);
    res.send("Received");
});

app.listen(3000);
```

### Result

```javascript
req.body = {
  name: "Ahmed",
  age: 22
}
```

Typical sources:

* Frontend apps
* APIs
* Mobile apps
* `fetch()` or `axios`

Example:

```javascript
fetch("/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ahmed" })
});
```

---

### 2️⃣ `express.urlencoded()`

`express.urlencoded()` parses **URL-encoded form data**.

It is used when the client sends:

```
Content-Type: application/x-www-form-urlencoded
```

### Example request body

```
name=Ahmed&age=22
```

### Example server

```javascript
app.use(express.urlencoded({ extended: true }));

app.post("/user", (req, res) => {
    console.log(req.body);
    res.send("Received");
});
```

### Result

```javascript
req.body = {
  name: "Ahmed",
  age: "22"
}
```

Typical sources:

* **HTML forms**

Example:

```html
<form action="/user" method="POST">
  <input name="name" />
  <input name="age" />
  <button type="submit">Submit</button>
</form>
```

---

### 3️⃣ The `extended` option

```javascript
express.urlencoded({ extended: true })
```

* `true` → allows **nested objects**
* `false` → only **simple key-value pairs**

Example with `true`:

```
user[name]=Ahmed&user[age]=22
```

becomes:

```javascript
{
  user: {
    name: "Ahmed",
    age: "22"
  }
}
```

---

### 4️⃣ Quick Comparison

| Feature      | `express.json()`     | `express.urlencoded()`              |
| ------------ | -------------------- | ----------------------------------- |
| Parses       | JSON                 | URL encoded form data               |
| Content-Type | `application/json`   | `application/x-www-form-urlencoded` |
| Used by      | APIs / frontend apps | HTML forms                          |
| Example body | `{"name":"Ahmed"}`   | `name=Ahmed`                        |

---

✅ **In most modern APIs you mainly use:**

```javascript
app.use(express.json());
```

because APIs usually send **JSON**.

---

💡 **Best practice (common in most servers):**

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

so the server can handle **both JSON APIs and HTML forms**.

---
