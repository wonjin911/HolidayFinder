import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Event } from './Event';
import { TravelDay } from '../home/TravelDay';
import { Holiday } from '../home/Holiday';

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

  	this.myDate = new Date(this.travel_day.START_DATE);

  	this.Events = [];
  	for (let holiday of this.travel_day.HOLIDAY_LIST){
  		var event = new Event(new Date(holiday.DATE), new Date(holiday.DATE), holiday.DETAIL);
		this.Events.push(event);
  	}
  }

}
