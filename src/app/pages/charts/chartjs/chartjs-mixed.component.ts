import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-chartjs-bar-line',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsMixedComponent implements OnDestroy {
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

      this.userService.getUserExpTime(currentUser).subscribe((exps) => {
        const labels: any[] = [],
          distIn: any[] = [],
          distOut: any[] = [];
        exps.forEach((exp) => {
          labels.push(exp.experimentDate);
          distOut.push(exp.totalDistanceOutside);
          distIn.push(exp.totalDistanceInside);
        });
        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Distance Outside',
              data: distOut,
              backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8),
            }
          ],
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
