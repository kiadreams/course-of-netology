import requests
from pprint import pprint
import xml.etree.ElementTree as ET


def translate_word(word):
    # url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
    url = 'https://dictionary.yandex.net/api/v1/dicservice/lookup'
    token = ('dict.1.1.20240123T151200Z.b48dcff119a0183e.'
             'd87ab9d1a98a2b8fbd41bb75828b1cc8b5fd213e')
    some_param = {
        'key': token,
        'lang': "ru-en",
        'text': word
    }
    resp = requests.get(url, params=some_param)
    some_parser = ET.XMLParser(encoding='utf-8')
    tree = ET.fromstring(resp.content, some_parser)
    root = tree.find('def/tr/text').text
    return root
    
    # response = requests.get(url=url, params=some_param).json()
    # trans_word = response['def'][0]['tr'][0]['text']
    # return trans_word


if __name__ == '__main__':
    word = 'машина'
    # assert translate_word(word) == 'car'
    print(translate_word(word))