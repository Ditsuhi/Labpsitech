import { Component, OnInit } from '@angular/core';
import { LeafletService } from '../../maps/leaflet/leaflet.service';

@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})
export class ChartjsComponent implements OnInit {

  timeInOut: any[] = [];

  constructor(private leafletService: LeafletService) {}

  ngOnInit() {

    const currentUser = localStorage.getItem('selectedUser');
    this.leafletService.getUsersConfigData(currentUser)
      .subscribe((result) => {

        this.timeInOut = [
          { name: 'Inside', value: result.timeInside },
          { name: 'Outside', value: result.timeOutside },
        ];
    })
  }
}
