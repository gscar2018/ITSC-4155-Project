import requests
# https://stackoverflow.com/questions/18308529/python-requests-package-handling-xml-response
from xml.etree import ElementTree

import os

if 'data' not in os.listdir():
    os.makedirs('data')

safebooru_source_tags = ['gigachad_(meme)']

quality_map = {
    's': 'general',
    'q': 'general',
}

sb_api_url = "https://safebooru.org/index.php?page=dapi&s=post&q=index&tags="
for tag in safebooru_source_tags:
    r = requests.get(f"https://safebooru.org/index.php?page=dapi&s=post&q=index&tags={tag}")
    posts = ElementTree.fromstring(r.content)
    print(f'downloading {len(posts)} posts for {tag}')
    for post in posts:
        post_tags = [tag.strip() for tag in post.attrib['tags'].strip().split(' ')]
        post_tags.append(quality_map[post.attrib['rating']])  # rating from results seems unreliable
        post_file_url = post.attrib['file_url']
        post_file_name = post_file_url.split('/')[-1]
        file_request = requests.get(post_file_url)
        with open(f'data/{post_file_name}', 'wb+') as img_file:
            img_file.write(file_request.content)
        with open(f'data/{post_file_name.split(".")[0]}.txt', 'w+') as tag_file:
            tag_file.write(','.join(post_tags))
