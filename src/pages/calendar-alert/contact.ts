import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Event } from './Event';
import { TravelDay } from '../home/TravelDay';

@Component({
  selector: 'page-calendar-alert',
  templateUrl: 'contact.html'
})
export class CalendarAlert {

  myDate: Date;
  Events: Event[];
  travel_day: TravelDay;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

	this.travel_day = this.navParams.get('travel_day');
	console.log(this.travel_day);

	//BREAK_LIST: string[];
  	//DETAIL_LIST: string[];

  	this.myDate = new Date(this.travel_day.START_DATE);

  	this.Events = [];
  	for (let breakday of this.travel_day.BREAK_LIST){
  		var event = new Event(new Date(breakday), new Date(breakday), "휴가사용");
		this.Events.push(event);
  	}
  }

}
