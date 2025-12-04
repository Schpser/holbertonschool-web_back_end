#!/usr/bin/env python3
"""Module to insert a document in MongoDB"""

def insert_school(mongo_collection, **kwargs):
    """Return new doc's ID """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
