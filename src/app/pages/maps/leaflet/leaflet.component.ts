import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

import * as _ from 'underscore';
import 'style-loader!leaflet/dist/leaflet.css';
import { LeafletService } from './leaflet.service';
import { UserService } from '../../../@core/data/user.service';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';

const openStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '...'});
const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 20, subdomains: [ 'mt0', 'mt1', 'mt2', 'mt3']});

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  templateUrl: './leaflet.component.html',
})

export class LeafletComponent implements OnInit, OnDestroy {
  public myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showSelectDateText: true,
    height: '34px',
    selectionTxtFontSize: '14px',
    disableUntil: {year: 9999, month: 12, day: 31},
    enableDates: [],
  };
   // dateModel: IMyDateRangeModel;

  private model: any;

  polylines: any;
  currentUser: string;
  batch = ['0-8', '8-16', '16-24'];
  batchValue: string;
  labels: any[] = [];
  map: L.Map;
  latlngs = [];
  curLoc = [];
  layersControl =  {
    baseLayers: {
      'Open Street Map': openStreetMap,
      'Google Hybrid': googleHybrid,
    },
  };
  options = {
    layers: [
      openStreetMap,
    ],
    zoom: 14,
    center: L.latLng({lat: 39.983, lng: -0.033}),
    keyboard: false
  };
  layers = [];
  userDatas = [];

  constructor(public leafletService: LeafletService, private userService: UserService) {

    this.currentUser = localStorage.getItem('selectedUser');
    this.userService.getTime(this.currentUser).subscribe((timeRange) => {
      timeRange.forEach((time) => {
        this.myDateRangePickerOptions.enableDates.push(time)
      });
       this.model = {beginDate: this.myDateRangePickerOptions.enableDates[0],
       endDate: this.myDateRangePickerOptions.enableDates[this.myDateRangePickerOptions.enableDates.length - 1] };
    });
  }

  ngOnInit() {
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    const range = {start: event.beginDate, end: event.endDate};
     this.userService.setUserTime(range);
    // const chosendateFromCalendar = event.jsdate;
    // const date = this.userService.getTotalLocations(currentUser, chosendateFromCalendar).subscribe((d) => {
    // });
    console.log(event);
    this.getTotalPath();
    this.getCurrentLocation();
  }


  go() {
    console.log('dddd');
  }

  onReadyMap(map: L.Map) {
    this.map = map;
    this.drawRadius();
  }

  getUserLatLngs(e) {
    e.stopPropagation();

    this.leafletService.getUsersConfigData(this.currentUser).subscribe((result) => {
      _.sortBy(result.locations, 'time');


      if (result.locations.length) {
        for (let i = 0; i < result.locations.length; i++) {
          this.latlngs.push([
            result.locations[i].lat,
            result.locations[i].lon,
          ]);
        }
      }
      this.map.addLayer(L.polyline([...this.latlngs]));
    });
  }

  getCurrentLocation() {
    // e.stopPropagation();
    this.leafletService.getUsersConfigData(this.currentUser).subscribe((result) => {
      _.sortBy(result.locations, 'time');
      if (result.locations.length) {
        this.curLoc.push([
          result.locations[0].lat,
          result.locations[0].lon,
        ]);
        L.marker([this.curLoc[0][0], this.curLoc[0][1]], {
          icon: L.icon({
            iconSize: [41, 41],
            iconAnchor: [0, 0],
            iconUrl: 'assets/images/red.png',
          }),
        }).addTo(this.map);
      }
    });
  }

  getTotalPath() {
    // e.stopPropagation();
    const time = this.userService.getUserTime();
    this.userService.getTotalLocations(this.currentUser, time).subscribe((result) => {

      this.latlngs = [];
      if (result.locations.length) {
        for (let i = 0; i < result.locations.length; i++) {
          this.latlngs.push([
            result.locations[i].lat,
            result.locations[i].lon,
          ]);
        }
      }
      if (this.polylines) {
        this.map.removeLayer(this.polylines);
      }
      this.polylines = L.polyline([...this.latlngs]);
      this.map.addLayer(this.polylines);
    });
    // const gg = this.polylines.getCenter();
    //
    // this.map.setView(new L.LatLng(gg[0], gg[1]), 16);

  }

  getBatchPath() {
    const time = this.userService.getUserTime();
    this.userService.getBatchLocations(this.currentUser, time, this.batchValue).subscribe((result) => {

      this.latlngs = [];
      if (result.locations.length) {
        for (let i = 0; i < result.locations.length; i++) {
          this.latlngs.push([
            result.locations[i].lat,
            result.locations[i].lon,
          ]);
        }
      }
      if (this.polylines) {
        this.map.removeLayer(this.polylines);
      }
      this.polylines = L.polyline([...this.latlngs]);
      this.map.addLayer(this.polylines);
    });
  }

  chooseBatch() {
    if (this.batchValue) {
      return this.getBatchPath();
    }
  }

  drawRadius() {
    if (this.currentUser) {
       let radius = 0;
      this.userService.getUsersRadius(this.currentUser).subscribe((data) => {
        radius = data;
      });
      this.userService.getUsersConfigLoc(this.currentUser).subscribe((res) => {
        L.circle([res[0], res[1]], {radius: radius}).addTo(this.map);
       this.map.setView(new L.LatLng(res[0], res[1]), 16);
        L.marker([res[0], res[1]], {
          icon: L.icon({
            iconSize: [41, 41],
            iconAnchor: [0, 0],
            iconUrl: 'assets/images/Location.png',
          }),
        }).addTo(this.map);
      // L.circle([39.48621581697988, -0.3582797572016716], {radius: 40}).addTo(this.map);
      // this.map.setView(new L.LatLng(39.48621581697988, -0.3582797572016716), 16);
      });
    }
  }
  ngOnDestroy() {
    this.map.remove();
  }
}

