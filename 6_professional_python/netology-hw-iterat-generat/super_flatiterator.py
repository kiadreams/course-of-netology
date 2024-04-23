class FlatIterator:

    def __init__(self, list_of_list):
        self.list_of_list = list_of_list
        self.all_iters = []
    
    def __iter__(self):
        self.all_iters.append(iter(self.list_of_list))
        return self

    def __next__(self):
        while self.all_iters:
            try:
                while isinstance(value := next(self.all_iters[-1]), list):
                    if value:
                        self.all_iters.append(iter(value))
                else:
                    return value
            except StopIteration:
                self.all_iters.pop()
        raise StopIteration


def test_3():

    list_of_lists_2 = [
        [['a'], ['b', 'c']],
        ['d', 'e', [['f'], 'h'], False],
        [1, 2, None, [[[[['!']]]]], []]
    ]

    for flat_iterator_item, check_item in zip(
            FlatIterator(list_of_lists_2),
            ['a', 'b', 'c', 'd', 'e', 'f', 'h', False, 1, 2, None, '!']
    ):

        assert flat_iterator_item == check_item

    assert list(FlatIterator(list_of_lists_2)) == [
        'a', 'b', 'c', 'd', 'e', 'f', 'h', False, 1, 2, None, '!']


if __name__ == '__main__':
    test_3()
