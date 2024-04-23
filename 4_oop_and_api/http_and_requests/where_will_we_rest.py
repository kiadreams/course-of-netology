import requests
import time


def find_uk_city(coordinates: list) -> str:
    cities = ['Leeds', 'London', 'Liverpool', 'Manchester',
              'Oxford', 'Edinburgh', 'Norwich', 'York']
    key = '65aff82c2bee3834688937mkva291c1'
    url = 'https://geocode.maps.co/reverse'
    for latitude, longitude in coordinates:
        some_params = dict(lat=latitude, lon=longitude, api_key=key)
        resp = requests.get(url, params=some_params).json()
        time.sleep(1)
        if (city := resp.get('address', {}).get('city')) in cities:
            return city


# Решение ЭКСПЕРТА, - не работает!!!
# UK_CITIES = ['Leeds', 'London', 'Liverpool', 'Manchester',
#              'Oxford', 'Edinburgh', 'Norwich', 'York']

# def find_uk_city(coordinates):
#     for lat, lon in coordinates:
#         response = requests.get(
#             f'https://geocode.maps.co/reverse?lat={lat}&lon={lon}')
#         data = response.json()
#         city = data['address']['city']
#         if city in UK_CITIES:
#             return city



if __name__ == '__main__':
    _coordinates = [
        # ('55.7514952', '37.618153095505875'),
        # ('52.3727598', '4.8936041'),
        # ('53.4071991', '-2.99168'),
        ('48.2083537', '16.3725042'),
        ('52.628606', '1.29227'),
        ('55.7514952', '37.618153095505875')
    ]
    # assert find_uk_city(_coordinates) == 'Liverpool'
    print(find_uk_city(_coordinates))
