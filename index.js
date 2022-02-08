class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.secondsInput = null;
    this.editBtn = null;
    this.runBtn = null;
    this.rerunBtn = null;
    this.timerInputs = null;
    this.audio = null;
    this.alarm = null;
    this.break = null;
    this.study = null;
    this.dots = null;
    this.smallDots = null;

    this.inconsPath = "assets/icons/sprite.svg#";

    this.isEdit = true;
    this.isCounting = false;
    this.smallDotsCounter = 0;
    this.bigDotsCounter = 0;

    this.interval = null;

    // values of inputs
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.thisTotalTime = 0;

    this.maxSeconds = 60;
    this.maxMinutes = 60;
    this.maxHours = 99;
    this.maxTime =
      this.maxHours * 3600 +
      (this.maxMinutes - 1) * 60 +
      (this.maxSeconds - 1) * 60;
    this.currentTime = 0;

    this.UiSelectors = {
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      edit: "[data-edit]",
      run: "[data-run]",
      rerun: "[data-rerun]",
      timeInput: "[data-timer-input]",
      audio: "[data-audio",
      alarm: "[data-alarm]",
      break: "[data-break]",
      study: "[data-study]",
      dots: ".dot",
      smallDots: ".small__dot",
      bigDots: "big__dot",
    };
  }
  initializeTimer = function () {
    this.hoursInput = document.getElementById(this.UiSelectors.hours);
    this.minutesInput = document.getElementById(this.UiSelectors.minutes);
    this.secondsInput = document.getElementById(this.UiSelectors.seconds);

    this.editBtn = document.querySelector(this.UiSelectors.edit);
    this.runBtn = document.querySelector(this.UiSelectors.run);
    this.rerunBtn = document.querySelector(this.UiSelectors.rerun);
    this.timerInputs = document.querySelectorAll(this.UiSelectors.timeInput);
    this.audio = document.querySelector(this.UiSelectors.audio);
    this.alarm = document.querySelector(this.UiSelectors.alarm);

    this.break = document.querySelector(this.UiSelectors.break);
    this.study = document.querySelector(this.UiSelectors.study);

    this.dots = document.querySelectorAll(this.UiSelectors.dots);
    this.smallDots = document.querySelectorAll(this.UiSelectors.smallDots);
    this.bigDots = document.querySelectorAll(this.UiSelectors.bigDots);

    this.addEventListeners();
  };

  changeDots() {
    //small-dots
    document
      .querySelector(`.small__dot-${this.smallDotsCounter}`)
      .classList.add("done");
    if (this.smallDotsCounter === 4) {
      this.smallDots.forEach((dot) => dot.classList.remove("done"));
      this.bigDotsCounter += 1;
      console.log(this.bigDotsCounter);
    }
    //big-dots
    if (this.bigDotsCounter > 0 && this.bigDotsCounter < 5) {
      document
        .querySelector(`.big__dot-${this.bigDotsCounter}`)
        .classList.add("done");
    }
    if (this.bigDotsCounter === 4) {
      alert("GOOD JOB");
    }
  }

  addEventListeners() {
    this.editBtn.addEventListener("click", () => {
      this.switchEditTime();
    });
    this.runBtn.addEventListener("click", () => this.switchTimer());
    this.alarm.addEventListener("click", () => this.stopAllarm());
    this.rerunBtn.addEventListener("click", () => this.resetTimer());

    this.timerInputs.forEach((input) =>
      input.addEventListener(
        "keyup",
        (e) => e.keyCode === 13 && this.switchEditTime()
      )
    );
    //break
    this.break.addEventListener("click", () => {
      this.minutes = 10;
      this.minutesInput.value = 10;
      if (this.smallDotsCounter >= 4) this.smallDotsCounter = 0;
      this.smallDotsCounter += 1;
      console.log(this.smallDotsCounter);
      this.changeDots();
    });
    this.study.addEventListener("click", () => {
      this.minutes = 30;
      this.minutesInput.value = 30;
    });
    this.dots.forEach((dot) =>
      dot.addEventListener("click", () => console.log("ooo"))
    );
  }

  switchEditTime() {
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.isCounting = false;
      clearInterval(this.interval);
      this.selectUseElement(this.editBtn).setAttribute(
        "href",
        `${this.inconsPath}done_black_24dp`
      );
      this.selectUseElement(this.runBtn).setAttribute(
        "href",
        `${this.inconsPath}play_arrow_black_24dp`
      );
      this.timerInputs.forEach((timerInput) => {
        timerInput.removeAttribute("disabled");
      });
      this.runBtn.setAttribute("disabled", "");
      this.getTimerValues();
      this.setTimerValues();

      return;
    }

    this.selectUseElement(this.editBtn).setAttribute(
      "href",
      `${this.inconsPath}mode_edit_black_24dp`
    );

    this.timerInputs.forEach((timerInput) => {
      timerInput.setAttribute("disabled", "");
    });
    this.runBtn.removeAttribute("disabled");
    this.getTimerValues();
    this.setTimerValues();
  }
  switchTimer() {
    this.isCounting = !this.isCounting;
    if (this.isCounting) {
      this.selectUseElement(this.runBtn).setAttribute(
        "href",
        `${this.inconsPath}pause_black_24dp`
      );
      this.interval = setInterval(() => this.upDateTime(), 1000);
      return;
    }
    this.selectUseElement(this.runBtn).setAttribute(
      "href",
      `${this.inconsPath}play_arrow_black_24dp`
    );
    clearInterval(this.interval);
  }
  selectUseElement(element) {
    return element.querySelector("use");
  }
  getTimerValues() {
    this.hours = parseInt(this.hoursInput.value, 10);
    this.minutes = parseInt(this.minutesInput.value, 10);
    this.seconds = parseInt(this.secondsInput.value, 10);

    this.countTotalTime();
  }

  setTimerValues() {
    const seconds = `0${this.currentTime % this.maxSeconds}`;
    const minutes = `0${Math.floor(this.currentTime / 60) % this.maxMinutes}`;
    const hours = `0${Math.floor(this.currentTime / 3600) % this.maxHours}`;

    this.secondsInput.value = seconds.slice(-2);
    this.minutesInput.value = minutes.slice(-2);
    this.hoursInput.value = hours.slice(-2);
  }

  countTotalTime() {
    const timeSum = this.seconds + this.minutes * 60 + this.hours * 3600;
    this.totalTime = timeSum <= this.maxTime ? timeSum : this.maxTime;

    this.currentTime = this.totalTime;
  }
  upDateTime() {
    if (this.currentTime) {
      this.currentTime--;
      this.setTimerValues();
      return;
    }
    clearInterval(this.interval);
    this.audio.play();
    this.alarm.classList.remove("hide");
    this.editBtn.setAttribute("disabled", "");
    this.runBtn.setAttribute("disabled", "");
    this.rerunBtn.setAttribute("disabled", "");
  }

  stopAllarm() {
    this.audio.pause();
    this.alarm.classList.add("hide");
    this.editBtn.removeAttribute("disabled");
    this.runBtn.removeAttribute("disabled");
    this.rerunBtn.removeAttribute("disabled");
    this.switchEditTime();
    // this.selectUseElement(this.runBtn).setAttribute(
    //   "href",
    //   `${this.inconsPath}play_arrow_black_24dp`
    // );
  }
  resetTimer() {
    this.currentTime = this.totalTime;
    this.setTimerValues();
    this.selectUseElement();
    // this.selectUseElement(this.runBtn).setAttribute(
    //   "href",
    //   `${this.inconsPath}play_arrow_black_24dp`
    // );
  }
  //2.0
}
