#!/usr/bin/env python3
"""Module for the sum of a list."""


def sum_list(input_list: list[float]) -> float:
    """Returns the sum of a list of floats."""
    total = 0.0
    for num in input_list:
        total += num
    return total
