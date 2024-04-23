import unittest
import io
import os

import requests
from contextlib import redirect_stdout
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException

from past_homeworks import check_age, solution, reverse
from ya_registration import complete_registration, create_firefox_brauser

skip_unittest = False


@unittest.skipIf(skip_unittest, 'Пока так')
class PastHomeworksTests(unittest.TestCase):

    def test_check_age(self) -> None:
        list_of_ages_1 = range(1, 18)
        list_of_ages_2 = range(18, 100)
        for age in list_of_ages_1:
            result = check_age(age)
            self.assertEqual(result, 'Доступ запрещён', 'fail test check_age')
        for age in list_of_ages_2:
            result = check_age(age)
            self.assertEqual(result, 'Доступ разрешён', 'fail test check_age')

    def test_solution(self) -> None:
        all_data = [(1, 8, 15), (1, -13, 12), (-4, 28, -49), (1, 1, 1)]
        all_results = ['-3.0 -5.0', '12.0 1.0', '3.5', 'корней нет']
        data_io_out = io.StringIO()
        for i in range(4):
            with redirect_stdout(data_io_out):
                solution(*all_data[i])
            result = data_io_out.getvalue().strip()
            data_io_out.truncate(0)
            data_io_out.seek(0)
            self.assertEqual(result, all_results[i], 'fail test solution')

    def test_reverse(self) -> None:
        all_data = ['!dlroW olleH',
                    'AvadaKedavraaaaA!',
                    'хаЗерс хишав ХИТЭ в ясларбозар от-ценокан Я']
        all_results = ['hello world!',
                       '!aaaaarvadekadava',
                       'я наконец-то разобрался в этих ваших срезах']
        for i in range(3):
            self.assertEqual(reverse(all_data[i]),
                             all_results[i],
                             'fail test reverse')


@unittest.skipIf(skip_unittest, 'Пока так')
class YandexApiTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.base_url = 'https://cloud-api.yandex.net/v1/disk/resources'
        cls.headers = {'Content-Type': 'application/json',
                       'Accept': 'application/json',
                       'Authorization': os.environ['YANDEX_TOKEN']}
        cls.params = {'path': 'Тренировочная папка'}

    @classmethod
    def tearDownClass(cls) -> None:
        cls.params |= {'permanently': 'true'}
        requests.delete(url=cls.base_url,
                        headers=cls.headers,
                        params=cls.params)

    def test_incorrect_data(self) -> None:
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params={'path': ''})
        self.assertEqual(response.status_code, 400)

    def test_not_auth(self) -> None:
        headers = self.headers.copy()
        headers['Authorization'] = ''
        response = requests.put(url=self.base_url,
                                headers=headers,
                                params=self.params)
        self.assertEqual(response.status_code, 401)

    def test_incorrect_path(self) -> None:
        params = self.params.copy()
        params['path'] = '/Not_dir/aim'
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=params)
        self.assertEqual(response.status_code, 409)

    def test_not_found_resource(self) -> None:
        params = self.params.copy()
        params['path'] = '/Not_dir/aim'
        response = requests.delete(url=self.base_url,
                                   headers=self.headers,
                                   params=params)
        self.assertEqual(response.status_code, 404)

    def test_create_folder(self) -> None:
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=self.params)
        self.assertEqual(response.status_code, 201)

    def test_create_folder_again(self) -> None:
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=self.params)
        self.assertEqual(response.status_code, 409)


@unittest.skipIf(skip_unittest, 'Пока так')
class YdAuthTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.driver, cls.wait_dr = create_firefox_brauser()

    def test_registraton(self) -> None:
        raised = False
        complete_registration(self.driver,
                              self.wait_dr,
                              os.environ['LOGIN_YANDEX'],
                              os.environ['PASSWORD_YANDEX'])
        try:
            self.wait_dr.until(
                EC.presence_of_element_located((By.ID, 'react-aria-13'))
            )
        except WebDriverException:
            raised = True
        self.assertEqual(raised, False)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.driver.quit()


if __name__ == '__main__':
    unittest.main()
