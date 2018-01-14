import { Component, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy, OnChanges {
  @Input()
  batch: string = '0-24';
  @Input()
  range = {
    start: null,
    end: null
  };
  data: any;
  options: any;
  themeSubscription: any;
  colors: any;
  chartjs: any;
  batchValue = {
    '0-8': {
      label: 'Distance Morning',
      type: 'line',
      data: null,
      borderColor: '#4ca6ff',
      backgroundColor: null,
    },
    '8-16': {
      label: 'Distance Afternoon',
      type: 'line',
      data: null,
      borderColor: '#ff4c6a',
      backgroundColor: null,
    },
    '16-24':  {
      label: 'Distance Evening',
      type: 'line',
      data: null,
      borderColor: '#ffa100',
      backgroundColor: null,
    }
  };

  constructor(private theme: NbThemeService, private userService: UserService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.colors = colors;
      this.chartjs = chartjs;
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Experiment Day'
              },
              barPercentage: 0.5 ,
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Distance (m)'
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
      const currentUser = localStorage.getItem('selectedUser');

      _.mapObject(this.batchValue, (val) => {
        val.backgroundColor = NbColorHelper.hexToRgbA(this.colors.primaryLight, 0);
      });
      this.ngInit(currentUser, this.range, this.batch)
    });
  }

  ngInit(currentUser, range, batch) {

    this.userService.getUserCalendarTime(currentUser, range).subscribe((exps) => {
      const labels: any[] = [],
        distOut: any[] = [];
      exps.forEach((exp) => {
        labels.push(exp.experimentDate);
        distOut.push(exp.totalDistanceOutside);
      });

      this.userService.getBatchCalendar(currentUser, '0-8').subscribe((dada) => {
        const distanceMorning: any[] = [];
        dada.forEach((exp) => {
          distanceMorning.push(exp.totalDistanceOutside);
        });
        this.batchValue['0-8'].data = distanceMorning;

        this.userService.getBatchCalendar(currentUser, '8-16').subscribe((daa) => {
          const distanceAfternoon: any[] = [];
          daa.forEach((exp) => {
            distanceAfternoon.push(exp.totalDistanceOutside);
          });
          this.batchValue['8-16'].data = distanceAfternoon;
          this.userService.getBatchCalendar(currentUser, '16-24').subscribe((da) => {
            const distanceEvening: any[] = [];
            da.forEach((exp) => {
              distanceEvening.push(exp.totalDistanceOutside);
            });
            this.batchValue['16-24'].data = distanceEvening;
            this.data = {
              labels: labels,
              datasets: [
                {
                  label: 'Distance Outside',
                  data: distOut,
                  backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.8),
                },
              ],
            };
            const bValue = [];
            if (batch === '0-24') {
              bValue.push(..._.values(this.batchValue));
            }  else {
              bValue.push(this.batchValue[batch])
            }
            this.data.datasets =  _.union(this.data.datasets, bValue);

          });
        });
      });
    });
  }
  ngOnChanges() {
    const currentUser = localStorage.getItem('selectedUser');
    this.ngInit(currentUser, this.range, this.batch);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
