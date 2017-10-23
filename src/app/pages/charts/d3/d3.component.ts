import { Component, OnInit } from '@angular/core';
import { LeafletService } from '../../maps/leaflet/leaflet.service';

@Component({
  selector: 'ngx-d3',
  styleUrls: ['./d3.component.scss'],
  templateUrl: './d3.component.html',
})
export class D3Component implements OnInit {

  maxTimeConsecutive = [];
  timeInOut = [];
  timeMinMax = [];
  speedMinMax = [];
  countInOut = [];
  distance = [];
  countLoc = [];
  constructor(private leafletService: LeafletService) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('selectedUser');
    this.leafletService.getUsersConfigData(currentUser)
      .subscribe((result) => {
        console.log(result);
        this.maxTimeConsecutive = [
          { name: 'Inside', value: result.baseline },
          { name: 'Outside', value: result.radius },
        ];
        this.timeInOut = [
          { name: 'Inside', value: result.baseline },
          { name: 'Outside', value: result.radius },
        ];
        this.timeMinMax = [
          { name: 'Min', value: result.baseline },
          { name: 'Max', value: result.radius },
        ];
        this.countInOut = [
          { name: 'Enter', value: result.baseline },
          { name: 'Exist', value: result.radius },
        ];
        this.speedMinMax = [
          { name: 'Min', value: result.baseline },
          { name: 'Max', value: result.radius },
        ];
        this.distance = [
          { name: 'Inside', value: result.baseline },
          { name: 'Outside', value: result.radius },
          { name: 'Total', value: result.radius + result.baseline },
        ];
        this.countLoc = [
          { name: 'Inside', value: result.baseline },
          { name: 'Outside', value: result.radius },
          { name: 'Total', value: result.radius + result.baseline },
        ]
      })
  }
}
