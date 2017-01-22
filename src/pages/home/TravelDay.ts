export class TravelDay {
  START_DATE: string;
  END_DATE: string;
  TRAVEL_DAY: number;

  constructor(start_date: string, end_date: string, travel_day: number) {
  	this.START_DATE = start_date;
  	this.END_DATE = end_date;
  	this.TRAVEL_DAY = travel_day;
  }
}