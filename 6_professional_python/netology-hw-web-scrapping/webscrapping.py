import pprint
import requests
import bs4
import re
import json

from fake_headers import Headers


def get_headers():
    return Headers(browser='chrome', os='win').generate()


def get_soup_data(url: str) -> bs4.BeautifulSoup:
    response = requests.get(url, headers=get_headers()).text
    soup_data = bs4.BeautifulSoup(response, features='lxml')
    write_file(soup_data.text)
    return soup_data


def get_salary(vacancy: bs4.BeautifulSoup) -> str:
    data_of_salary = vacancy.find(
        name='span',
        attrs={'data-qa': 'vacancy-salary-compensation-type-net'}
    )
    if data_of_salary is not None:
        salary = data_of_salary.text.replace('\xa0', '_')
    else:
        salary = 'Зарплата не указана'
    return salary


def get_company(vacancy: bs4.BeautifulSoup) -> str:
    company_name = vacancy.find(
        name='span',
        class_='vacancy-company-name'
    ).text.replace('\xa0', ' ')
    return company_name


def get_location(vacancy: bs4.BeautifulSoup) -> str:
    city_data = vacancy.find(name='span',
                             attrs={'data-qa': 'vacancy-view-raw-address'})
    if city_data is None:
        city_data = vacancy.find(name='p',
                                 attrs={'data-qa': 'vacancy-view-location'})
    city = 'Город не указан' if city_data is None else city_data.text
    return city.split(', ')[0]


def checking_for_keywords(vacancy: bs4.BeautifulSoup,
                          template: list) -> bool:
    description = vacancy.find(name='div', class_='g-user-content').text
    answer = [word.search(description) for word in template]
    return any(answer)


def create_json_file(data: list):
    with open('vacancies.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
def write_file(text: str):
    with open('html2.txt', 'w', encoding='utf') as f:
        f.writelines(text)

if __name__ == '__main__':
    print('Вакансии учитывать только с доллоровой зарплатой?')
    print('Если да, то введите любой символ, иначе - просто нажмите Enter!')
    dollars_matter = bool(input('Ваш ответ: '))
    
    all_vacancies = []
    target_url = 'https://spb.hh.ru/search/vacancy?text=python&area=1&area=2'
    sample = [
        re.compile(r'\bDjango\b', flags=re.IGNORECASE),
        re.compile(r'\bFlask\b', flags=re.IGNORECASE)
    ]

    html_soup = get_soup_data(target_url)
    exit()
    for vacancy in html_soup.find_all(name='div',
                                      attrs={'class': 'serp-item'}):
        link = vacancy.find(name='a', attrs={'class': 'bloko-link'})['href']
        vacancy_soup = get_soup_data(link)
        if checking_for_keywords(vacancy_soup, sample):
            salary = get_salary(vacancy_soup)
            if dollars_matter and '$' not in salary:
                continue
            company_name = get_company(vacancy_soup)
            location = get_location(vacancy_soup)
            json_item = {'url_adress': link,
                         'salary': salary,
                         'company_name': company_name,
                         'city': location}
            all_vacancies.append(json_item)
    create_json_file(dict(enumerate(all_vacancies)))
