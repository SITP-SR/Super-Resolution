#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from flask import jsonify, request
from flask import session
from database_process.initialize import initialize
from database_process.sign_in_up import sign_in, sign_up
from database_process.save_get_image_url import save_image, get_all_image_urls
from qiniuyun.file_transfer import upload_img, download_img
from improve_image import ImgSuperReso
from qiniu import Auth


app = Flask(__name__)


@app.route('/index')
def index():
    return app.send_static_file('index.html')


@app.route('/login')
def login():
    return app.send_static_file('login.html')


@app.route('/gallery')
def gallery():
    return app.send_static_file('gallery.html')


@app.route('/signup', methods=['POST'])
def sign_up_route():
    user_name = request.form['user_name']
    password = request.form['password']
    status = sign_up(user_name, password)
    return jsonify(valid=status)


@app.route('/signin', methods=['POST'])
def sign_in_route():
    user_name = request.form['user_name']
    password = request.form['password']
    status = sign_in(user_name, password)
    if status:
        session['user_name'] = user_name
    return jsonify(valid=status)


@app.route('/improveImage', methods=['POST'])
def improve_image_route():
    # user_name = session['user_name']
    # download image
    img_url = request.form['img_url']
    img_path = download_img(img_url, img_prefix='./temp/')

    # process image
    imgSuperReso = ImgSuperReso()
    img_name = img_path.split('/')[-1]
    temp = img_name.split('.')
    new_img_name = ''.join(temp[:-1]) + '-new.' + temp[-1]
    new_img_path = './temp/' + new_img_name
    imgSuperReso.processImg(img_path, new_img_path)

    # upload processed image
    new_url = upload_img(new_img_path)

    return new_url


@app.route('/getAllImage', methods=['POST'])
def get_all_image_route():
    user_name = session['user_name']
    # return get_all_image_urls(user_name)
    result = get_all_image_urls(user_name)
    print(result)
    return jsonify({'url_list': result})


@app.route('/upload_token', methods=['POST'])
def upload_Token():
    access_key = "UP4lyUo3aBJPr2YBIv7x-BmV83mTd6hczJS0bbkl"
    secret_key = "W7MacbJiXJPsSXn-H12aqN-WsZEokxBAW8ZaXDDD"
    q = Auth(access_key, secret_key)
    token= q.upload_token('sitp')
    return token


if __name__ == '__main__':
    initialize()
    app.secret_key = "super secret key"
    app.run()
