// import { AfterViewInit, Component, OnDestroy } from '@angular/core';
// import { NbThemeService } from '@nebular/theme';
// import { UserService } from '../../../@core/data/user.service';
// import { Utils } from '../../../helpers/utils';
//
// @Component({
//   selector: 'ngx-echarts-area-stack',
//   template: `
//     <div echarts [options]="options" class="echart"></div>
//   `,
// })
// export class EchartsAreaStackComponent implements AfterViewInit, OnDestroy {
//   options: any = {};
//   themeSubscription: any;
//
//   constructor(private theme: NbThemeService,
//               private userService: UserService) {}
//
//   ngAfterViewInit() {
//     const labels: any[] = [],
//       dataInside: any[] = [],
//       dataOutside: any[] = [];
//     const currentUser = localStorage.getItem('selectedUser');
//     this.userService.getUserExpTime(currentUser).subscribe((exps) => {
//       exps.forEach((exp) => {
//         const timeIn = Utils.getTime(exp.totalTimeInside);
//         const timeOut = Utils.getTime(exp.totalTimeOutside);
//         labels.push(exp.experimentDate);
//         dataInside.push(exp.totalTimeInside);
//         dataOutside.push(exp.totalTimeOutside);
//       });
//       this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
//
//         const colors: any = config.variables;
//         const echarts: any = config.variables.echarts;
//
//         this.options = {
//           backgroundColor: echarts.bg,
//           color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
//           tooltip: {
//             formatter: function (params) {
//               let res = '';
//               for (let i = 0, l = params.length; i < l;  i++) {
//                 res +=  params[i].seriesName + ' : ' + Utils.getTime(params[i].value) + '<br/>';
//               }
//               return res;
//             },
//           trigger: 'axis',
//             axisPointer: {
//               type: 'cross',
//               label: {
//                 backgroundColor: echarts.tooltipBackgroundColor,
//               },
//             },
//           },
//           legend: {
//             data: ['Time Inside', 'Time Outside'],
//             textStyle: {
//               color: echarts.textColor,
//             },
//           },
//           grid: {
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true,
//           },
//           xAxis: [
//             {
//               nameTextStyle: {
//                 color: '#323232',
//               },
//               name: 'Experiment Date',
//               nameLocation: 'middle',
//               type: 'category',
//               boundaryGap: false,
//               data: labels,
//               axisTick: {
//                 alignWithLabel: true,
//               },
//               axisLine: {
//                 lineStyle: {
//                   color: echarts.axisLineColor,
//                 },
//               },
//               axisLabel: {
//                 textStyle: {
//                   color: echarts.textColor,
//                 },
//               },
//             },
//           ],
//           yAxis: [
//             {
//               nameTextStyle: {
//                 color: '#323232',
//               },
//               name: 'Hours',
//               nameRotate: 90,
//               nameLocation: 'middle',
//               nameGap: 60,
//               type: 'value',
//               axisLine: {
//                 lineStyle: {
//                   color: echarts.axisLineColor,
//                 },
//               },
//               splitLine: {
//                 lineStyle: {
//                   color: echarts.splitLineColor,
//                 },
//               },
//               axisLabel: {
//                 formatter: function(value) {return Utils.getTime(value)},
//                 textStyle: {
//                   color: echarts.textColor,
//                 },
//               },
//             },
//           ],
//           series: [
//             {
//               name: 'Time Inside',
//               type: 'line',
//               stack: 'Total amount',
//               areaStyle: { normal: { opacity: echarts.areaOpacity } },
//               data: dataInside,
//             },
//             {
//               name: 'Time Outside',
//               type: 'line',
//               stack: 'Total amount',
//               areaStyle: { normal: { opacity: echarts.areaOpacity } },
//               data: dataOutside,
//             },
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
