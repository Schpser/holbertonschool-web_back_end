#!/usr/bin/env python3
"""Module for creating key-value tuples with squared values."""


from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns a tuple with a string and the square of a number."""
    return (k, v * v)
