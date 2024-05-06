# supposed to improve performance because im running out of memory
# from tensorflow.keras.mixed_precision import experimental as mixed_precision
#
# policy = mixed_precision.Policy('mixed_float16')
# mixed_precision.set_policy(policy)

import os
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from sklearn.model_selection import train_test_split


# utility to load training data when needed instead of all at once (also for memory)
def load_filenames(data_dir):
    file_names = [fn for fn in os.listdir(data_dir) if fn.endswith(('.jpg', '.png'))]
    return file_names

# Load all filenames and split them
data_dir = 'data-prepped'
all_files = load_filenames(data_dir)
train_files, val_files = train_test_split(all_files, test_size=0.2, random_state=42)

def data_generator(file_names, data_dir, batch_size=8):
    n = len(file_names)
    while True:
        np.random.shuffle(file_names)  # Shuffle every epoch
        for i in range(0, n, batch_size):
            batch_files = file_names[i:i + batch_size]
            images, labels = [], []
            for file in batch_files:
                img_path = os.path.join(data_dir, file)
                image = Image.open(img_path)
                if image.mode != "RGB":
                    image = image.convert("RGB")
                label_path = os.path.splitext(img_path)[0] + '.txt'
                with open(label_path, 'r') as f:
                    labels.append([int(x) for x in f.read().strip().split(',')])
                images.append(np.array(image).astype(np.float32))

            yield np.array(images), np.array(labels)


from tensorflow.keras.models import Model, load_model
# load the custom model
model = load_model("new-model")

batch_size = 32
train_generator = data_generator(train_files, data_dir, batch_size=batch_size)
validation_generator = data_generator(val_files, data_dir, batch_size=batch_size)

num_train_samples = len(train_files)
num_val_samples = len(val_files)

# Freeze layers except for the last two
for layer in model.layers[:-2]:
    layer.trainable = False

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

model.fit(train_generator,
          steps_per_epoch=num_train_samples // batch_size,
          validation_steps=num_val_samples // batch_size,
          epochs=30,
          validation_data=validation_generator)

model.save('./new-model-trained', save_format='tf')
