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

    const currentUser = JSON.parse(localStorage.getItem('selectedUser'));
    // const currentUser = JSON.parse(localStorage.getItem('selectedUser')).user;
    // const expDate = JSON.parse(localStorage.getItem('selectedUser')).experimentDate;
    // const newBatch = JSON.parse(localStorage.getItem('selectedUser')).batch;
    //  console.log(currentUser);
    //  console.log(expDate);
    //  console.log(newBatch);
  this.leafletService.getUsersConfigData(currentUser)
    .subscribe((result) => {
       console.log(result.maxTimeConsecutiveOutside);
      this.maxTimeConsecutive = [
          { name: 'Inside', value: result.maxTimeConsecutiveInside },
          { name: 'Outside', value: result.maxTimeConsecutiveOutside },
        ];
        this.timeInOut = [
          { name: 'Inside', value: result.timeInside },
          { name: 'Outside', value: result.timeInside },
        ];
        this.timeMinMax = [
          { name: 'Min', value: result.min_time },
          { name: 'Max', value: result.max_time },
        ];
        this.countInOut = [
          { name: 'Enter', value: result.countEntering },
          { name: 'Exit', value: result.countExiting },
        ];
        this.speedMinMax = [
          { name: 'Min', value: result.minSpeed },
          { name: 'Max', value: result.maxSpeed },
        ];
        this.distance = [
          { name: 'Inside', value: result.totalDistanceInside },
          { name: 'Outside', value: result.totalDistanceOutside },
          { name: 'Total', value: result.totalDistance },
        ];
        this.countLoc = [
          { name: 'Inside', value: result.countLocationsInside },
          { name: 'Outside', value: result.countLocationsOutside },
          { name: 'Total', value: result.countLocations },
        ]
   })
  }
}
