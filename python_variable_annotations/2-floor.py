#!/usr/bin/env python3
"""Module containing the floor function for a float."""


def floor(n: float) -> int:
    """Returns the floor of a floating-point number."""
    return int(n) if n >= 0 else int(n) - 1
