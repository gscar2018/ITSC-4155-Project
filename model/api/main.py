from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io
import numpy as np
import cv2
import tensorflow as tf

app = FastAPI()
# FUNCTIONS
def preprocess_image(img):
    img = np.array(img)
    #converts from BGR to RGB
    img = img[:, :, ::-1]

    # padding to square
    size = max(img.shape[0:2])
    pad_x = size - img.shape[1]
    pad_y = size - img.shape[0]
    pad_l = pad_x // 2
    pad_t = pad_y // 2
    img = np.pad(img, ((pad_t, pad_y - pad_t), (pad_l, pad_x - pad_l), (0, 0)), mode="constant", constant_values=255)

    IMG_SIZE = 448
    interp = cv2.INTER_AREA if size > IMG_SIZE else cv2.INTER_LANCZOS4
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE), interpolation=interp)

    img = img.astype(np.float32)
    return img

#load in model
model = tf.saved_model.load("../new-model-trained/saved_model.pb")

# ROUTES
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = await file.read()
    img = Image.open(io.BytesIO(img))

    if img.mode != "RGB":
        img = img.convert("RGB")

    img = preprocess_image(img)
    # model inference
    probs = model([img], training=False)
    probs = probs.numpy()

    identified_tags = []

    #load in tags
    with open('../model-tags/selected_tags', 'r') as f:
        selected_tags = f.read().splitlines()
        for i, p in enumerate(probs[0]):
            print(f"{i} {selected_tags[i]}: {p}")
            if (p > 0.5):
                identified_tags.append(selected_tags[i])


    return {"tags": identified_tags}
