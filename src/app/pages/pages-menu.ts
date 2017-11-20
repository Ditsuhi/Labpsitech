import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    link: '/pages/maps/leaflet',
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    link: '/pages/charts/d3',
    children: [
    {
      title: 'Echarts',
      link: '/pages/charts/echarts',
    },
    {
      title: 'Charts.js',
      link: '/pages/charts/chartjs',
    },
    {
      title: 'D3',
      link: '/pages/charts/d3',
    },
  ],
  },
  {
    title: 'Users List',
    icon: 'nb-tables',
    link: '/pages/tables/smart-table',
  },
];
