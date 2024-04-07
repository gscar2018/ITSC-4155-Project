import os

# import cv2
import tensorflow as tf
from PIL import Image
import numpy as np

from tensorflow.keras.models import Model, load_model


# # borrowed from the other script
# def preprocess_image(image):
#     image = np.array(image)
#     image = image[:, :, ::-1]  # RGB->BGR
#
#     # pad to square
#     size = max(image.shape[0:2])
#     pad_x = size - image.shape[1]
#     pad_y = size - image.shape[0]
#     pad_l = pad_x // 2
#     pad_t = pad_y // 2
#     image = np.pad(image, ((pad_t, pad_y - pad_t), (pad_l, pad_x - pad_l), (0, 0)), mode="constant", constant_values=255)
#
#     IMAGE_SIZE = 448
#     interp = cv2.INTER_AREA if size > IMAGE_SIZE else cv2.INTER_LANCZOS4
#     image = cv2.resize(image, (IMAGE_SIZE, IMAGE_SIZE), interpolation=interp)
#
#     image = image.astype(np.float32)
#     return image



# load the custom model
model = load_model("new-model")

images = []
tags = []
for file_name in os.listdir('data-prepped'):
    if file_name.endswith('.jpg') or file_name.endswith('.png'):
        image = Image.open(f'data-prepped/{file_name}')
        if image.mode != "RGB":
            image = image.convert("RGB")

        images.append(np.array(image).astype(np.float32))

        tags_path = 'data-prepped/' + file_name.split('.')[0] + '.txt'
        with open(tags_path, 'r') as tag_file:
            tag_string = tag_file.read()
            tag_arr = [int(x) for x in tag_string.split(',')]
            tags.append(tag_arr)

images = np.array(images)
tags = np.array(tags)

training_images = images[:int(len(images) * 0.8)]
training_tags = tags[:int(len(tags) * 0.8)]
validation_images = images[int(len(images) * 0.8):]
validation_tags = tags[int(len(tags) * 0.8):]

def prepare_dataset(images, labels, batch_size):
    dataset = tf.data.Dataset.from_tensor_slices((images, labels))
    dataset = dataset.shuffle(len(images)).batch(batch_size)
    return dataset


dataset = prepare_dataset(training_images, training_tags, 8)
validation_set = prepare_dataset(validation_images, validation_tags, 8)

# freeze convolutional layers
for layer in model.layers[:-2]:
    layer.trainable = False

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

model.fit(dataset, epochs=30, validation_data=validation_set)

model.save('./new-model-trained', save_format='tf')
