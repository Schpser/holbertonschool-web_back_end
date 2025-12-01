# 💾 NoSQL - MongoDB

Welcome to the **NoSQL - MongoDB** project! 🎉 This repository is designed to introduce you to the world of NoSQL databases, focusing on MongoDB. You will learn the fundamental differences between SQL and NoSQL, perform basic to advanced operations using the `mongo` shell, and integrate MongoDB with Python using `PyMongo`. ✨

---

## 📋 Tasks Overview

| Task | Description |
|------|-------------|
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/0-list_databases" target="_blank">`0-list_databases`</a> | 📜 List all databases in MongoDB |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/1-use_or_create_database" target="_blank">`1-use_or_create_database`</a> | ➕ Create or use a specific database |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/2-insert" target="_blank">`2-insert`</a> | ✍️ Insert a document into a collection |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/3-all" target="_blank">`3-all`</a> | 🔍 List all documents in a collection |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/4-match" target="_blank">`4-match`</a> | 🎯 Find documents matching a specific condition |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/5-count" target="_blank">`5-count`</a> | 🔢 Count the number of documents in a collection |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/6-update" target="_blank">`6-update`</a> | ✏️ Update a document by adding a new attribute |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/7-delete" target="_blank">`7-delete`</a> | 🗑️ Delete documents matching a condition |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/8-all.py" target="_blank">`8-all.py`</a> | 🐍 List all documents using Python |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/9-insert_school.py" target="_blank">`9-insert_school.py`</a> | 🐍 Insert a document using Python |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/10-update_topics.py" target="_blank">`10-update_topics.py`</a> | 🐍 Update a document's topics using Python |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/11-schools_by_topic.py" target="_blank">`11-schools_by_topic.py`</a> | 🐍 Find schools based on a specific topic |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/NoSQL/12-log_stats.py" target="_blank">`12-log_stats.py`</a> | 🐍 Analyze and display stats from Nginx logs |

## 🎯 Concepts Covered

- ✅ **NoSQL Fundamentals**: SQL vs. NoSQL, ACID properties.
- ✅ **Document Storage**: Understanding document-oriented databases.
- ✅ **CRUD Operations**: `Insert`, `Update`, `Delete`, `Query`.
- ✅ **MongoDB Shell**: Scripting basic to advanced database operations.
- ✅ **PyMongo**: Integrating MongoDB with Python applications.
- ✅ **Aggregation Framework**: Performing complex data analysis.

## 🎓 Learning Objectives

> 💡 By the end of this project, you should be able to:

- 🗣️ Explain what NoSQL is and its benefits.
- 🔄 Differentiate between SQL and NoSQL databases.
- ✍️ Perform CRUD operations (Create, Read, Update, Delete) in MongoDB.
- 🐍 Use the `mongo` shell and `PyMongo` to interact with a database.
- 📊 Understand and use the aggregation framework for data analysis.

## ⚙️ Requirements

### MongoDB Command Files
-   🐧 Ubuntu 20.04 LTS
-   💾 MongoDB 4.4
-   ✍️ All files must start with a comment `// my comment` and end with a new line.

### Python Scripts
-   🐧 Ubuntu 20.04 LTS
-   🐍 Python 3.9
-   📦 PyMongo 4.8.0
-   🚀 All files must be executable with `#!/usr/bin/env python3`.
-   📏 Code must follow `pycodestyle` (v2.5.*).
-   📚 All modules and functions must be documented and type-annotated.

---

## 🛠️ Installation (MongoDB 4.4 on Ubuntu 22.04)

#### 1. Install `libssl1.1` Dependency
```bash
echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list
sudo apt-get update
sudo apt-get install -y libssl1.1
sudo rm /etc/apt/sources.list.d/focal-security.list
sudo apt-get update
```

#### 2. Add MongoDB Repository
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
```

#### 3. Install MongoDB Packages
```bash
sudo apt-get install -y mongodb-org
```

#### 4. Prepare Directories and Start MongoDB
```bash
sudo mkdir -p /var/lib/mongodb /var/log/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb /var/log/mongodb
sudo -u mongodb /usr/bin/mongod --config /etc/mongod.conf &
```

#### 5. Verification
Check the version to confirm the installation:
```bash
mongod --version
```

---

**Happy Coding! 🎊**
