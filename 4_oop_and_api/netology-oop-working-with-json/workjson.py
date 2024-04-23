import json
from collections import Counter


def read_json(file_path, word_max_len=6, top_words_amt=10):
    """
    функция для чтения файла с новостями.
    """
    with open(file_path, encoding='utf-8') as f:
        json_data = json.load(f)
    all_news = ' '.join([news.get('description', '')
                         for news in json_data['rss']['channel']['items']])
    words_counter = Counter(filter(lambda x: len(x) > word_max_len,
                                   all_news.split()))
    return [world[0] for world in words_counter.most_common(top_words_amt)]


if __name__ == '__main__':
    print(read_json('newsafr.json'))
