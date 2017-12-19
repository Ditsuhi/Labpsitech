import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsTimeComponent implements OnDestroy {
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
        // tooltips: {
        //   callbacks: {
        //     label: function(tooltipItem, data) {
        //       return Utils.getTime(data);
        //       }
        //   }
        // },
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
          dataInside: any[] = [],
          dataOutside: any[] = [];
        exps.forEach((exp) => {
          const gg = Utils.getTime(7000);
          labels.push(exp.experimentDate);
          dataInside.push(exp.totalTimeInside);
          dataOutside.push(exp.totalTimeOutside);
        });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Time Outside',
              data: dataOutside,
              backgroundColor: NbColorHelper.hexToRgbA(colors.success, 0.8),
            },
            {
              label: 'Time Inside',
              data: dataInside,
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
