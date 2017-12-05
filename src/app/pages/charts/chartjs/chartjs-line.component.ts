import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private userService: UserService
  ) {
    let colors: any,
      chartjs: any;
    const currentUser = localStorage.getItem('selectedUser');
    console.log('selectedUser', this.userService.selectedUser);

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      colors = config.variables;
      chartjs = config.variables.chartjs;

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
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
          yAxes: [
            {
              scaleLabel : '<%= Number(value).toFixed(2).replace(\'.\', \',\') + \' $\'%>',
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
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };

    });

      this.userService.getUserExpTime(currentUser).subscribe((exps) => {
        const labels: any[] = [],
          dataInside: any[] = [],
          dataOutside: any[] = [];
        exps.forEach((exp) => {
          const timeIn = Utils.getTime(exp.totalTimeInside);
          const timeOut = Utils.getTime(exp.totalTimeOutside);
          labels.push(exp.experimentDate);
          dataInside.push(timeIn);
          dataOutside.push(timeOut);
        });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Inside',
              data: dataInside,
              borderColor: colors.primary,
              backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            }, {
              label: 'Outside',
              data: dataOutside,
              borderColor: colors.danger,
              backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
            }
          ],
        };
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
