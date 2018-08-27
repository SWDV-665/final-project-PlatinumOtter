import { Component, Input } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { Timer } from './timer-interface'

/*
  Creates Timer instances that count down and play a sound upon completion
*/
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerServiceProvider {

  @Input() time: number;
  public timer: Timer;

  constructor(private nativeAudio: NativeAudio) {
    console.log('Hello TimerService Provider');
  }

  playSound() {
    console.log('playing sound')
    this.nativeAudio.preloadSimple('dingdong', 'dingdong.m4a');
    this.nativeAudio.play('dingdong')
  }

  ngOnInit() {
    this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.time) { this.time = 0; }

    this.timer = <Timer>{
      seconds: this.time,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.time
    };

    this.timer.displayTime = this.timer.secondsRemaining.toString();
  }

  setTime(time) {
    this.timer.secondsRemaining = time
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.timer.secondsRemaining.toString();
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      }
      else {
        this.timer.hasFinished = true;
        this.playSound();
      }
    }, 1000);
  }

}
