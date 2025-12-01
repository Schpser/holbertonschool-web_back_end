#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

from ast import Dict
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Handle get_hyper method"""
        indexed_data = self.indexed_dataset()
        dataset_len = len(self.dataset())

        if index is None:
            index = 0

        assert isinstance(index, int) and index >= 0

        if dataset_len > 0:
            assert index < dataset_len

        sorted_keys = sorted(indexed_data.keys())

        start_key_index = 0
        try:
            start_key_index = next(
                i for i, k in enumerate(sorted_keys) if k >= index
            )
        except StopIteration:
            return {
                'index': index,
                'next_index': None,
                'page_size': 0,
                'data': []
            }

        page_keys = sorted_keys[start_key_index:start_key_index + page_size]

        data = [indexed_data[k] for k in page_keys]

        next_index = None
        if start_key_index + page_size < len(sorted_keys):
            next_index = sorted_keys[start_key_index + page_size]

        return {
            'index': index,
            'data': data,
            'page_size': len(data),
            'next_index': next_index
        }
