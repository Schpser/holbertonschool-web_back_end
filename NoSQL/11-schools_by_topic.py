#!/usr/bin/env python3
"""Module that provides stats about Nginx logs in MongoDB"""


from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')
    
    # Access logs database and nginx collection
    collection = client.logs
    collection = db.nginx
    
    # Total number of documents
    total_logs = collection.count_documents({})
    print("{} logs".format(total_logs))
    
    # Methods count
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))
    
    # Status check count
    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })
    print("{} status check".format(status_check))
