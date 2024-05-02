import tensorflow as tf
import numpy as np

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Dense, Input, Activation

# using convnext model architecture
# https://arxiv.org/pdf/2201.03545.pdf

# load base checkpoint from huggingface
model = load_model("wd14_tagger_model")

# order of operations for updated model architecture

# 1. create a new dense layer - 1 neuron per tag we want
# 2. copy weights from original dense layer for tags we care about, discard the rest
# 3. create new model with original early layers, swapping in the new dense layer
# 2. replace activation layer
# 3. compile

intermediate_model = Model(inputs=model.input, outputs=model.layers[-3].output)

total_original = 9083
# indices for tags we want to take from original model
# we might do this outside the script eventually since it will probably get quite large
# for what it's worth, the first 4 neurons are rating tags which is probably useful
# character tags start at 6952 - the rest are general tags we can try to ignore
keep_tag_indices = [0, 1, 2, 3, *range(6951, total_original)]
original_weights, original_biases = model.layers[-2].get_weights()

additional_tags = [
    'gigachad',
    # https://knowyourmeme.com/memes/gigachad
    'spider_man_doppelganger',
    # https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man
    'anyas_heh_face',
    # https://knowyourmeme.com/memes/anyas-heh-face-anya-smug-face
    'two_buttons',
    # https://knowyourmeme.com/memes/daily-struggle-two-buttons
    'two_soyjaks_pointing',
    # https://knowyourmeme.com/memes/ouhhh-husbant-now-we-are-homeress
    'now_we_are_homeless'
    # https://knowyourmeme.com/memes/you-can-just-give-this-kind-of-thing-to-men-and-they-will-be-thrilled
    'they_will_be_thrilled',
    # https://knowyourmeme.com/memes/donald-trumps-mugshot
    'trumps_mugshot',
    # https://knowyourmeme.com/memes/success-kid-i-hate-sandcastles
    'success_kid',
    'rage_comics',
    'drunk_baby',
    'bro_visited_his_friend',
    'drakeposting',
    'rage_comics',
    'forever_alone',
    'no_rage_face',
    'fuck_yeah',
    'cereal_guy',
    'trollface',
    'trollge',
    'oh_god_why',
    'rage_guy',
    'neglected_drowning',
    'doge',
    'cheems',
    'swole_doge',
    'deep_fried',
    'wojak',
    'pink_wojak',
    'withered_wojak',
    'big_brain',
    'psycho_wojak',
    'zoomer',
    'boomer',
    'doomer',
    'soyjak',
    'npc',
    'ah_eto_bleh',
    'virgin_vs_chad',
    'pogchamp',
]

new_neurons = len(additional_tags)
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

final_model.summary()

# set up the tag mapping
import csv

with open('wd14_tagger_model/selected_tags.csv') as f:
    all_tags = [x[1] for x in csv.reader(f)][1:]

# https://stackoverflow.com/questions/18272160/access-multiple-elements-of-list-knowing-their-index
import operator
preserved_tags = list(operator.itemgetter(*keep_tag_indices)(all_tags))

new_tags = preserved_tags + additional_tags

# safety to make sure no tags are missing
assert len(new_tags) == len(keep_tag_indices) + new_neurons, "mismatch between dense layer size and number of tags"

final_model.save('./new-model', save_format='tf')
with open('./new-model/selected_tags', 'w+') as f:
    f.writelines([tag + '\n' for tag in new_tags])
