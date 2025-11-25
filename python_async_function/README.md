# 🐍 Python - Async

Welcome to the **Python - Async** project! 🎉 This repository focuses on asynchronous programming in Python using `asyncio`. You will learn the fundamentals of `async` and `await` syntax, how to run coroutines concurrently, and how to manage tasks. ✨

---

## 📋 Tasks Overview

| Task | Description |
|------|-------------|
| `0-basic_async_syntax` | ⏰ Basic async coroutine with random delays |
| `1-concurrent_coroutines` | 🚀 Execute multiple coroutines concurrently |
| `2-measure_runtime` | ⏱️ Measure execution time of async functions |
| `3-tasks` | 📦 Create asyncio Tasks |
| `4-tasks` | 🔄 Altered version using Tasks |

## 🎯 Concepts Covered

- ✅ `async` and `await` syntax
- ✅ Running async programs with `asyncio`
- ✅ Concurrent coroutine execution
- ✅ Creating and managing `asyncio` tasks
- ✅ Using the `random` module for delays

## 🎓 Learning Objectives

> 💡 By the end of this project, you should be able to:

- 🗣️ Explain `async` and `await` syntax
- 🏃 Execute an async program with `asyncio`
- 🔀 Run concurrent coroutines
- 📦 Create `asyncio` tasks
- 🎲 Use the `random` module for creating delays

## ⚙️ Requirements

- 🐧 Python 3.9 on Ubuntu 20.04 LTS
- 📏 pycodestyle (v2.5.*) compliance
- 🚀 Executable files with shebang `#!/usr/bin/env python3`
- 📚 Documentation and type annotations for all modules, functions, and coroutines

---

## 📝 Detailed Tasks

### 0. The basics of async ⏰

Write an asynchronous coroutine `wait_random` that takes an integer `max_delay` (default 10), waits for a random delay between 0 and `max_delay` seconds, and returns the delay.

**File:** `0-basic_async_syntax.py`

**Example:**
```python
#!/usr/bin/env python3

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random

print(asyncio.run(wait_random()))
print(asyncio.run(wait_random(5)))
print(asyncio.run(wait_random(15)))
```

**Output:**
```
9.034261504534394
1.6216525464615306
10.634589756751769
```

---

### 1. Let's execute multiple coroutines at the same time with async 🚀

Write an async routine `wait_n` that takes two integer arguments, `n` and `max_delay`. It should spawn `wait_random` `n` times with the specified `max_delay` and return the list of delays in ascending order.

**File:** `1-concurrent_coroutines.py`

**Example:**
```python
#!/usr/bin/env python3
'''
Test file for printing the correct output of the wait_n coroutine
'''
import asyncio

wait_n = __import__('1-concurrent_coroutines').wait_n

print(asyncio.run(wait_n(5, 5)))
print(asyncio.run(wait_n(10, 7)))
print(asyncio.run(wait_n(10, 0)))
```

**Output:**
```
[0.9693881173832269, 1.0264573845731002, 1.7992690129519855, 3.641373003434587, 4.500011569340617]
[0.07256214141415429, 1.518551245602588, 3.355762808432721, 3.7032593997182923, 3.7796178143655546, 4.744537840582318, 5.50781365463315, 5.758942587637626, 6.109707751654879, 6.831351588271327]
[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
```

---

### 2. Measure the runtime ⏱️

Create a function `measure_time` that measures the total execution time for `wait_n(n, max_delay)` and returns `total_time / n`.

**File:** `2-measure_runtime.py`

**Example:**
```python
#!/usr/bin/env python3

measure_time = __import__('2-measure_runtime').measure_time

n = 5
max_delay = 9

print(measure_time(n, max_delay))
```

**Output:**
```
1.759705400466919
```

---

### 3. Tasks 📦

Write a function `task_wait_random` that takes an integer `max_delay` and returns an `asyncio.Task`.

**File:** `3-tasks.py`

**Example:**
```python
#!/usr/bin/env python3

import asyncio

task_wait_random = __import__('3-tasks').task_wait_random


async def test(max_delay: int) -> float:
    task = task_wait_random(max_delay)
    await task
    print(task.__class__)

asyncio.run(test(5))
```

**Output:**
```
<class '_asyncio.Task'>
```

---

### 4. Tasks, altered 🔄

Alter the code from `wait_n` into a new function `task_wait_n`, using `task_wait_random` instead of `wait_random`.

**File:** `4-tasks.py`

**Example:**
```python
#!/usr/bin/env python3

import asyncio

task_wait_n = __import__('4-tasks').task_wait_n

n = 5
max_delay = 6
print(asyncio.run(task_wait_n(n, max_delay)))
```

**Output:**
```
[0.2261658205652346, 1.1942770588220557, 1.8410422186086628, 2.1457353803430523, 4.002505454641153]
```

---

**Happy Coding! 🎊**
