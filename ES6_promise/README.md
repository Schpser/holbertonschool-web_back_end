# 🤝 ES6 Promises

Welcome to the **ES6 Promises** project! 🎉 This repository is designed to teach you about asynchronous programming in JavaScript using Promises and the async/await syntax. You will learn how to handle asynchronous operations, manage errors, and orchestrate multiple concurrent tasks efficiently. ✨

---

## 📋 Tasks Overview

| Task | Description |
|------|-------------|
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/0-promise.js" target="_blank">`0-promise.js`</a> | 🏗️ Return a Promise using the prototype function |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/1-promise.js" target="_blank">`1-promise.js`</a> | ✅❌ Return a resolved or rejected Promise based on a boolean |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/2-then.js" target="_blank">`2-then.js`</a> | 🔗 Handle Promise resolution and rejection with `.then()` |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/3-all.js" target="_blank">`3-all.js`</a> | 🎯 Collectively resolve multiple Promises with `Promise.all()` |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/4-user-promise.js" target="_blank">`4-user-promise.js`</a> | 👤 Return a resolved Promise with user object |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/5-photo-reject.js" target="_blank">`5-photo-reject.js`</a> | 📸 Return a rejected Promise with an Error object |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/6-final-user.js" target="_blank">`6-final-user.js`</a> | 📊 Handle multiple Promises and return their status |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/7-load_balancer.js" target="_blank">`7-load_balancer.js`</a> | 🏃 Return the value of the Promise that resolves first |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/8-try.js" target="_blank">`8-try.js`</a> | 🛡️ Throw an error when denominator is 0 |
| <a href="https://github.com/Schpser/holbertonschool-web_back_end/blob/main/ES6_promise/9-try.js" target="_blank">`9-try.js`</a> | 📝 Create a guardrail function that appends messages to a queue |

---

## 🎯 Concepts Covered

- ✅ **Promises**: What they are, how to create and consume them
- ✅ **Promise States**: `Pending` ⏳, `Fulfilled` ✅, `Rejected` ❌, `Settled` 🏁
- ✅ **Promise Methods**: `.then()`, `.catch()`, `.finally()`
- ✅ **Concurrency**: `Promise.all()`, `Promise.race()`, `Promise.any()`, `Promise.allSettled()`
- ✅ **Async/Await**: Modern syntax for asynchronous code
- ✅ **Error Handling**: `try...catch` with async functions

---

## 🎓 Learning Objectives

> 💡 By the end of this project, you should be able to:

- 🗣️ Explain what Promises are and how they work
- 🔄 Understand Promise states and lifecycle
- 🏗️ Create and consume Promises using `.then()`, `.catch()`, and `.finally()`
- 🎯 Use `Promise.all()`, `Promise.race()`, and other concurrency methods
- ⚡ Write asynchronous code with `async`/`await` syntax
- 🛡️ Handle errors properly in asynchronous operations
- 📊 Orchestrate multiple asynchronous tasks efficiently

---

## 📚 Key Concepts

### 🤝 Promise States

| State | Emoji | Description |
|-------|-------|-------------|
| **Pending** | ⏳ | Initial state, neither fulfilled nor rejected |
| **Fulfilled** | ✅ | The operation completed successfully |
| **Rejected** | ❌ | The operation failed |
| **Settled** | 🏁 | The promise is either fulfilled or rejected (not pending) |

### 🔗 Promise Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| `.then()` | Handle fulfillment and rejection | Chain asynchronous operations |
| `.catch()` | Handle rejection | Centralized error handling |
| `.finally()` | Execute cleanup code | Always runs regardless of outcome |

### 🎯 Concurrency Methods

| Method | Emoji | Behavior |
|--------|-------|----------|
| `Promise.all()` | 🎯 | Resolves when **all** promises resolve, rejects if **any** rejects |
| `Promise.race()` | 🏃 | Settles with the **first** promise that settles |
| `Promise.any()` | 🎲 | Resolves when **any** promise resolves, rejects if **all** reject |
| `Promise.allSettled()` | 📊 | Resolves when **all** are settled with their status |

---

## ⚙️ Requirements

### General
- 🐧 Ubuntu 20.04 LTS
- 💾 Node.js 20.x.x
- 📦 npm 9.x.x
- ✍️ All files should end with a new line
- ✅ Code will be tested with Jest and analyzed with ESLint
- 🚀 All functions must be exported

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
npm -v   # Should display 9.x.x
```

#### 3. Install Dev Dependencies
In your project directory, run:
```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env eslint
```

#### 4. Configure Project
Create `package.json`, `babel.config.js`, and `.eslintrc.js` in your project root. Then run:
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
npm test 0-promise.test.js
```

Run tests in watch mode:
```bash
npm test -- --watch
```

---

## 💡 Usage Examples

### Creating a Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
  if (/* operation successful */) {
    resolve("Success! ✅");
  } else {
    reject(new Error("Failed ❌"));
  }
});
```

### Consuming a Promise
```javascript
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Cleanup 🧹"));
```

### Using async/await
```javascript
async function fetchData() {
  try {
    const result = await myAsyncFunction();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Handling Multiple Promises
```javascript
// Wait for all to complete
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]);

// Race to the first result
const fastest = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2()
]);
```

---

## 🎨 Code Style

This project follows the Airbnb JavaScript Style Guide and uses ESLint for code quality checks.

Run ESLint:
```bash
npx eslint .
```

Fix auto-fixable issues:
```bash
npx eslint . --fix
```

---

## 📖 Resources

- [MDN - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [JavaScript.info - Promises](https://javascript.info/promise-basics)
- [Event Loop Visualizer](http://latentflip.com/loupe/)

---

**Happy Coding! 🎊**
