#!/usr/bin/env python3
""" Provide Nginx stats, stored in MongoDB """
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')

    collection = client.logs.nginx

    total_logs = collection.count_documents({})
    get_count = collection.count_documents({"method": "GET"})
    post_count = collection.count_documents({"method": "POST"})
    put_count = collection.count_documents({"method": "PUT"})
    patch_count = collection.count_documents({"method": "PATCH"})
    delete_count = collection.count_documents({"method": "DELETE"})

    status_count = collection.count_documents(
        {"method": "GET", "path": "/status"}
        )

    print(
        f"{total_logs} logs\n"
        "Methods:\n"
        f"\tmethod GET: {get_count}\n"
        f"\tmethod POST: {post_count}\n"
        f"\tmethod PUT: {put_count}\n"
        f"\tmethod PATCH: {patch_count}\n"
        f"\tmethod DELETE: {delete_count}\n"
        f"{status_count} status check"
    )
