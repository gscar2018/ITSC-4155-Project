import os

from PIL import Image
import numpy as np
import cv2

if 'data-prepped' not in os.listdir():
    os.makedirs('data-prepped')

with open('new-model/selected_tags', 'r') as f:
    selected_tags = f.read().splitlines()

for file_name in os.listdir('data'):
    if file_name.endswith('.txt'):
        with open(f'data/{file_name}', 'r') as f:
            tagstr = f.read()
        tags = tagstr.split(',')
        matched_tags = []
        tag_bits = []
        for tag in selected_tags:
            if tag in tags:
                matched_tags.append(tag)
                tag_bits.append("1")
            else:
                tag_bits.append("0")
        print(f"Relevant tags for {file_name.split('.')[0]}: {matched_tags}")
        with open(f'data-prepped/{file_name}', 'w+') as f:
            f.write(','.join(tag_bits))
