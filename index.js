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

    this.isEdit = true;

    this.UiSelectors = {
      hours: "hours",
      minute: "minute",
      seconds: "seconds",
      edit: "[data-edit]",
      run: "[data-run]",
      rerun: "[data-rerun]",
      timeInputs: "[data-timer-input]",
      audio: "[data-audio",
      alarm: "[data-alarm]",
    };
  }
  initializeTimer = function () {
    this.hoursInput = document.getElementById(this.UiSelectors.hours);
    this.minuetsInput = document.getElementById(this.UiSelectors.minuets);
    this.secondsInput = document.getElementById(this.UiSelectors.seconds);

    this.editBtn = document.querySelector(this.UiSelectors.edit);
    this.runBtn = document.querySelector(this.UiSelectors.run);
    this.rerunBtn = document.querySelector(this.UiSelectors.rerun);
    this.timerInputs = document.querySelectorAll(this.UiSelectors.timeInput);
    this.audio = document.querySelector(this.UiSelectors.audio);
    this.alarm = document.querySelector(this.UiSelectors.alarm);

    this.addEventListener();
  };

  addEventListener() {
    this.editBtn.addEventListener("click", () => this.editTime());
  }

  editTime() {
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.editBtn
        .querySelector("use")
        .setAttribute(
          "xlink:href",
          "./assets/icons/sprite.svg#play_arrow_black_24dp"
        );
      return;
    }
    if (!this.isEdit) {
      this.editBtn.querySelector("use").setAttribute(
        "xlink:href",
        "./assets/icons/sprite.svg#mode_edit_black_24dp"
        //
      );
    }
  }
}
