#!/usr/bin/env python3
"""Module for concurrent coroutines - Execute multiple routines"""

import asyncio
from typing import List


wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn wait_random n times with specified max_delay."""
    delays_asc = []

    for _ in range(n):
        delay = await wait_random(max_delay)

        i = 0
        while i < len(delays_asc) and delay > delays_asc[i]:
            i += 1
        delays_asc.insert(i, delay)

    return delays_asc
