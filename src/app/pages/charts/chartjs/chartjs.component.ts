import { Component, OnInit } from '@angular/core';
import { LeafletService } from '../../maps/leaflet/leaflet.service';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsComponent implements OnInit {
  public myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showSelectDateText: true,
    height: '34px',
    selectionTxtFontSize: '14px',
    disableUntil: {year: 9999, month: 12, day: 31},
    enableDates: [],
  };
  public model: any;
  batch = ['0-24', '0-8', '8-16', '16-24'];
  batchValue: string = this.batch[0];

  currentUser: string;
  timeInOut: any[] = [];

  constructor(private leafletService: LeafletService, private userService: UserService) {
    this.currentUser = localStorage.getItem('selectedUser');
    this.userService.getTime(this.currentUser).subscribe((timeRange) => {
      timeRange.forEach((time) => {
        this.myDateRangePickerOptions.enableDates.push(time)
      });
      this.model = {
        beginDate: this.myDateRangePickerOptions.enableDates[0],
        endDate: this.myDateRangePickerOptions.enableDates[this.myDateRangePickerOptions.enableDates.length - 1]
      };
    });
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('selectedUser');
    this.leafletService.getUsersConfigData(currentUser)
      .subscribe((result) => {

        this.timeInOut = [
          { name: 'Inside', value: result.timeInside },
          { name: 'Outside', value: result.timeOutside },
        ];
    })
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    const range = {start: event.beginDate, end: event.endDate};
    this.userService.setUserTime(range);

  }

  chooseBatch() {
  }
}
