import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerServiceProvider } from './timer-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [
    {
      name: "10 seconds",
      quantity: 10
    },
    {
      name: "30 seconds",
      quantity: 30
    },
    {
      name: "1 minute",
      quantity: 60
    },
    {
      name: "2 minutes",
      quantity: 120
    },
    {
      name: "3 minutes",
      quantity: 180
    },
    {
      name: "5 minutes",
      quantity: 300
    },
    {
      name: "10 minutes",
      quantity: 600
    },
  ];

  constructor(public navCtrl: NavController, private timer: TimerServiceProvider) {
    this.timer.initTimer()
  }

  popupTimer(time) {
    document.getElementById("list").style.display = "none";
    setTimeout(() => {
      this.timer.setTime(time);
      this.timer.startTimer();
    }, 1000)
    document.getElementById("count").style.display = "inline";
  }

}
