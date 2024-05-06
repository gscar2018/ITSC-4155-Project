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
            collect_single_image(photo, guarantee_tags)


def collect_single_image(url, guarantee_tags):
    photo_page = pym.PhotoPage(url)
    if photo_page.extension().lower() not in ['.jpg', '.jpeg', '.png']:
        print(f"Skipping {photo_page.basic_info_dict['Id']}, extension is {photo_page.extension()}")
        return
    print(f"Downloading photo id {photo_page.basic_info_dict['Id']}")
    photo_page.download_photo(extra_tags=guarantee_tags)



# collect_for_meme(3,'https://knowyourmeme.com/memes/anyas-heh-face-anya-smug-face', ['anya_(spy_x_family)', 'anyas_heh_face'])
# collect_for_meme(6,'https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man', ['spider_man_doppelganger'])
# collect_for_meme(9,'# https://knowyourmeme.com/memes/daily-struggle-two-buttons', ['two_buttons'])
# collect_for_meme(9,'https://knowyourmeme.com/memes/daily-struggle-two-buttons', ['two_buttons'])
collect_for_meme(2,'https://knowyourmeme.com/memes/ouhhh-husbant-now-we-are-homeress', ['now_we_are_homeless'])
collect_single_image('https://knowyourmeme.com/photos/2634056-hatsune-miku-vocaloid', ['hatsune_miku', 'now_we_are_homeless'])
collect_single_image('https://knowyourmeme.com/photos/2448833-gardevoir', ['gardevoir', 'now_we_are_homeless'])
collect_single_image('https://knowyourmeme.com/photos/2717415-touhou-project-%E6%9D%B1%E6%96%B9project', ['hakurei_reimu', 'now_we_are_homeless'])

collect_for_meme(2,'https://knowyourmeme.com/memes/you-can-just-give-this-kind-of-thing-to-men-and-they-will-be-thrilled', ['they_will_be_thrilled'])

collect_for_meme(2,'https://knowyourmeme.com/memes/donald-trumps-mugshot', ['trumps_mugshot'])

collect_for_meme(2,'https://knowyourmeme.com/memes/success-kid-i-hate-sandcastles', ['success_kid'])

collect_for_meme(2,'https://knowyourmeme.com/memes/drunk-baby--2', ['drunk_baby'])

collect_for_meme(2,'https://knowyourmeme.com/memes/bro-visited-his-friend-friendpilled-visitmaxxer', ['bro_visited_his_friend'])
collect_single_image('https://knowyourmeme.com/photos/2800833-bro-visited-his-friend-friendpilled-visitmaxxer', ['bro_visited_his_friend', 'joseph_joestar'])

collect_for_meme(5,'https://knowyourmeme.com/memes/drakeposting', ['drakeposting'])
collect_single_image('https://knowyourmeme.com/photos/2806028-drakeposting', ['drakeposting', 'rage_comics'])
collect_single_image('https://knowyourmeme.com/photos/2252010-drakeposting', ['drakeposting', 'gawr_gura'])

# rage comics
collect_for_meme(1,'https://knowyourmeme.com/memes/sweet-jesus-face', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/forever-alone', ['rage_comics', 'forever_alone'])
collect_for_meme(1,'https://knowyourmeme.com/memes/no-rage-face', ['rage_comics', 'no_rage_face'])
collect_for_meme(1,'https://knowyourmeme.com/memes/okay-guy', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/fuck-yea', ['rage_comics', 'fuck_yeah'])
collect_for_meme(1,'https://knowyourmeme.com/memes/oh-crap-omg-rage-face', ['rage_comics'])
collect_for_meme(2,'https://knowyourmeme.com/memes/cereal-guy', ['cereal_guy'])
collect_for_meme(5,'https://knowyourmeme.com/memes/trollface', ['trollface'])
collect_for_meme(2,'https://knowyourmeme.com/memes/trollge', ['trollge'])
collect_for_meme(1,'https://knowyourmeme.com/memes/youwhat-have-you-done', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/derpina', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/omg-run-guy-tampon-head-rage-face', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/harp-darp-herp-derp', ['rage_comics'])
collect_for_meme(1,'https://knowyourmeme.com/memes/oh-god-why', ['rage_comics', 'oh_god_why'])
collect_for_meme(1,'https://knowyourmeme.com/memes/desk-flip', ['rage_comics'])
collect_for_meme(3,'https://knowyourmeme.com/memes/rage-guy-fffffuuuuuuuu', ['rage_comics', 'rage_guy'])
# end rage comics

collect_for_meme(1,'https://knowyourmeme.com/memes/mother-ignoring-kid-drowning-in-a-pool', ['neglected_drowning'])

# dogelore
collect_for_meme(5,'https://knowyourmeme.com/memes/doge', ['doge'])
collect_for_meme(2,'https://knowyourmeme.com/memes/cheems', ['cheems'])
collect_for_meme(1,'https://knowyourmeme.com/memes/swole-doge', ['doge', 'swole_doge'])
# end dogelore

# deep fried
collect_for_meme(2,'https://knowyourmeme.com/memes/lord-marquaad-e', ['deep_fried'])
collect_for_meme(5,'https://knowyourmeme.com/memes/deep-fried-memes', ['deep_fried'])
# end deep fried

# wojak index
collect_for_meme(10,'https://knowyourmeme.com/memes/wojak', ['wojak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/pink-wojak', ['wojak', 'pink_wojak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/withered-wojak', ['wojak', 'withered_wojak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/big-brain-wojak', ['wojak', 'big_brain'])
collect_for_meme(1,'https://knowyourmeme.com/memes/psycho-wojak-le-scary-face', ['wojak', 'psycho_wojak'])

collect_for_meme(1,'https://knowyourmeme.com/memes/zoomer-wojak', ['wojak', 'zoomer'])
collect_for_meme(1,'https://knowyourmeme.com/memes/30-year-old-boomer', ['wojak', 'boomer'])
collect_for_meme(1,'https://knowyourmeme.com/memes/doomer', ['wojak', 'doomer'])

collect_for_meme(5,'https://knowyourmeme.com/memes/soy-boy-face-soyjak', ['soyjak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/soyjak-shows-his-phone', ['soyjak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/shirtjak-soyjak-wearing-i-%E2%99%A5-x-t-shirt', ['soyjak'])
collect_for_meme(1,'https://knowyourmeme.com/memes/soyjak-extending-a-note', ['soyjak'])
# collect_for_meme(11,'https://knowyourmeme.com/memes/two-soyjaks-pointing', ['two_soyjaks_pointing'])

collect_for_meme(1,'https://knowyourmeme.com/memes/npc-wojak', ['npc'])
collect_for_meme(1,'https://knowyourmeme.com/memes/npc-wojak', ['npc'])
# end wojaks

collect_for_meme(1,'https://knowyourmeme.com/memes/ah-eto-bleh', ['ah_eto_bleh'])

collect_for_meme(2,'https://knowyourmeme.com/memes/virgin-vs-chad', ['virgin_vs_chad'])

collect_for_meme(2,'https://knowyourmeme.com/memes/pogchamp', ['pogchamp'])