#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
mydb = client.sitp


def save_image(user_name, img_url):
    user = mydb.users.find_one({'user_name': user_name})
    if user is None:
        return False
    img_urls = user['img_urls']
    img_urls.append(img_url)
    mydb.users.update({'user_name': user_name}, {'$set': {'img_urls': img_urls}})
    return True


def get_all_image_urls(user_name):
    user = mydb.users.find_one({'user_name': user_name})
    if user is None:
        return []
    return user['img_urls']


if __name__ == '__main__':
    save_image('lyc', 'url2')
    print(get_all_image_urls('lyc'))

