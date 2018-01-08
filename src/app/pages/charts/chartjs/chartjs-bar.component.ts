import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private userService: UserService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

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
      console.log('selectedUser', this.userService.selectedUser);

      this.userService.getUserExpTime(currentUser).subscribe((exps) => {
        const labels: any[] = [],
          distIn: any[] = [],
          distOut: any[] = [];
        exps.forEach((exp) => {
          labels.push(exp.experimentDate + 1);
          distOut.push(exp.totalDistanceOutside);
          distIn.push(exp.totalDistanceInside);
        });

        this.userService.getBatchDistance(currentUser, '0-8').subscribe((dada) => {
          const distanceMorning: any[] = [];
          dada.forEach((exp) => {
            distanceMorning.push(exp.totalDistanceOutside);
          });
          this.userService.getBatchDistance(currentUser, '8-16').subscribe((daa) => {
            const distanceAfternoon: any[] = [];
            daa.forEach((exp) => {
              distanceAfternoon.push(exp.totalDistanceOutside);
            });
            this.userService.getBatchDistance(currentUser, '16-24').subscribe((da) => {
              const distanceEvening: any[] = [];
              da.forEach((exp) => {
                distanceEvening.push(exp.totalDistanceOutside);
              });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Distance Outside',
              data: distOut,
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            },
            {
              label: 'Distance Morning',
              type: 'line',
              data: distanceMorning,
              borderColor: '#4ca6ff',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
            },
            {
              label: 'Distance Afternoon',
              type: 'line',
              data: distanceAfternoon,
              borderColor: '#ff4c6a',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
            },
            {
              label: 'Distance Evening',
              type: 'line',
              data: distanceEvening,
              borderColor: '#8a7fff',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0),
            },
          ],
        };
          });
        });
      });
    });
  });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
