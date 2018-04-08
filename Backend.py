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


app = Flask(__name__)


@app.route('/index')
def index():
    return app.send_static_file('index.html')


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
    imgSuperReso.processImg()

    # upload processed image

    return 'hello'


@app.route('/getAllImage', methods=['POST'])
def get_all_image_route():
    user_name = session['user_name']
    return get_all_image_urls(user_name)


if __name__ == '__main__':
    initialize()
    app.secret_key = "super secret key"
    app.run()
