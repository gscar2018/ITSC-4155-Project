import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import numpy as np

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Input

# Load your pre-existing model
# For demonstration, replace this with the actual model loading code
model = tf.keras.models.load_model('wd14_tagger_model')

# Assuming model's last but one layer is the one before the final Dense layer
base_model_output = model.layers[-2].output

# Add a new low-rank Dense layer before the final Dense layer
new_layer = Dense(128, activation='relu', name='new_dense_layer')(base_model_output)  # Low-rank layer example
final_output = model.layers[-1](new_layer)  # Reconnect the final layer

# Create a new model
modified_model = Model(inputs=model.input, outputs=final_output)

# Freeze all layers except for the newly added low-rank layer
for layer in modified_model.layers[:-2]:  # Freeze all but the last two layers
    layer.trainable = False

# # Compile the modified model
# modified_model.compile(optimizer='adam',
#                        loss='categorical_crossentropy',  # Update loss function as per your task
#                        metrics=['accuracy'])

# Summary to verify structure
# modified_model.summary()

# Parameters
image_size = (448, 448)  # Adjust to your model's expected input size
data_dir = 'data'
batch_size = 32
epochs = 10

# Step 1: Prepare the Data
def load_data_and_labels(data_dir):
    images = []
    labels = []

    for file in os.listdir(data_dir):
        if file.endswith('.jpg') or file.endswith('.png'):
            image_path = os.path.join(data_dir, file)
            label_path = os.path.splitext(image_path)[0] + '.txt'

            # Load and preprocess the image
            image = load_img(image_path, target_size=image_size)
            image = img_to_array(image)
            image /= 255.0

            # Load the tags
            with open(label_path, 'r') as f:
                tags = f.read().splitlines()

            images.append(image)
            labels.append(tags)

    return np.array(images), labels

images, labels = load_data_and_labels(data_dir)

# Step 2: Preprocess the Data
mlb = MultiLabelBinarizer()
labels = mlb.fit_transform(labels)

# Step 3: Create a Data Loader
X_train, X_test, y_train, y_test = train_test_split(images, labels, random_state=42)
train_dataset = tf.data.Dataset.from_tensor_slices((X_train, y_train)).batch(batch_size)
test_dataset = tf.data.Dataset.from_tensor_slices((X_test, y_test)).batch(batch_size)

# Step 4: Compile the Model (assuming `model` is your model variable)
modified_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Step 5: Train the Model
modified_model.fit(train_dataset, epochs=epochs, validation_data=test_dataset)