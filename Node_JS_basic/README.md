# 🚀 Node.js Basics

Welcome to the **Node.js Basics** project! 🎉 This repository is designed to teach you fundamental backend development concepts using Node.js. You will learn how to work with the file system, create HTTP servers, use Express.js, and handle asynchronous operations. ✨

---

## 📋 Tasks Overview

| Task | Description |
|------|-------------|
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/0-console.js" target="_blank">`0-console.js`</a> | 💬 Display a message in the console |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/1-stdin.js" target="_blank">`1-stdin.js`</a> | ⌨️ Read and process user input from stdin |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/2-read_file.js" target="_blank">`2-read_file.js`</a> | 📄 Read a file synchronously |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/3-read_file_async.js" target="_blank">`3-read_file_async.js`</a> | ⚡ Read a file asynchronously with Promises |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/4-http.js" target="_blank">`4-http.js`</a> | 🌐 Create a basic HTTP server |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/5-http.js" target="_blank">`5-http.js`</a> | 📊 HTTP server with student data and routing |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/6-http_express.js" target="_blank">`6-http_express.js`</a> | ⚡ Create a basic Express server |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/7-http_express.js" target="_blank">`7-http_express.js`</a> | 🎓 Express server with student data and routes |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/Node_JS_basic/full_server" target="_blank">`full_server/`</a> | 🏗️ Complete Express application with MVC architecture |

---

## 🎯 Concepts Covered

- ✅ **Node.js Basics**: Running JavaScript outside the browser
- ✅ **File System**: Reading files synchronously and asynchronously
- ✅ **Process**: Using `process.argv` and `process.env`
- ✅ **HTTP Server**: Creating servers with native `http` module
- ✅ **Express.js**: Building web applications with Express framework
- ✅ **Routing**: Handling different endpoints and HTTP methods
- ✅ **Async Programming**: Promises, async/await, callbacks
- ✅ **MVC Architecture**: Organizing code with controllers and routes

---

## 🎓 Learning Objectives

> 💡 By the end of this project, you should be able to:

- 🗣️ Explain how to run JavaScript using Node.js
- 📦 Use Node.js modules and the file system API
- 🔄 Understand synchronous vs asynchronous file operations
- 🌐 Create HTTP servers with the native `http` module
- ⚡ Build web applications with Express.js
- 🎯 Handle command line arguments with `process.argv`
- 🌍 Access environment variables with `process.env`
- 🏗️ Structure applications with controllers and routes
- 🧪 Write and run tests with Jest
- ✅ Lint code with ESLint

---

## 📚 Key Concepts

### 🌐 HTTP Servers

| Type | Module | Complexity | Use Case |
|------|--------|------------|----------|
| **Native** | `node:http` | Low-level | Learning, simple servers |
| **Express** | `express` | High-level | Production apps, APIs |

### 📂 File Operations

| Method | Type | Blocking | Use Case |
|--------|------|----------|----------|
| `fs.readFileSync()` | Synchronous | ✅ Yes | Simple scripts, initialization |
| `fs.readFile()` | Asynchronous | ❌ No | Web servers, performance-critical |
| `fs.promises.readFile()` | Promise-based | ❌ No | Modern async/await code |

### 🎯 Express Routing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Display welcome message |
| GET | `/students` | Display all students |
| GET | `/students/:major` | Display students by major (CS or SWE) |

---

## ⚙️ Requirements

### General
- 🐧 Ubuntu 20.04 LTS
- 💾 Node.js 20.x.x
- 📦 npm (Node Package Manager)
- ✍️ All files should end with a new line
- ✅ Code will be tested with Jest and analyzed with ESLint
- 🚀 All functions must be exported using `module.exports`

---

## 🛠️ Setup & Installation

#### 1. Install NodeJS 20.x.x
```bash
curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
```

#### 2. Verify Installation
```bash
node -v  # Should display v20.x.x
npm -v   # Should display 9.x.x or higher
```

#### 3. Install Project Dependencies
In your project directory, run:
```bash
npm install
```

---

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run a specific test file:
```bash
npm test 0-console.test.js
```

Run full test suite (tests + lint):
```bash
npm run full-test
```

---

## 🔧 Development

Start server with auto-reload:
```bash
npm run dev
```

Run ESLint:
```bash
npm run lint
```

Fix auto-fixable ESLint issues:
```bash
npm run lint -- --fix
```

---

## 💡 Usage Examples

### Running Scripts

```bash
# Task 0: Console output
node 0-console.js

# Task 1: Standard input
node 1-stdin.js

# Task 2: Synchronous file reading
node 2-read_file.js database.csv

# Task 3: Asynchronous file reading
node 3-read_file_async.js database.csv
```

### Starting HTTP Servers

```bash
# Task 4: Basic HTTP server
node 4-http.js
# Server runs on http://localhost:1245

# Task 5: HTTP server with data
node 5-http.js database.csv
# Access: http://localhost:1245 or http://localhost:1245/students

# Task 6: Basic Express server
node 6-http_express.js
# Server runs on http://localhost:1245

# Task 7: Express server with data
node 7-http_express.js database.csv
# Access: http://localhost:1245 or http://localhost:1245/students
```

### Full Server Application

```bash
# Development mode with nodemon
npm run dev

# Or run directly
node full_server/server.js database.csv
```

---

## 📊 Database Format

The `database.csv` file contains student information:

```csv
firstname,lastname,age,field
Johann,Kerbrou,30,CS
Guillaume,Salou,30,SWE
Arielle,Salou,20,CS
Jonathan,Benou,30,CS
Emmanuel,Turlou,40,CS
Guillaume,Plesssis,35,CS
Joseph,Crisou,34,SWE
Paul,Schneider,60,SWE
Tommy,Schoul,32,SWE
Katie,Shirou,21,CS
```

---

## 🎨 Code Style

This project follows ESLint standards for code quality.

Run ESLint:
```bash
npx eslint .
```

Fix auto-fixable issues:
```bash
npx eslint . --fix
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Port already in use** | Kill process: `lsof -ti:1245 \| xargs kill -9` |
| **Module not found** | Run: `npm install` |
| **ESLint errors** | Run: `npm run lint -- --fix` |
| **Tests failing** | Check Node.js version: `node --version` |

---

## 📖 Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js File System](https://nodejs.org/api/fs.html)
- [Process Object](https://nodejs.org/api/process.html)
- [JavaScript ES6 Features](https://es6-features.org/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

---

**Happy Coding! 🎊**

