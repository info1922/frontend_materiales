import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  View,
  MonthAgendaService, DayService,
  WeekService, WorkWeekService,
  MonthService, AgendaService, TimelineViewsService, TimelineMonthService
 } from '@syncfusion/ej2-angular-schedule';
import { loadCldr, L10n} from '@syncfusion/ej2-base';
declare var require: any;

loadCldr(
  require('../../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../../../../node_modules/cldr-data/main/es-MX/ca-gregorian.json'),
  require('../../../../../node_modules/cldr-data/main/es-MX/numbers.json'),
  require('../../../../../node_modules/cldr-data/main/es-MX/timeZoneNames.json'));

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,
  MonthAgendaService, TimelineViewsService, TimelineMonthService],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  constructor() { }
  public fecha = new Date();
  public anio = this.fecha.getFullYear();
  public mes = this.fecha.getMonth();
  public dia = this.fecha.getDate();
  public selectedDate: Date = new Date(this.anio, this.mes, this.dia);
  public eventSettings: EventSettingsModel = {dataSource:  <Object[]>extend([], scheduleData, null, true)};
  public currentView: View = 'MonthAgenda';

  ngOnInit(): void {
    this.hola();
    L10n.load({
      'es-MX': {
        'calendar': {today: 'Hoy'}
      }
    });
  }

  hola() {
    console.log('Hola');
    console.log(this.eventSettings);
  }

}
