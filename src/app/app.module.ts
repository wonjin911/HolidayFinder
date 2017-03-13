import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { CalendarAlert } from '../pages/calendar-alert/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarModule } from 'angular-calendar';
import { IonCalendarComponent } from '../components/ion-calendar/ion-calendar';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CalendarAlert,
    HomePage,
    TabsPage,
    IonCalendarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CalendarAlert,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
