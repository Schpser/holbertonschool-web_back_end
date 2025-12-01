#!/usr/bin/env python3
"""Module for listing docs"""


def list_all(mongo_collection):
    """List db, empty list if no doc"""
    documents = list(mongo_collection.find())
    return documents if documents else []
