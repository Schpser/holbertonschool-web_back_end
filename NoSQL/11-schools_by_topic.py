#!/usr/bin/env python3
""" 11-schools_by_topic.py """


def schools_by_topic(mongo_collection, topic):
    """List of schools matching the topic"""

    query = {"topics": topic}

    schools = mongo_collection.find(query)

    return list(schools)
