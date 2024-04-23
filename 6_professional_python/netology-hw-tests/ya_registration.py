import os

from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException


def create_firefox_brauser() -> tuple[Firefox, WebDriverWait]:
    br_service = Service(executable_path=GeckoDriverManager().install())
    options = Options()
    # options.add_argument('--headless')
    driver = Firefox(service=br_service, options=options)
    waiting_driver = WebDriverWait(driver, timeout=10)
    return driver, waiting_driver


def enter_username(br: Firefox, wait_dr: WebDriverWait, username: str) -> None:
    wait_dr.until(
        EC.presence_of_element_located((By.ID, 'passp-field-login'))
    ).send_keys(username)
    wait_dr.until(
        EC.element_to_be_clickable((By.ID, 'passp:sign-in'))
    ).click()


def enter_password(br: Firefox, wait_dr: WebDriverWait, password: str) -> None:
    wait_dr.until(
        EC.visibility_of_element_located((By.ID, 'passp-field-passwd'))
    ).send_keys(password)
    wait_dr.until(
        EC.element_to_be_clickable(((By.ID, 'passp:sign-in')))
    ).click()


def skip_offer(br: Firefox, wait_dr: WebDriverWait) -> None:
    try:
        wait_dr.until(
            EC.element_to_be_clickable((By.CLASS_NAME, 'Button2_size_xxl'))
        ).click()
    except WebDriverException:
        pass


def complete_registration(browser: Firefox,
                          wait_dr: WebDriverWait,
                          login: str,
                          password: str) -> None:
    try:
        browser.get('https://passport.yandex.ru/auth/')
        enter_username(browser, wait_dr, login)
        enter_password(browser, wait_dr, password)
        skip_offer(browser, wait_dr)
    except WebDriverException as exc:
        print(exc.msg)


if __name__ == '__main__':
    login = os.environ['LOGIN_YANDEX']
    password = os.environ['PASSWORD_YANDEX']
    br, waiting_driver = create_firefox_brauser()
    complete_registration(br, waiting_driver, login, password)
    br.quit()
