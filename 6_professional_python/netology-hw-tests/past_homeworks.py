# ДЗ на проверку возраста пользователя
def check_age(age: int):
    if age >= 18:  # Введите условие для проверки возраста
        result = 'Доступ разрешён'
    else:
        result = 'Доступ запрещён'
    return result


# ДЗ на нахождение корней квадратного уравнения
def discriminant(a, b, c):
    """
    функция для нахождения дискриминанта
    """
    return b ** 2 - 4 * a * c


def solution(a, b, c):
    """
    функция для нахождения корней уравнения
    """
    d = discriminant(a, b, c)
    if d < 0:
        print('корней нет')
    elif d:
        print(f'{(-b + d ** 0.5) / (2 * a)} {(-b - d ** 0.5) / (2 * a)}')
    else:
        print(-b / (2 * a))


# ДЗ на реверс указанной строки
def reverse(string: str) -> str:
    # Напишите ваш код здесь
    return string[::-1].lower()


if __name__ == '__main__':
    # Этот код менять не нужно
    auth = check_age(10)
    assert auth == 'Доступ запрещён', f'Получен неверный ответ: {auth}'
    print('Возраст 10:', auth)
    auth = check_age(20)
    assert auth == 'Доступ разрешён',  f'Получен неверный ответ: {auth}'
    print('Возраст 20:', auth)

    # Код на нахождение корней квадратного уравнения
    solution(1, 8, 15)
    solution(1, -13, 12)
    solution(-4, 28, -49)
    solution(1, 1, 1)

    # ДЗ на реверс указанной строки
    assert reverse('!dlroW olleH') == 'hello world!'
    assert reverse('AvadaKedavraaaaA!') == '!aaaaarvadekadava'
    assert reverse(
        'хаЗерс хишав ХИТЭ в ясларбозар от-ценокан Я'
        ) == 'я наконец-то разобрался в этих ваших срезах'
    print("\nОтличная работа, отправляйте на проверку!")
