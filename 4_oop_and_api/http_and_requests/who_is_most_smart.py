import requests


def get_the_smartest_superhero() -> str:
    names = ['Hulk', 'Captain America', 'Thanos']
    base_url = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api'
    all_data = '/all.json'
    respons = requests.get(base_url + all_data)
    all_heroes = respons.json()
    necessary_heroes = [(x['name'], x['powerstats']) for x in all_heroes
                        if x["name"] in names]
    the_smartest_superhero = max(necessary_heroes,
                                 key=lambda x: x[1].get('intelligence'))
    return the_smartest_superhero[0]
    
print(get_the_smartest_superhero())