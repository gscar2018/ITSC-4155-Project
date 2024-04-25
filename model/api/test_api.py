import requests

url = "http://localhost:8000/predict"

print("Sending request to ", url)
img_path = r"./test_imgs/dummy_img.png" #open in binary mode
with open(img_path, "rb") as file:
    files = {"file": file}

    response = requests.post(url, files=files)

if response.status_code == 200:
    tags = response.json()["tags"]
    print("tags: ", tags)
else:
    print("Error: ", response.status_code)