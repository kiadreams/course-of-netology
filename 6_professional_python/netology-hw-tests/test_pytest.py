import io
import os

import requests
import pytest

from contextlib import redirect_stdout
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from past_homeworks import check_age, solution, reverse
from ya_registration import create_firefox_brauser, complete_registration

skip_pytest = False


@pytest.mark.skipif(skip_pytest, reason='Пока так')
class TestsPastHomework:

    @pytest.mark.parametrize(
        ['ages', 'expected'],
        (
                [range(1, 18), 'Доступ запрещён'],
                [range(18, 100), 'Доступ разрешён']
        )
    )
    def test_check_age(self, ages: list[int], expected: str) -> None:
        print('test age')
        for age in ages:
            result = check_age(age)
            assert result == expected

    @pytest.mark.parametrize(
        ['args', 'roots'],
        (
                [(1, 8, 15), '-3.0 -5.0'],
                [(1, -13, 12), '12.0 1.0'],
                [(-4, 28, -49), '3.5'],
                [(1, 1, 1), 'корней нет']
        )
    )
    def test_solution(self, args: tuple[int], roots: str) -> None:
        print('test_solution')
        data_io_out = io.StringIO()
        with redirect_stdout(data_io_out):
            solution(*args)
            result = data_io_out.getvalue().strip()
            assert result == roots

    @pytest.mark.parametrize(
        ['world', 'expected'],
        (
                ['!dlroW olleH', 'hello world!'],
                ['AvadaKedavraaaaA!', '!aaaaarvadekadava'],
                ['хаЗерс хишав ХИТЭ в ясларбозар от-ценокан Я',
                 'я наконец-то разобрался в этих ваших срезах']
        )
    )
    def test_reverse(self, world: str, expected: str) -> None:
        print('test revers')
        assert reverse(world) == expected


@pytest.mark.skipif(skip_pytest, reason='Пока так')
class TestYandexApi:

    @classmethod
    def setup_class(cls) -> None:
        cls.base_url = 'https://cloud-api.yandex.net/v1/disk/resources'
        cls.headers = {'Content-Type': 'application/json',
                       'Accept': 'application/json',
                       'Authorization': os.environ['YANDEX_TOKEN']}
        cls.params = {'path': 'Тренировочная папка'}

    @classmethod
    def teardown_class(cls) -> None:
        cls.params |= {'permanently': 'true'}
        requests.delete(url=cls.base_url,
                        headers=cls.headers,
                        params=cls.params)

    def test_not_found_resource(self) -> None:
        params = self.params.copy()
        params['path'] = '/Not_dir/aim'
        response = requests.delete(url=self.base_url,
                                   headers=self.headers,
                                   params=params)
        assert response.status_code == 404

    def test_incorrect_data(self) -> None:
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params={'path': ''})
        assert response.status_code == 400

    def test_not_auth(self) -> None:
        headers = self.headers.copy()
        headers['Authorization'] = ''
        response = requests.put(url=self.base_url,
                                headers=headers,
                                params=self.params)
        assert response.status_code == 401

    def test_incorrect_path(self) -> None:
        params = self.params.copy()
        params['path'] = '/Not_dir/aim'
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=params)
        assert response.status_code == 409

    def test_create_folder(self) -> None:
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=self.params)
        assert response.status_code == 201

    def test_create_folder_again(self):
        response = requests.put(url=self.base_url,
                                headers=self.headers,
                                params=self.params)
        assert response.status_code == 409


@pytest.mark.skipif(skip_pytest, reason='Пока так')
class TestYdAuth:

    @classmethod
    def setup_class(cls) -> None:
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
        assert raised == False

    @classmethod
    def teardown_class(cls) -> None:
        cls.driver.quit()


if __name__ == '__main__':
    pytest.main()
