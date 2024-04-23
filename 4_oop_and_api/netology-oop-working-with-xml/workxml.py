import xml.etree.ElementTree as ET
from collections import Counter


def read_xml(file_path, word_max_len=6, top_words_amt=10):
    """
    функция для чтения файла с новостями.
    """
    parser = ET.XMLParser(encoding='utf-8')
    tree = ET.parse(file_path, parser)
    root = tree.getroot()
    result = ' '.join(
        [e.text for e in root.findall('channel/item/description')]
    )
    words_counter = Counter(
        filter(lambda x: len(x) > word_max_len, result.split())
    ).most_common(top_words_amt)
    return [w[0] for w in words_counter]


if __name__ == '__main__':
    print(read_xml('newsafr.xml'))