// initIcons() {
//   const customContro0 = L.Control.extend({
//
//     options: {
//       position: 'topleft',
//     },
//
//     //  loc: this.getCurrentLocation(),
//
//     onAdd: function (map) {
//       const container0 = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom text-center ');
//
//       container0.style.backgroundColor = 'white';
//       container0.style.backgroundSize = '32px 32px';
//       container0.style.width = '32px';
//       container0.style.height = '32px';
//       container0.title = 'Location';
//       container0.innerHTML = ' <i class="fa fa-map-marker" aria-hidden="true"></i>';
//       container0.style.fontSize = '28px';
//       container0.style.lineHeight = '32px';
//       container0.style.color = '#171717';
//
//       //   container0.onclick =  this.loc;
//
//       return container0;
//     },
//   });
//   this.map.addControl(new customContro0());
//   const customControl = L.Control.extend({
//
//     options: {
//       position: 'topleft',
//     },
//
//     onAdd: function (map) {
//       const container = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom text-center ');
//
//       container.style.backgroundColor = 'white';
//       container.style.backgroundSize = '32px 32px';
//       container.style.width = '32px';
//       container.style.height = '32px';
//       container.title = 'Radius';
//       container.innerHTML = ' <i class="fa fa-dot-circle-o" aria-hidden="true"></i>';
//       container.style.fontSize = '28px';
//       container.style.lineHeight = '32px';
//       container.style.color = '#171717';
//
//       // container.onclick = this.getRadius();
//
//       return container;
//     },
//   });
//   this.map.addControl(new customControl());
//   const customControl1 = L.Control.extend({
//
//     options: {
//       position: 'topleft',
//     },
//
//     // radius: this.getUserLatLngs(),
//
//     onAdd: function (map) {
//       const container1 = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom ');
//
//       container1.style.backgroundColor = 'white';
//       container1.style.backgroundSize = '32px 32px';
//       container1.style.width = '32px';
//       container1.style.height = '32px';
//       container1.title = 'Path';
//       container1.innerHTML = '<i class="ion-arrow-graph-up-right" aria-hidden="true"></i>';
//       container1.style.fontSize = '28px';
//       container1.style.lineHeight = '32px';
//       container1.style.color = '#171717';
//       // container1.onclick = this.radius;
//       return container1;
//     },
//   });
//   this.map.addControl(new customControl1());
// }
//
// initButtons() {
//   const customControl =  L.Control.extend({ options: { position: 'topleft' },
//     onAdd: (map) => {
//
//       const container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
//
//       container.insertAdjacentHTML('afterbegin', `
//           <a href="#" onclick="getRadius($event)"><i class="fa fa-dot-circle-o"></i></a>
//           <a href="#" onclick="getPath($event)"><i class="ion-arrow-graph-up-right"></i></a>
//           <a href="#" onclick="getLocation($event)"><i class="fa fa-map-marker"></i></a>
//       `);
//       // container.insertBefore(btn2)
//       // container.innerHTML = `
//       //     <a href="#" onclick="getRadius($event)"><i class="fa fa-dot-circle-o"></i></a>
//       //     <a href="#" onclick="getPath($event)"><i class="ion-arrow-graph-up-right"></i></a>
//       //     <a href="#" onclick="getLocation($event)"><i class="fa fa-map-marker"></i></a>
//       // `;
//       return container;
//     },
//     getRadius: (e) => {
//       e.preventDefault();
//       alert('radius');
//     },
//     getPath: (e) => {
//       e.preventDefault();
//       alert('path')
//     },
//     getLocation: (e) => {
//       e.preventDefault();
//       alert('location')
//     },
//   });
//   // } map.addControl();
//   this.map.addControl(new customControl());
// }
