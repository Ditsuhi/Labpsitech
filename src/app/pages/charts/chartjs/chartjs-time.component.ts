// import { Component, OnDestroy } from '@angular/core';
// import { NbThemeService, NbColorHelper } from '@nebular/theme';
// import { UserService } from '../../../@core/data/user.service';
// import { Utils } from '../../../helpers/utils';
//
// @Component({
//   selector: 'ngx-chartjs-pie',
//   template: `
//     <chart type="bar" [data]="data" [options]="options"></chart>
//   `,
// })
// export class ChartjsTimeComponent implements OnDestroy {
//
//   public model: any = {
//     start: {year: 2017, month: 9, day: 25},
//     end: {year: 2017, month: 9, day: 28}
//   };
//   data: any;
//   options: any;
//   themeSubscription: any;
//
//   constructor(private theme: NbThemeService, private userService: UserService) {
//     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
//
//       const colors: any = config.variables;
//       const chartjs: any = config.variables.chartjs;
//
//       this.options = {
//         tooltips: {
//           enabled: true,
//           mode: 'single',
//           callbacks: {
//             label: function(tooltipItem, data) {
//               const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
//               return Utils.getTime(datasetLabel) ;
//             }
//           }
//         },
//         maintainAspectRatio: false,
//         responsive: true,
//         legend: {
//           labels: {
//             fontColor: chartjs.textColor,
//           },
//         },
//         scales: {
//           xAxes: [
//             {
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Experiment Day'
//               },
//               // barPercentage: 0.5 ,
//               gridLines: {
//                 display: false,
//                 color: chartjs.axisLineColor,
//               },
//               ticks: {
//                 fontColor: chartjs.textColor,
//               },
//             },
//           ],
//           yAxes: [
//             {
//               scaleLabel: {
//                 display: true,
//                 labelString: 'Hours'
//               },
//               gridLines: {
//                 display: true,
//                 color: chartjs.axisLineColor,
//               },
//               ticks: {
//                 callback: (v) => Utils.getTime(v),
//                 stepSize: 7200,
//                 max: 86400,
//                 fontColor: chartjs.textColor,
//               },
//             },
//           ],
//         },
//       };
//       const currentUser = localStorage.getItem('selectedUser');
//
//       this.userService.getUserCalendarTime(currentUser, this.model).subscribe((exps) => {
//         const labels: any[] = [],
//           dataInside: any[] = [],
//           dataOutside: any[] = [];
//         exps.forEach((exp) => {
//           const gg = Utils.getTime(7000);
//           labels.push(exp.experimentDate);
//           dataInside.push(exp.totalTimeInside);
//           dataOutside.push(exp.totalTimeOutside);
//         });
//
//         this.data = {
//           labels: labels,
//           datasets: [
//             {
//               label: 'Time Outside',
//               data: dataOutside,
//               backgroundColor: NbColorHelper.hexToRgbA(colors.success, 0.8),
//             },
//             {
//               label: 'Time Inside',
//               data: dataInside,
//               backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
//             }
//           ],
//         };
//       });
//     });
//   }
//
//   ngOnDestroy(): void {
//     this.themeSubscription.unsubscribe();
//   }
// }
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import { Utils } from '../../../helpers/utils';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsTimeComponent implements OnDestroy, OnChanges {
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
      timeIn: {
        label: 'Time Inside Morning',
        type: 'line',
        borderDash: [5, 5],
        data: null,
        borderColor: '#4ca6ff',
        backgroundColor: null
      },
      timeOut: {
        label: 'Time Outside Morning',
        type: 'line',
        data: null,
        borderColor: '#4ca6ff',
        backgroundColor: null,
      }
    },
    '8-16': {
      timeIn: {
        label: 'Time Inside Afternoon',
        type: 'line',
        borderDash: [5, 5],
        data: null,
        borderColor: '#ff4c6a',
        backgroundColor: null
      },
      timeOut: {
        label: 'Time Outside Afternoon',
        type: 'line',
        data: null,
        borderColor: '#ff4c6a',
        backgroundColor: null,
      },
    },
    '16-24':  {
      timeIn: {
        label: 'Time Inside Evening',
        type: 'line',
        borderDash: [5, 5],
        data: null,
        borderColor: '#ffa100',
        backgroundColor: null,
      },
      timeOut: {
        label: 'Time Outside Evening',
        type: 'line',
        data: null,
        borderColor: '#ffa100',
        backgroundColor: null,
      }
    },
  };

  constructor(private theme: NbThemeService, private userService: UserService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.colors = colors;
      this.chartjs = chartjs;
      this.options = {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function(tooltipItem, data) {
              const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return Utils.getTime(datasetLabel) ;
            }
          }
        },
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
              // barPercentage: 0.5 ,
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
                labelString: 'Hours'
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                callback: (v) => Utils.getTime(v),
                stepSize: 7200,
                max: 86400,
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
      const currentUser = localStorage.getItem('selectedUser');

      _.mapObject(this.batchValue, (val) => {
        val.timeIn.backgroundColor = NbColorHelper.hexToRgbA(this.colors.primaryLight, 0);
        val.timeOut.backgroundColor = NbColorHelper.hexToRgbA(this.colors.primaryLight, 0);
      });
      this.ngInit(currentUser, this.range, this.batch)
    });
  }

  ngInit(currentUser, range, batch) {

    this.userService.getUserCalendarTime(currentUser, range).subscribe((exps) => {
      const labels: any[] = [],
      dataInside: any[] = [],
      dataOutside: any[] = [];
      exps.forEach((exp) => {
        labels.push(exp.experimentDate);
        dataInside.push(exp.totalTimeInside);
        dataOutside.push(exp.totalTimeOutside);
      });

      this.userService.getBatchCalendar(currentUser, '0-8').subscribe((dada) => {
        const timeInsideMorning: any[] = [],
              timeOutsideMorning: any[] = [];
        dada.forEach((exp) => {
          timeInsideMorning.push(exp.totalTimeInside);
          timeOutsideMorning.push(exp.totalTimeOutside);
        });
        this.batchValue['0-8'].timeIn.data = timeInsideMorning;
        this.batchValue['0-8'].timeOut.data = timeOutsideMorning;

        this.userService.getBatchCalendar(currentUser, '8-16').subscribe((daa) => {
          const timeInsideAfternoon: any[] = [],
                timeOutsideAfternoon: any[] = [];
          daa.forEach((exp) => {
            timeInsideAfternoon.push(exp.totalTimeInside);
            timeOutsideAfternoon.push(exp.totalTimeOutside);
          });
          this.batchValue['8-16'].timeIn.data = timeInsideAfternoon;
          this.batchValue['8-16'].timeOut.data = timeOutsideAfternoon;

          this.userService.getBatchCalendar(currentUser, '16-24').subscribe((da) => {
            const timeInsideEvening: any[] = [],
                  timeOutsideEvening: any[] = [];
            da.forEach((exp) => {
              timeInsideEvening.push(exp.totalTimeInside);
              timeOutsideEvening.push(exp.totalTimeOutside);
            });
            this.batchValue['16-24'].timeIn.data = timeInsideEvening;
            this.batchValue['16-24'].timeOut.data = timeOutsideEvening;

            this.data = {
              labels: labels,
              datasets: [
              {
                label: 'Time Outside',
                data: dataOutside,
                backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.8),
              },
              {
                label: 'Time Inside',
                data: dataInside,
                backgroundColor: NbColorHelper.hexToRgbA(this.colors.infoLight, 0.8),
              }
              ],
            };

            const bValue = [];
            if (batch === '0-24') {
              const bMap = _.map(_.values(this.batchValue), (val) => {
                return _.values(val);
              });
              bValue.push(..._.union(...bMap));
            }  else {
              bValue.push(this.batchValue[batch].timeIn);
              bValue.push(this.batchValue[batch].timeOut)
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
