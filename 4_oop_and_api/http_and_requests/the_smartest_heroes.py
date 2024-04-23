import requests


def get_the_smartest_superhero(superheros):
   the_smartest_superhero = ''
   base_url = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api'
   necessary_heroes = []
   for id in superheros:
       url = base_url + f'/id/{id}.json'
       hero_data = requests.get(url).json()
       necessary_heroes.append(
           (hero_data['name'], hero_data['powerstats']['intelligence'])
           )
   the_smartest_superhero = max(necessary_heroes, key=lambda x: x[1])[0]
   return the_smartest_superhero

print(get_the_smartest_superhero([1, 3, 5]))