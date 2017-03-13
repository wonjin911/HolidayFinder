export class Event {
  starts: Date;
  ends: Date;
  title: string;

  constructor(starts: Date, ends: Date, title: string) {
  	this.starts = starts;
  	this.ends = ends;
  	this.title = title;
  }
}