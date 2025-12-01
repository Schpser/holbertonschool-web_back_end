#!/usr/bin/env python3
"""Module to find schools by topic"""

def schools_by_topic(mongo_collection, topic):
    """
    Finds schools that have a specific topic
    
    Args:
        mongo_collection: pymongo collection object
        topic (str): Topic to search for
    
    Returns:
        List of schools matching the topic
    """
    return list(mongo_collection.find({"topics": topic}))