#!/usr/bin/env python3

def index_range(page: int, page_size: int) -> tuple:
    """Calculate index range for pagination"""
    
    if page < 1 or page_size < 1:
        raise ValueError("page et page_size must be >= 1")

    start_index = (page - 1) * page_size
    end_index = page * page_size

    return (start_index, end_index)
