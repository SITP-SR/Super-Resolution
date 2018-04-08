#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
mydb = client.sitp


def initialize():
    mydb.users.remove()
    users = [{'user_name': 'lyc', 'password': '123', 'img_urls': ['http://p6jpx88sq.bkt.clouddn.com/flowers.bmp']},
            {'user_name': 'xdw', 'password': '123', 'img_urls': ['http://p6jpx88sq.bkt.clouddn.com/flowers.bmp']}]
    mydb.users.insert(users)


if __name__ == '__main__':
    initialize()
