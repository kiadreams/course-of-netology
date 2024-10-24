'use strict'

class Cookie {

    constructor(cookie) {
        this.cookie = cookie;
        this.lastClickTime = 0;
        this.clickTime = 0;
        this.speedRate = 0;
        this.maxSpeedRate = 0;
        this.clickCounter = 0;
        this.addEventListeners();
        this.resetTimer = this.startTimeoutReset();
    }

    onClick() {
        clearTimeout(this.resetTimer);
        this.cookie.classList.add('clicker__cookie');
        const timeOut = setTimeout(() => {
            this.cookie.classList.remove('clicker__cookie');
        }, 100);
        this.clickCounter++;
        this.clickTime = new Date().getTime();
        this.calculatingClickRate();
        this.lastClickTime = this.clickTime;
        this.resetTimer = this.startTimeoutReset();
    }

    calculatingClickRate() {
        if (!this.lastClickTime) {
            this.speedRate = 0;
            return;
        }
        const deltaTime = this.clickTime - this.lastClickTime;
        if (deltaTime == 0) {
            this.speedRate = 0;
        } else {
            this.speedRate = (1000 / deltaTime);
            if (this.speedRate > this.maxSpeedRate) {
                this.maxSpeedRate = this.speedRate;
            }
        }
    }

    addEventListeners() {
        this.cookie.addEventListener('click', () => {
            this.onClick();
            updateReadings();
        });
    }

    startTimeoutReset() {
        const resetTimer = setTimeout(() => {
            cookie.calculatingClickRate();
            updateReadings();
        }, 3000);
        return resetTimer;
    }

}


function updateReadings() {
    counter.textContent = cookie.clickCounter;
    speed.textContent = !cookie.speedRate ? 0 : cookie.speedRate.toFixed(2);
}


const counter = document.querySelector('#clicker__counter');
const speed = document.querySelector('#click__rate');
const cookie = new Cookie(document.querySelector('#cookie'));
