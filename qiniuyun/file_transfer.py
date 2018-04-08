from qiniu import Auth, put_file
import requests
import time


def upload_img(img_path):
    img_name = img_path.split('/')[-1]

    access_key = "UP4lyUo3aBJPr2YBIv7x-BmV83mTd6hczJS0bbkl"
    secret_key = "W7MacbJiXJPsSXn-H12aqN-WsZEokxBAW8ZaXDDD"
    q = Auth(access_key, secret_key)
    # print(q.upload_token('sitp'))

    bucket_name = ('sitp')
    key = img_name
    token = q.upload_token(bucket_name, key, 3600)
    localfile = img_path

    ret, info = put_file(token, key, localfile)
    return 'http://p6jpx88sq.bkt.clouddn.com/' + key


def download_img(img_url, img_prefix='../temp/'):
    img = requests.get(img_url)
    if img.status_code == 200:
        img_name = generate_timestamp() + img_url.split('/')[-1]
        img_path = img_prefix + img_name
        with open(img_path, 'wb') as f:
            f.write(img.content)
    return img_path


def generate_timestamp():
    TimeTuple = time.localtime(time.time())
    fmt = '%Y-%m-%d %a %H:%M:%S'
    timestamp = time.strftime(fmt, TimeTuple)
    timestamp = timestamp.replace(' ', '-')
    timestamp = timestamp.replace(':', '-')
    return timestamp + '-'


if __name__ == '__main__':
    # url = upload_img('flowers.bmp')
    img_path = download_img('http://p6jpx88sq.bkt.clouddn.com/flowers.bmp')
    upload_img(img_path)
