import { Component,  OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LeafletService } from '../../maps/leaflet/leaflet.service';

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

  constructor(private theme: NbThemeService, private leafletService: LeafletService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['January'],
        datasets: [
          //   {
          //   label: 'dataset - big points',
          //   data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          //   borderColor: colors.primary,
          //   backgroundColor: colors.primary,
          //   fill: false,
          //   borderDash: [5, 5],
          //   pointRadius: 8,
          //   pointHoverRadius: 10,
          // }, {
          //   label: 'dataset - individual point sizes',
          //   data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          //   borderColor: colors.dangerLight,
          //   backgroundColor: colors.dangerLight,
          //   fill: false,
          //   borderDash: [5, 5],
          //   pointRadius: 8,
          //   pointHoverRadius: 10,
          // },
          {
            label: 'dataset - large pointHoverRadius',
            data: [],
            borderColor: colors.info,
            backgroundColor: colors.info,
            fill: false,
            // pointRadius: 8,
            pointHoverRadius: 10,
          }, {
            label: 'dataset - large pointHitRadius',
            data: [],
            borderColor: colors.success,
            backgroundColor: colors.success,
            fill: false,
            // pointRadius: 8,
            pointHoverRadius: 10,
          }],
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
                labelString: 'Month',
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
                display: true,
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
    });
    const currentUser = JSON.parse(localStorage.getItem('selectedUser'));
    this.leafletService.getUsersConfigData(currentUser)
      .subscribe((result) => {

        this.timeInOut = [
          { name: 'Inside', value: result.timeInside },
          { name: 'Outside', value: result.timeOutside },
        ];
        this.data.datasets[0].data.push(result.timeInside);
        this.data.datasets[1].data.push(result.timeOutside);
        console.log(this.timeInOut);
      })
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
