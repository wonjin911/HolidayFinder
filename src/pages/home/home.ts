import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { TravelDay } from '../home/TravelDay';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  BREAK_DAY: number;
  MIN_TRAVEL_DAY: number;
  START_YEAR: number;
  HOLIDAY_LIST: string[];
  TRAVEL_DAY_LIST: TravelDay[];

  constructor(public toastCtrl: ToastController) {
  	this.BREAK_DAY = 2;
  	this.MIN_TRAVEL_DAY = 5;
  	this.START_YEAR = 2017;
  	this.TRAVEL_DAY_LIST = [];

  	this.HOLIDAY_LIST = ["2017-01-27","2017-01-30","2017-03-01","2017-05-03","2017-05-05","2017-06-06"
  						,"2017-08-15","2017-10-03","2017-10-04","2017-10-05","2017-10-06","2017-10-09"
  						,"2017-12-20","2017-12-25"];
  }

  PresentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  UpdateValue(target:number, value:number){
  	if (target == 1){
  	  if (this.BREAK_DAY + value >= 0 || this.BREAK_DAY + value <= 15){
  	  	this.BREAK_DAY += value;
  	  }else{
  	    this.PresentToast("휴가 일수는 0과 15 사이여야 합니다.")
  	  }
  	}else if (target == 2){
  	  if (this.MIN_TRAVEL_DAY + value >= 3 || this.MIN_TRAVEL_DAY + value <= 20){
  	    this.MIN_TRAVEL_DAY += value;
  	  }else{
  	  	this.PresentToast("최소 여행일수는 3과 20 사이여야 합니다.")
  	  }
  	}else if (target == 3){
  	  this.START_YEAR += value;
  	}
  }

  Search(){
  	console.log("Search Button Clicked");
  	console.log(this.BREAK_DAY);
  	console.log(this.MIN_TRAVEL_DAY);
  	console.log(this.START_YEAR);

  	this.TRAVEL_DAY_LIST = [];

  	if (this.MIN_TRAVEL_DAY <= this.BREAK_DAY+1){
  	  console.log("최소여행일수는 사용할 휴일수보다 3일이상 많아야합니다.")
  	  this.PresentToast("최소여행일수는 사용할 휴일수보다 3일이상 많아야합니다.");
  	  return;
  	}
  	
  	this.FindStart(new Date(String(this.START_YEAR).concat("-01-01")), new Date(String(this.START_YEAR).concat("-12-31")));
  	console.log(this.TRAVEL_DAY_LIST);
  }

  FindStart(startDate:Date, endDate:Date){

  	console.log(startDate);
    console.log(endDate);

    var straightNum: number;
    var breakLeft: number;
    var checkStartDate: Date = new Date(startDate);
    var targetDate: Date;

    do {

      straightNum = 0;
      breakLeft = this.BREAK_DAY;
      targetDate = new Date(checkStartDate);

      do {
      	if (this.IsHoliday(targetDate)){
      	  straightNum += 1;
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else if (breakLeft > 0){
      	  straightNum += 1;
      	  breakLeft -= 1;
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else{
      	  if (straightNum >= this.MIN_TRAVEL_DAY){
      	  	this.TRAVEL_DAY_LIST.push(new TravelDay(checkStartDate.toISOString().substring(0,10)
      	  							, targetDate.toISOString().substring(0,10)
      	  							, straightNum));
      	  }
      	  break;
      	}
      } while(targetDate < endDate)
      checkStartDate.setDate(checkStartDate.getDate() + 1);
    } while(checkStartDate <= endDate)

    console.log("search ended");
    if (this.TRAVEL_DAY_LIST.length == 0){
      this.PresentToast("검색된 결과가 없습니다.");
    }
  }

  IsHoliday(targetDate:Date){
  	if ((this.HOLIDAY_LIST.indexOf(targetDate.toISOString().substring(0,10)) > -1) || (targetDate.getDay() == 0 || targetDate.getDay() == 6)){
  	  return true;
  	}else{
  	  return false;
  	}
  }

}