import { Injectable } from '@angular/core';

const config = {
  dd: 'https://metrics-api.geotecuji.org/api/v1/metrics-data/app-36437104577c4432/calculateMetrics?application=app-36437104577c4432&user=admin&session=session2',
  apiUrl: 'https://metrics-api.geotecuji.org/api/v1',
  appId: 'app-36437104577c4432',
  calcMtrxUrl: 'https://metrics-api.geotecuji.org/api/v1/metrics-data/app-36437104577c4432/calculateMetrics',
};

export const configObject = config;

@Injectable()
export class ConfigService {
  public configValues: any;
  constructor() {
    this.configValues = Object.assign({}, config);
  }
}

