from stack import Stack


def check_staples(seq_staples: str) -> None:
    staples = {')': '(', '}': '{', ']': '['}
    stack = Stack()
    seq_staples = list(seq_staples)
    for staple in seq_staples:
        if staple not in staples:
            stack.push(staple)
        elif (stack.is_empty()
                or (element := stack.pop()) != staples.get(staple)):
            print('Несбалансированно')
            break
    else:
        print('Сбалансированно')


if __name__ == '__main__':
    check_staples((input('Введите полследовательность скобок: ')))