from keras.models import Sequential
from keras.layers import Conv2D, Input, BatchNormalization
from keras.optimizers import SGD, Adam
import numpy
import os
import cv2
import time


def predict_model():
    # lrelu = LeakyReLU(alpha=0.1)
    SRCNN = Sequential()
    SRCNN.add(Conv2D(nb_filter=128, nb_row=9, nb_col=9, init='glorot_uniform',
                     activation='relu', border_mode='valid', bias=True, input_shape=(None, None, 1)))
    SRCNN.add(Conv2D(nb_filter=64, nb_row=3, nb_col=3, init='glorot_uniform',
                     activation='relu', border_mode='same', bias=True))
    # SRCNN.add(BatchNormalization())
    SRCNN.add(Conv2D(nb_filter=1, nb_row=5, nb_col=5, init='glorot_uniform',
                     activation='linear', border_mode='valid', bias=True))
    adam = Adam(lr=0.0003)
    SRCNN.compile(optimizer=adam, loss='mean_squared_error', metrics=['mean_squared_error'])
    return SRCNN


class ImgSuperReso(object):
    def __init__(self, weight_path):
        self.srcnn_model = predict_model()
        self.srcnn_model.load_weights(weight_path)

    def processImg(self, raw_file, processed_file):
        img = cv2.imread(raw_file, cv2.IMREAD_COLOR)
        (filepath, tempfilename) = os.path.split(raw_file);
        (shortname, extension) = os.path.splitext(tempfilename);
        img = cv2.resize(img, None, fx=2, fy=2)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
        Y_img = img[:, :, 0]
        Y = numpy.zeros((1, img.shape[0], img.shape[1], 1), dtype=float)
        Y[0, :, :, 0] = Y_img.astype(float) / 255.
        # t1 = time.time()
        pre = self.srcnn_model.predict(Y, batch_size=1) * 255.
        # t2 = time.time()
        # print(t2 - t1)
        pre[pre[:] > 255] = 255
        pre[pre[:] < 0] = 0
        pre = pre.astype(numpy.uint8)
        img[6: -6, 6: -6, 0] = pre[0, :, :, 0]
        img = cv2.cvtColor(img, cv2.COLOR_YCrCb2BGR)
        cv2.imwrite(processed_file, img)


if __name__ == "__main__":
    t1 = time.time()
    imgSuperReso = ImgSuperReso("model_data/model_weight.h5")
    t2 = time.time()
    imgSuperReso.processImg('temp/flowers.bmp', 'temp/new.bmp')
    t3 = time.time()

    print(t2 - t1)
    print(t3 - t2)
