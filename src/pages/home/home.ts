import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

import { TravelDay } from './TravelDay';
import { Holiday } from './Holiday';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  BREAK_DAY: number;
  MIN_TRAVEL_DAY: number;
  START_YEAR: number;
  HOLIDAY_LIST: Holiday[];
  TRAVEL_DAY_LIST: TravelDay[];
  ORDER_BY: number;

  constructor(public toastCtrl: ToastController) {
  	this.BREAK_DAY = 2;
  	this.MIN_TRAVEL_DAY = 5;
  	this.START_YEAR = 2017;
  	this.TRAVEL_DAY_LIST = [];
  	this.ORDER_BY = 1;

  	this.HOLIDAY_LIST = [new Holiday("2017-01-27", "설날")
  						,new Holiday("2017-01-30", "설날")
  						,new Holiday("2017-03-01", "삼일절")
  						,new Holiday("2017-05-01", "근로자의날")
  						,new Holiday("2017-05-03", "석가탄신일")
  						,new Holiday("2017-05-05", "어린이날")
  						,new Holiday("2017-06-06", "현충일")
  						,new Holiday("2017-08-15", "광복절")
  						,new Holiday("2017-10-03", "추석")
  						,new Holiday("2017-10-04", "추석")
  						,new Holiday("2017-10-05", "추석")
  						,new Holiday("2017-10-06", "추석")
  						,new Holiday("2017-10-09", "추석")
  						,new Holiday("2017-12-25", "성탄절")];
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
    var breakList: string[];
    var checkStartDate: Date = new Date(startDate);
    var targetDate: Date;
    var dayDetail: string;
    var detailList: string[];

    do {

      straightNum = 0;
      breakLeft = this.BREAK_DAY;
      breakList = [];
      targetDate = new Date(checkStartDate);
      dayDetail = "";
      detailList = [];

      do {
		dayDetail = this.IsHoliday(targetDate);      
      	if (dayDetail != ""){
      	  straightNum += 1;
      	  if (detailList.indexOf(dayDetail) == -1) detailList.push(dayDetail);
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else if (breakLeft > 0){
      	  straightNum += 1;
      	  breakLeft -= 1;
      	  breakList.push(targetDate.toISOString().substring(0,10))
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else{
      	  if (straightNum >= this.MIN_TRAVEL_DAY){
      	  	this.TRAVEL_DAY_LIST.push(new TravelDay(checkStartDate.toISOString().substring(0,10)
      	  							, targetDate.toISOString().substring(0,10)
      	  							, straightNum
      	  							, breakList
      	  							, detailList));
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
  	var targetDateStr:string = targetDate.toISOString().substring(0,10);
  	if (targetDate.getDay() == 0 || targetDate.getDay() == 6){
  		return "주말"
  	}

  	for (let holiday of this.HOLIDAY_LIST){
  		if (holiday.DATE == targetDateStr){
  			return holiday.DETAIL;
  		}
  	}
  	return "";
  }

}