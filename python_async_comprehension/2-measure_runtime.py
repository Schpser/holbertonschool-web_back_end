#!/usr/bin/env python3
"""Module for measuring runtime"""


import asyncio
import time
from typing import float

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Measure the total runtime of executing 4 async_comprehension"""

    start_time = time.time()

    await asyncio.gather(
        async_comprehension(),
        async_comprehension(),
        async_comprehension(),
        async_comprehension()
    )

    end_time = time.time()
    return end_time - start_time
