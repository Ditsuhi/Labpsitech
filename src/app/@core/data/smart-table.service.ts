import { Injectable } from '@angular/core';

@Injectable()
export class SmartTableService {

  data: any[];
  constructor() {}

  getData() {
    return this.data;
  }
}
