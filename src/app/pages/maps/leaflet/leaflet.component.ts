import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import * as _ from 'underscore';
import 'style-loader!leaflet/dist/leaflet.css';
import { LeafletService } from './leaflet.service';
import latLng = L.latLng;
import { UserService } from '../../../@core/data/user.service';

const currentUser = localStorage.getItem('selectedUser');

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options" (leafletMapReady)="onReadyMap($event)" [leafletLayers]="layers">
          <div class="leaflet-control-container">
            <div class="leaflet-top leaflet-right">
              <div class="leaflet-control-zoom leaflet-bar leaflet-control">
                <a class="leaflet-control-btn"
                   (click)="getCurrentLocation($event)" role="button"><i class="fa fa-map-marker"></i></a>
                <a class="leaflet-control-btn"
                   (click)="getUserLatLngs($event)" role="button"><i class="ion-arrow-graph-up-right"></i></a>
                <a class="leaflet-control-btn"
                   (click)="getRadius($event)" role="button"><i class="fa fa-dot-circle-o"></i></a>
              </div>
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
  `,
})
export class LeafletComponent implements OnInit {
  map: L.Map;
  latlngs = [];
 //  curLoc: any;
  curLoc = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 14,
    center: L.latLng({ lat: 39.983, lng: -0.033 }),
  };
  layers = [];
  userDatas = [];
  // userName = 'luis';
  constructor(public leafletService: LeafletService, private userService: UserService) {}
  ngOnInit() {
   // this.getUserLatLngs();
  //  this.getCurrentLocation();
    console.log('selectedUser', this.userService.selectedUser);
  }

  initIcons() {
    const customContro0 = L.Control.extend({

      options: {
        position: 'topleft',
      },

     //  loc: this.getCurrentLocation(),

      onAdd: function (map) {
        const container0 = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom text-center ');

        container0.style.backgroundColor = 'white';
        container0.style.backgroundSize = '32px 32px';
        container0.style.width = '32px';
        container0.style.height = '32px';
        container0.title = 'Location';
        container0.innerHTML = ' <i class="fa fa-map-marker" aria-hidden="true"></i>';
        container0.style.fontSize = '28px';
        container0.style.lineHeight = '32px';
        container0.style.color = '#171717';

     //   container0.onclick =  this.loc;

        return container0;
      },
    });
    this.map.addControl(new customContro0());
    const customControl = L.Control.extend({

      options: {
        position: 'topleft',
      },

      onAdd: function (map) {
        const container = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom text-center ');

        container.style.backgroundColor = 'white';
        container.style.backgroundSize = '32px 32px';
        container.style.width = '32px';
        container.style.height = '32px';
        container.title = 'Radius';
        container.innerHTML = ' <i class="fa fa-dot-circle-o" aria-hidden="true"></i>';
        container.style.fontSize = '28px';
        container.style.lineHeight = '32px';
        container.style.color = '#171717';

        // container.onclick = this.getRadius();

        return container;
      },
    });
    this.map.addControl(new customControl());
    const customControl1 = L.Control.extend({

      options: {
        position: 'topleft',
      },

       // radius: this.getUserLatLngs(),

      onAdd: function (map) {
        const container1 = L.DomUtil.create('div', ' leaflet-bar leaflet-control leaflet-control-custom ');

        container1.style.backgroundColor = 'white';
        container1.style.backgroundSize = '32px 32px';
        container1.style.width = '32px';
        container1.style.height = '32px';
        container1.title = 'Path';
        container1.innerHTML = '<i class="ion-arrow-graph-up-right" aria-hidden="true"></i>';
        container1.style.fontSize = '28px';
        container1.style.lineHeight = '32px';
        container1.style.color = '#171717';
        // container1.onclick = this.radius;
        return container1;
      },
    });
    this.map.addControl(new customControl1());
  }


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
  onReadyMap(map: L.Map) {
    this.map = map;
    // this.initButtons();
    // this.initIcons();
    // this.getUserLatLngs();

  }
  getUserLatLngs(e) {
    e.stopPropagation();

    this.leafletService.getUsersConfigData(currentUser).subscribe((result) => {
      _.sortBy(result.locations, 'time');
     //  console.log(result.locations);


      if (result.locations.length) {
        for (let i = 0; i < result.locations.length; i++) {
          this.latlngs.push([
            result.locations[i].lat,
            result.locations[i].lon,
          ]);
          console.log(result.locations[i].time.toString().slice(5, -1))
        }
      }
          this.map.addLayer(L.polyline([...this.latlngs]));
       });
  }

  getCurrentLocation(e) {
    e.stopPropagation();

    this.leafletService.getUsersConfigData(currentUser).subscribe((result) => {
      _.sortBy(result.locations, 'time');
      console.log(result);
      if (result.locations.length) {
        this.curLoc.push([
          result.locations[0].lat,
          result.locations[0].lon,
        ]);
        L.marker([this.curLoc[0][0], this.curLoc[0][1]], {
          icon: L.icon({
            iconSize: [41, 41],
            iconAnchor: [0, 0],
            iconUrl: 'assets/images/Location.png',
          }),
        }).addTo(this.map);
      }
    });
  }
  getRadius(e) {
    e.stopPropagation();
    console.log('jvoerjoi');
  }
// getUserDatas() {
//   this.leafletService.getUsersConfig()
//     .subscribe((data) => {
//       this.userDatas = data.filter((d) => {
//         return d.user === selectedUser;
//       });
//       console.log(data[0].value);
//       // this.getUserLatLngs();
//     });
}
