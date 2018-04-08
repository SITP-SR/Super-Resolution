from flask import Flask
from flask import jsonify
from flask import request
import os

app = Flask(__name__)


@app.route('/index')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()
