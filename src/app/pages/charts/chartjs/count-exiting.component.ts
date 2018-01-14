import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import * as _ from 'underscore';


@Component({
  selector: 'ngx-chartjs-radar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class CountExitingComponent implements OnDestroy, OnChanges {
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
      label: 'Exiting Morning',
      type: 'line',
      data: null,
      borderColor: '#4ca6ff',
      backgroundColor: null,
    },
    '8-16': {
      label: 'Exiting Afternoon',
      type: 'line',
      data: null,
      borderColor: '#ff4c6a',
      backgroundColor: null,
    },
    '16-24':  {
      label: 'Exiting Evening',
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
                labelString: 'Exiting'
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                userCallback: function(label) {
                  if (Math.trunc(label) === label) {
                    return label;
                  }
                },
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
        totalExit: any[] = [];
      exps.forEach((exp) => {
        labels.push(exp.experimentDate);
        totalExit.push(exp.totalCountExiting);
      });

      this.userService.getBatchCalendar(currentUser, '0-8').subscribe((dada) => {
        const exitMorning: any[] = [];
        dada.forEach((exp) => {
          exitMorning.push(exp.totalCountExiting);
        });
        this.batchValue['0-8'].data = exitMorning;

        this.userService.getBatchCalendar(currentUser, '8-16').subscribe((daa) => {
          const exitAfternoon: any[] = [];
          daa.forEach((exp) => {
            exitAfternoon.push(exp.totalCountExiting);
          });
          this.batchValue['8-16'].data = exitAfternoon;
          this.userService.getBatchCalendar(currentUser, '16-24').subscribe((da) => {
            const exitEvening: any[] = [];
            da.forEach((exp) => {
              exitEvening.push(exp.totalCountExiting);
            });
            this.batchValue['16-24'].data = exitEvening;
            this.data = {
              labels: labels,
              datasets: [
                {
                  label: 'Total Exiting',
                  data: totalExit,
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
    this.ngInit(currentUser, this.range, this.batch)
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
