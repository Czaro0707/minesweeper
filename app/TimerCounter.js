class TimerCounter {
  constructor(element) {
    this.element = element;
  }

  time = 0;
  timeInterval = null;

  init() {
    this.startTimerCounter();
  }

  startTimerCounter() {
    this.timeInterval = setInterval(() => {
      this.time++;
      this.changeNumberInTimer();
    }, 1000);
  }

  stopTimerCounter() {
    clearInterval(this.timeInterval);
  }

  changeNumberInTimer() {
    if (this.time < 10) {
      this.element.textContent = "00" + this.time;
    } else if (this.time >= 10 && this.time < 100) {
      this.element.textContent = "0" + this.time;
    } else if (this.time > 999) {
      return;
    } else {
      this.element.textContent = this.time;
    }
  }
}

export const timerCounter = new TimerCounter(
  document.querySelector(".interface__time-counter")
);
