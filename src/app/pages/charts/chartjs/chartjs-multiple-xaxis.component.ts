import { Component,  OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { LeafletService } from '../../maps/leaflet/leaflet.service';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-chartjs-multiple-xaxis',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsMultipleXaxisComponent implements OnDestroy, OnInit {
  timeInOut: any[] = [];
  data: any;
  options: any;
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private userService: UserService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: [],
        datasets: [
          {
            label: 'Inside',
            data: [],
            borderColor: colors.info,
            backgroundColor: colors.info,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 10,
          }
          // , {
          //   label: 'Outside',
          //   data: [],
          //   borderColor: colors.success,
          //   backgroundColor: colors.success,
          //   fill: false,
          //   // pointRadius: 8,
          //   pointHoverRadius: 10,
          // }
          ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Experiment',
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
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
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
          dataExit: any[] = [];
        exps.forEach((exp) => {
          labels.push(exp.experimentDate);
          dataExit.push(exp.totalCountExiting);
        });

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'CountExiting',
              data: dataExit,
              borderColor: colors.success,
              backgroundColor: NbColorHelper.hexToRgbA(colors.success, 0.3),
            }
          ],
        };
      });
    });
  }

  ngOnInit() {
    console.log('GL', this.timeInOut);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
