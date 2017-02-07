export class TravelDay {
  START_DATE: string;
  END_DATE: string;
  TRAVEL_DAY: number;
  BREAK_LIST: string[];
  DETAIL_LIST: string[];

  constructor(start_date: string, end_date: string, travel_day: number, break_list: string[], detail_list: string[]) {
  	this.START_DATE = start_date;
  	this.END_DATE = end_date;
  	this.TRAVEL_DAY = travel_day;
  	this.BREAK_LIST = break_list;
  	this.DETAIL_LIST = detail_list;
  }
}