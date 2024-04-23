from pprint import pprint


def get_ingredients(file, num_ingredients):
    all_ingredients = []
    keys = ['ingredient_name', 'quantity', 'measure']
    for _ in range(num_ingredients):
        ingredient = [int(e) if e.isdigit() else e
                      for e in file.readline().strip().split(' | ')]
        all_ingredients.append(dict(zip(keys, ingredient)))
    return all_ingredients


def create_cook_book(f_name):
    book = {}
    with open(f_name, encoding='utf-8') as file_input:
        while line := file_input.readline():
            recipe_name = line.strip()
            if recipe_name:
                num_ingredients = int(file_input.readline())
                ingredients = get_ingredients(file_input, num_ingredients)
                book[recipe_name] = ingredients
    return book


def get_shop_list_by_dishes(dishes, person_count):
    list_by_dishes = {}
    for dish in dishes:
        for ingredient in cook_book.get(dish):
            product = list_by_dishes.setdefault(
                ingredient['ingredient_name'],
                {})
            if not product:
                product['measure'] = ingredient['measure']
                product['quantity'] = ingredient['quantity'] * person_count
            else:
                product['quantity'] += ingredient['quantity'] * person_count
    return list_by_dishes


file_name = 'sample_recipes.txt'
cook_book = create_cook_book(file_name)
pprint(cook_book)
print()
shop_list = get_shop_list_by_dishes(['Запеченный картофель', 'Омлет'], 2)
pprint(shop_list)
