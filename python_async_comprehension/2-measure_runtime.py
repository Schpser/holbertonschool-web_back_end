#!/usr/bin/env python3
"""Module for measuring runtime"""


import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Measure the total runtime of executing 4 parallel functions"""

    start_time = time.perf_counter()

    tasks = [async_comprehension() for _ in range(4)]
    await asyncio.gather(*tasks)

    return time.perf_counter() - start_time
