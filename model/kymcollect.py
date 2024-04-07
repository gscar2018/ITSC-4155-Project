import PerceiveYourMeme as pym
from time import sleep

# engine = pym.SearchEngine("gigachad", context = 'images', max_pages = 11, sort = 'relevance')
# search = engine.build()
#
# search.search()
#
# photo_pages = []
# for search_page in search.PhotoPageList:
#     photo_pages += search_page
#
# for page in photo_pages:
#     sleep(0.8)
#     page.download_photo()

# anya_heh = pym.MemePage('https://knowyourmeme.com/memes/anyas-heh-face-anya-smug-face')
def collect_for_meme(num_pages, url, guarantee_tags):
    sleep(10)
    page = pym.MemePage(url)
    for i in range(num_pages):
        sleep(5)
        print("getting page {}".format(i))
        photos = page.photos(page_index=i+1)
        for photo in photos:
            photo_page = pym.PhotoPage(photo)
            if photo_page.extension().lower() not in ['.jpg', '.jpeg', '.png']:
                print(f"Skipping {photo_page.basic_info_dict['Id']}, extension is {photo_page.extension()}")
                continue
            print(f"Downloading photo id {photo_page.basic_info_dict['Id']}")
            photo_page.download_photo(extra_tags=guarantee_tags)


# collect_for_meme(3,'https://knowyourmeme.com/memes/anyas-heh-face-anya-smug-face', ['anya_(spy_x_family)', 'anyas_heh_face'])
# collect_for_meme(6,'https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man', ['spider_man_doppelganger'])
# collect_for_meme(9,'# https://knowyourmeme.com/memes/daily-struggle-two-buttons', ['two_buttons'])
collect_for_meme(9,'https://knowyourmeme.com/memes/daily-struggle-two-buttons', ['two_buttons'])
collect_for_meme(11,'https://knowyourmeme.com/memes/two-soyjaks-pointing', ['two_soyjaks_pointing'])


