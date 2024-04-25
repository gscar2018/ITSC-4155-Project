import tensorflow as tf
import cv2
import numpy as np

from PIL import Image

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

    img = img.astype(np.float32)
    return img

import sys
# load the custom model
model = tf.saved_model.load("new-model-trained")
image = Image.open(sys.argv[1])
if image.mode != "RGB":
    image = image.convert("RGB")
image = preprocess_image(image)

probs = model([image], training=False)
probs = probs.numpy()

identified_tags = []

with open('./new-model/selected_tags', 'r') as f:
    selected_tags = f.read().splitlines()
    for i, p in enumerate(probs[0]):
        print(f"{i} {selected_tags[i]}: {p}")
        if (p > 0.5):
            identified_tags.append(selected_tags[i])

print(identified_tags)