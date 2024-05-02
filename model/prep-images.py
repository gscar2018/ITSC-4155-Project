import os

from PIL import Image
import numpy as np
import cv2

if 'data-prepped' not in os.listdir():
    os.makedirs('data-prepped')

# borrowed from the other script
def preprocess_image(img):
    img = np.array(img)
    img = img[:, :, ::-1]  # RGB->BGR

    # pad to square
    size = max(img.shape[0:2])
    pad_x = size - img.shape[1]
    pad_y = size - img.shape[0]
    pad_l = pad_x // 2
    pad_t = pad_y // 2
    img = np.pad(img, ((pad_t, pad_y - pad_t), (pad_l, pad_x - pad_l), (0, 0)), mode="constant", constant_values=255)

    IMAGE_SIZE = 448
    interp = cv2.INTER_AREA if size > IMAGE_SIZE else cv2.INTER_LANCZOS4
    img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE), interpolation=interp)

    # img = img.astype(np.float32)
    return img


images = []
tags = []

for file_name in os.listdir('data'):
    if file_name.endswith('.jpg') or file_name.endswith('.png') or file_name.endswith('.jpeg'):
        image = Image.open(f'data/{file_name}')
        if image.mode != "RGB":
            image = image.convert("RGB")
        image = preprocess_image(image)
        # https://stackoverflow.com/questions/42096141/converting-a-numpy-array-to-a-pil-image
        Image.fromarray(image.astype('uint8'), 'RGB').save(f'data-prepped/{file_name}')
