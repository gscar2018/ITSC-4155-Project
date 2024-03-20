import os

import cv2
import tensorflow as tf
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import numpy as np

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Dense, Input, Activation

# from huggingface_hub import from_pretrained_keras

# borrowed from the other script
def preprocess_image(image):
    image = np.array(image)
    image = image[:, :, ::-1]  # RGB->BGR

    # pad to square
    size = max(image.shape[0:2])
    pad_x = size - image.shape[1]
    pad_y = size - image.shape[0]
    pad_l = pad_x // 2
    pad_t = pad_y // 2
    image = np.pad(image, ((pad_t, pad_y - pad_t), (pad_l, pad_x - pad_l), (0, 0)), mode="constant", constant_values=255)

    IMAGE_SIZE = 448
    interp = cv2.INTER_AREA if size > IMAGE_SIZE else cv2.INTER_LANCZOS4
    image = cv2.resize(image, (IMAGE_SIZE, IMAGE_SIZE), interpolation=interp)

    image = image.astype(np.float32)
    return image



# load base checkpoint from huggingface
model = load_model("wd14_tagger_model")

# order of operations for model architecture

# 1. create a new dense layer - 1 neuron per tag we want
# 2. copy weights from original dense layer for tags we care about, discard the rest
# 3. create new model with original early layers, swapping in the new dense layer
# 2. replace activation layer
# 3. compile

intermediate_model = Model(inputs=model.input, outputs=model.layers[-3].output)

# indices for tags we want to take from original model
# we might do this outside the script eventually since it will probably get quite large
# for what it's worth, the first 4 neurons are rating tags which is probably useful
keep_tag_indices = [0, 1, 2, 3]
original_weights, original_biases = model.layers[-2].get_weights()

new_neurons = 2
# need output size from previous layer to pad weights for new neurons
weight_size = intermediate_model.output.shape[1]

initializer = tf.keras.initializers.GlorotUniform()
new_weights = initializer(shape=(weight_size, new_neurons))
new_biases = np.zeros(shape=(new_neurons,))

keep_weights = original_weights[:, keep_tag_indices]
padded_weights = np.concatenate([keep_weights, new_weights], axis=1)
keep_biases = original_biases[keep_tag_indices]
padded_biases = np.concatenate([keep_biases, new_biases], axis=0)

# should match original layer other than length
new_dense_layer = Dense(len(keep_tag_indices) + new_neurons, activation='linear', name='new_output_layer')
new_output = new_dense_layer(intermediate_model.output)
activation_layer = Activation('sigmoid', name='output_activation')
final_output = activation_layer(new_output)

final_model = Model(inputs=intermediate_model.input, outputs=final_output)

# set original weights
final_model.layers[-2].set_weights([padded_weights, padded_biases])

final_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])




# test training step
images = []
tags = []

for file_name in os.listdir('data'):
    if file_name.endswith('.jpg') or file_name.endswith('.png'):
        image = Image.open(f'data/{file_name}')
        if image.mode != "RGB":
            image = image.convert("RGB")
        image = preprocess_image(image)
        images.append(image)

        tags_path = 'data/' + file_name.split('.')[0] + '.txt'
        with open(tags_path, 'r') as tag_file:
            tag_string = tag_file.read()
            tag_arr = [int(x) for x in tag_string.split(',')]
            tags.append(tag_arr)

images = np.array(images)
tags = np.array(tags)


def prepare_dataset(images, labels, batch_size):
    dataset = tf.data.Dataset.from_tensor_slices((images, labels))
    dataset = dataset.shuffle(len(images)).batch(batch_size)
    return dataset


dataset = prepare_dataset(images, tags, 8)

final_model.fit(dataset, epochs=3)
