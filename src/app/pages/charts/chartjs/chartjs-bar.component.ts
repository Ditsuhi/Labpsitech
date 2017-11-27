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
        console.log('selectedUser', this.userService.selectedUser);

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
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            },
            {
              label: 'Distance Inside',
              data: distIn,
              backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
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
