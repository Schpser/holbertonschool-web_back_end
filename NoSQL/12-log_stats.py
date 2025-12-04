#!/usr/bin/env python3
"""Module that provides stats about Nginx logs in MongoDB"""


from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    total_logs = collection.count_documents({})

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    counts = []
    for method in methods:
        count = collection.count_documents({"method": method})
        counts.append(count)

    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })

    print("{} logs".format(total_logs))
    print("Methods:")
    for i, method in enumerate(methods):
        print("    method {}: {}".format(method, counts[i]))
    print("{} status check".format(status_check))
