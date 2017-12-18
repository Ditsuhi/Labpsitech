import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';

const gg = [
  {
    'name': 'Germany',
    'series': [
      {
        'name': '2010',
        'value': 40632
      },
      {
        'name': '2000',
        'value': 36953
      },
      {
        'name': '1990',
        'value': 31476
      }
    ]
  },
  {
    'name': 'United States',
    'series': [
      {
        'name': '2010',
        'value': 49737
      },
      {
        'name': '2000',
        'value': 45986
      },
      {
        'name': '1990',
        'value': 37060
      }
    ]
  },
  {
    'name': 'France',
    'series': [
      {
        'name': '2010',
        'value': 36745
      },
      {
        'name': '2000',
        'value': 34774
      },
      {
        'name': '1990',
        'value': 29476
      }
    ]
  },
  {
    'name': 'United Kingdom',
    'series': [
      {
        'name': '2010',
        'value': 36240
      },
      {
        'name': '2000',
        'value': 32543
      },
      {
        'name': '1990',
        'value': 26424
      }
    ]
  }
];
const single = [
  {
    'name': 'Germany',
    'value': 8940000
  },
  {
    'name': 'USA',
    'value': 5000000
  },
  {
    'name': 'France',
    'value': 7200000
  }
];

const multi = [
  {
    'name': 'Germany',
    'series': [
      {
        'name': '2010',
        'value': 7300000
      },
      {
        'name': '2011',
        'value': 8940000
      }
    ]
  },

  {
    'name': 'USA',
    'series': [
      {
        'name': '2010',
        'value': 7870000
      },
      {
        'name': '2011',
        'value': 8270000
      }
    ]
  },

  {
    'name': 'France',
    'series': [
      {
        'name': '2010',
        'value': 5000002
      },
      {
        'name': '2011',
        'value': 5800000
      }
    ]
  }
];

@Component({
  selector: 'ngx-my-charts-bar-vertical-normalized',
  template: `
    <ngx-charts-bar-horizontal-normalized
    [results]="multi">
  </ngx-charts-bar-horizontal-normalized>
  `
})
export class NormalizedBarVerticalComponent {
  // single: any[];
  multi = multi;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    // Object.assign(this, {multi})
  }

  onSelect(event) {
    console.log(event);
  }

}
