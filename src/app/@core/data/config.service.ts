import { Injectable } from '@angular/core';

const config = {
  apiUrl: 'https://metrics-api.geotecuji.org/api/v1',
  appId: 'app-36437104577c4432',
};

export const configObject = config;

@Injectable()
export class ConfigService {
  public configValues: any;
  constructor() {
    this.configValues = Object.assign({}, config);
  }
}

