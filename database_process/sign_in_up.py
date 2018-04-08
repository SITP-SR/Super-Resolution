#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
mydb = client.sitp


def sign_in(user_name, password):
    if mydb.users.find({'user_name': user_name, 'password': password}).count() == 0:
        return False
    else:
        return True


def sign_up(user_name, password):
    if mydb.users.find({'user_name': user_name}).count() == 0:
        mydb.users.insert({'user_name': user_name, 'password': password, 'img_urls': []})
        return True
    else:
        return False


if __name__ == '__main__':
    # print(sign_in('lyc', '123'))
    print(sign_in('lyc', '1123'))
    print(sign_up('lyc', '1123'))
    # print(sign_in('lyc', '1123'))

