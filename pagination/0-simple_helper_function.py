#!/usr/bin/env python3

def index_range(page: int, page_size: int) -> tuple:
    """Calculate index range for pagination"""

    start_index = (page - 1) * page_size
    end_index = page * page_size

    return (start_index, end_index)
