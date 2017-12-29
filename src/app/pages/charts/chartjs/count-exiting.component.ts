import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-chartjs-radar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class CountExitingComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private userService: UserService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      // //
      // this.data = {
      //   labels: [],
      //   datasets: [{
      //     data: [],
      //     label: 'Series A',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
      //   }, {
      //     data: [],
      //     label: 'Series B',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
      //   }],
      // };

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
                labelString: 'ExperimentDate'
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
      console.log('selectedUser', this.userService.selectedUser);

      this.userService.getBatchExiting(currentUser, '0-8').subscribe((data) => {
        const labels: any[] = [],
          exitMorning: any[] = [];
        data.forEach((exp) => {
          labels.push(exp.experimentDate);
          exitMorning.push(exp.countExiting);
        });
        this.userService.getBatchExiting(currentUser, '8-16').subscribe((dada) => {
          const exitAfternoon: any[] = [];
          dada.forEach((exp) => {
            exitAfternoon.push(exp.experimentDate);
          });
          this.userService.getBatchExiting(currentUser, '16-24').subscribe((dada) => {
            const exitEvening: any[] = [];
            dada.forEach((exp) => {
              exitEvening.push(exp.experimentDate);
            });
            this.userService.getUserExpTime(currentUser).subscribe((exps) => {
              const totalExit: any[] = [];
              exps.forEach((exp) => {
                totalExit.push(exp.totalCountExiting);
              });

              // this.userService.getUserExpTime(currentUser).subscribe((exps) => {
              //   const labels: any[] = [],
              //     distIn: any[] = [],
              //     distOut: any[] = [];
              //   exps.forEach((exp) => {
              //     labels.push(exp.experimentDate);
              //     distOut.push(exp.totalDistanceOutside);
              //     distIn.push(exp.totalDistanceInside);
              //   });

              this.data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Total Exiting',
                    data: totalExit,
                    backgroundColor: NbColorHelper.hexToRgbA(colors.success, 0.8),
                  },
                  {
                    label: 'Exiting Morning',
                    type: 'line',
                    data: exitMorning,
                    borderColor: '#4ca6ff',
                    backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
                  },
                  {
                    label: 'Exiting Afternoon',
                    type: 'line',
                    data: exitAfternoon,
                    borderColor: '#ff4c6a',
                    backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
                  },
                  {
                    label: 'Exiting Evening',
                    type: 'line',
                    data: exitEvening,
                    borderColor: '#8a7fff',
                    backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
                  },
                ],
              };
            });
          });
        });
      });
      // });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
