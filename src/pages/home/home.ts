import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { TravelDay } from './TravelDay';
import { Holiday } from './Holiday';
import { CalendarAlert } from '../calendar-alert/contact';

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

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController) {
  	this.BREAK_DAY = 2;
  	this.MIN_TRAVEL_DAY = 5;
  	this.START_YEAR = 2017;
  	this.TRAVEL_DAY_LIST = [];
  	this.ORDER_BY = 1;

  	this.HOLIDAY_LIST = [new Holiday("2017-01-01", "신정")
  						,new Holiday("2017-01-27", "설날")
  						,new Holiday("2017-01-30", "설날대체휴일")
  						,new Holiday("2017-03-01", "삼일절")
  						,new Holiday("2017-05-01", "근로자의날")
  						,new Holiday("2017-05-03", "석가탄신일")
  						,new Holiday("2017-05-05", "어린이날")
  						,new Holiday("2017-06-06", "현충일")
  						,new Holiday("2017-08-15", "광복절")
  						,new Holiday("2017-10-03", "개천절")
  						,new Holiday("2017-10-04", "추석")
  						,new Holiday("2017-10-05", "추석")
  						,new Holiday("2017-10-06", "추석대체휴일")
  						,new Holiday("2017-10-09", "한글날")
  						,new Holiday("2017-12-25", "성탄절")
  						,new Holiday("2018-01-01", "신정")
  						,new Holiday("2018-02-15", "설날")
  						,new Holiday("2018-02-16", "설날")
  						,new Holiday("2018-02-17", "설날")
  						,new Holiday("2018-03-01", "삼일절")
  						,new Holiday("2018-05-01", "근로자의날")
  						,new Holiday("2018-05-07", "어린이날대체휴일")
  						,new Holiday("2018-05-22", "석가탄신일")
						,new Holiday("2018-06-06", "현충일")
						,new Holiday("2018-08-15", "광복절")
						,new Holiday("2018-09-24", "추석")
						,new Holiday("2018-09-25", "추석")
						,new Holiday("2018-09-26", "추석대체휴일")
						,new Holiday("2018-10-03", "개천절")
						,new Holiday("2018-10-09", "한글날")
						,new Holiday("2018-12-25", "성탄절")
						,new Holiday("2019-01-01", "신정")
						,new Holiday("2019-02-04", "설날")
						,new Holiday("2019-02-05", "설날")
						,new Holiday("2019-02-06", "설날")
						,new Holiday("2019-03-01", "삼일절")
						,new Holiday("2019-05-01", "근로자의날")
						,new Holiday("2019-05-06", "어린이날대체휴일")
						//석가탄실일 일요일
						,new Holiday("2019-06-06", "현충일")
						,new Holiday("2019-08-15", "광복절")
						,new Holiday("2019-09-12", "추석")
						,new Holiday("2019-09-13", "추석")
						,new Holiday("2019-10-03", "개천절")
						,new Holiday("2019-10-09", "한글날")
						,new Holiday("2019-12-25", "성탄절")
						,new Holiday("2020-01-01", "신정")
						,new Holiday("2020-01-24", "설날")
						,new Holiday("2020-01-25", "설날")
						,new Holiday("2020-01-26", "설날")
						,new Holiday("2020-01-27", "설날대체휴일")
						,new Holiday("2020-04-30", "석가탄신일")
						,new Holiday("2020-05-01", "근로자의날")
						,new Holiday("2020-05-05", "어린이날")
						,new Holiday("2020-09-30", "추석")
						,new Holiday("2020-10-01", "추석")
						,new Holiday("2020-10-02", "추석")
						,new Holiday("2020-10-09", "한글날")
						,new Holiday("2020-12-25", "성탄절")
						,new Holiday("2021-01-01", "신정")
						,new Holiday("2021-02-11", "설날")
						,new Holiday("2021-02-12", "설날")
						,new Holiday("2021-03-01", "삼일절")
						,new Holiday("2021-05-05", "어린이날")
						,new Holiday("2021-05-19", "석가탄신일")
						,new Holiday("2021-09-20", "추석")
						,new Holiday("2021-09-21", "추석")
						,new Holiday("2021-09-22", "추석")
						,new Holiday("2022-01-31", "설날")
						,new Holiday("2022-02-01", "설날")
						,new Holiday("2022-02-02", "설날")
						,new Holiday("2022-03-01", "삼일절")
						,new Holiday("2022-05-05", "어린이날")
						,new Holiday("2022-06-06", "현충일")
						,new Holiday("2022-08-15", "광복절")
						,new Holiday("2022-09-09", "추석")
						,new Holiday("2022-09-12", "추석대체휴일")
						,new Holiday("2022-10-03", "개천절")];
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
  	  if (this.BREAK_DAY + value >= 0 && this.BREAK_DAY + value <= 15){
  	  	this.BREAK_DAY += value;
  	  }else{
  	    this.PresentToast("휴가 일수는 0과 15 사이여야 합니다.")
  	  }
  	}else if (target == 2){
  	  if (this.MIN_TRAVEL_DAY + value >= 3 && this.MIN_TRAVEL_DAY + value <= 20){
  	    this.MIN_TRAVEL_DAY += value;
  	  }else{
  	  	this.PresentToast("최소 여행일수는 3과 20 사이여야 합니다.")
  	  }
  	}else if (target == 3){
  	  if (this.START_YEAR + value >= 2017 && this.START_YEAR + value <= 2022){
  	  	this.START_YEAR += value;
  	  }else{
  	  	this.PresentToast("2017년~2022년 결과만 검색됩니다.");
  	  }
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

  	let loading = this.loadingCtrl.create({
      content: '검색 중입니다...'
    });

  	loading.present().then(() => {
  		this.FindStart(new Date(String(this.START_YEAR).concat("-01-01")), new Date(String(this.START_YEAR).concat("-12-31")));
  	})

  	loading.dismiss();

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
    var lastDate: Date;
    var dayDetail: string;
    var detailList: string[];
    var holidayList: Holiday[];

    do {

      straightNum = 0;
      breakLeft = this.BREAK_DAY;
      breakList = [];
      targetDate = new Date(checkStartDate);
      lastDate = new Date(checkStartDate);
      dayDetail = "";
      detailList = [];
      holidayList = [];

      do {
    		dayDetail = this.IsHoliday(targetDate);
    		if (this.IsWeekend(targetDate)){
    		  straightNum += 1;
          holidayList.push(new Holiday(targetDate.toISOString().substring(0,10), "주말"));
    		  targetDate.setDate(targetDate.getDate() + 1);
    		}else if (dayDetail != ""){
      	  straightNum += 1;
      	  if (detailList.indexOf(dayDetail) == -1) detailList.push(dayDetail);
          holidayList.push(new Holiday(targetDate.toISOString().substring(0,10), dayDetail));
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else if (breakLeft > 0){
      	  straightNum += 1;
      	  breakLeft -= 1;
      	  breakList.push(targetDate.toISOString().substring(0,10));
          holidayList.push(new Holiday(targetDate.toISOString().substring(0,10), "휴가사용"));
      	  targetDate.setDate(targetDate.getDate() + 1);
      	}else{
      	  if (straightNum >= this.MIN_TRAVEL_DAY){
            lastDate.setDate(checkStartDate.getDate() + straightNum - 1);
      	  	this.TRAVEL_DAY_LIST.push(
                new TravelDay(
                    checkStartDate.toISOString().substring(0,10)
  	  							, lastDate.toISOString().substring(0,10)
  	  							, straightNum
  	  							, breakList
  	  							, detailList
                    , holidayList
                )
            );
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

  IsWeekend(targetDate:Date){
  	//var targetDateStr:string = targetDate.toISOString().substring(0,10);
  	if (targetDate.getDay() == 0){
  		return "일요일";
  	} else if (targetDate.getDay() == 6){
  		return "토요일";
  	} else{
  		return "";
  	}
  }

  IsHoliday(targetDate:Date){
  	var targetDateStr:string = targetDate.toISOString().substring(0,10);
  	//if (targetDate.getDay() == 0 || targetDate.getDay() == 6){
  	//	return "주말"
  	//}

  	for (let holiday of this.HOLIDAY_LIST){
  		if (holiday.DATE == targetDateStr){
  			return holiday.DETAIL;
  		}
  	}
  	return "";
  }

  ItemDetail(idx:number){
  	console.log(this.TRAVEL_DAY_LIST[idx]);
  	console.log(this.TRAVEL_DAY_LIST[idx].BREAK_LIST);
  	
  	/*let alert = this.alertCtrl.create({
      title: '상세정보',
      message: '여행다녀오세요~',
      buttons: ['OK']
    });
    alert.present();
    */
    this.navCtrl.push(CalendarAlert, {travel_day: this.TRAVEL_DAY_LIST[idx]});
  }

  ItemDelete(idx:number){
  	this.TRAVEL_DAY_LIST.splice(idx,1);
  }

  ItemSorting(){
  	if(this.ORDER_BY == 1){
  		this.TRAVEL_DAY_LIST.sort((a,b)=>this.Datestring2Number(a.START_DATE)-this.Datestring2Number(b.START_DATE));
  	} else if (this.ORDER_BY == 2){
  		this.TRAVEL_DAY_LIST.sort((a,b)=>b.TRAVEL_DAY-a.TRAVEL_DAY);
  	}
  }
  
  Datestring2Number(ds:string){
  	return Number(new Date(ds));
  }


}