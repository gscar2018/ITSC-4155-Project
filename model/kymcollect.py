import PerceiveYourMeme as pym
from time import sleep

engine = pym.SearchEngine("gigachad", context = 'images', max_pages = 11, sort = 'relevance')
search = engine.build()

search.search()

photo_pages = []
for search_page in search.PhotoPageList:
    photo_pages += search_page
    
for page in photo_pages:
    sleep(0.8)
    page.download_photo()