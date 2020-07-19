import { Component, OnInit } from '@angular/core';
import { LatLng, MapOptions, tileLayer } from 'leaflet';

import * as L from 'leaflet';

@Component({
  selector: 'app-map-cpn',
  templateUrl: './map-cpn.component.html',
  styleUrls: ['./map-cpn.component.scss']
})
export class MapCpnComponent implements OnInit {

  // mapOptions: MapOptions;
  // constructor() {
  //   this.mapOptions = {
  //     layers: [
  //       tileLayer(
  //         'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //         { maxZoom: 18 }
  //       )
  //     ],
  //     zoom: 13,
  //     center: LatLng(46.778186, 6.641524)
  //   }


  // }

  map:any;

  ngOnInit() {
    this.map = L.map('map').setView([46.782527, 6.637024], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Maker
    L.marker([0, 0]).bindPopup('<b>Hello!!</b>').addTo(this.map);

    
    // antPolyline = L.polyline.antPath(latlngs, options);
    // antPolyline.addTo(map);
  
    // https://github.com/rubenspgcavalcante/leaflet-ant-path
    //antPath([[43.068661, 141.350755], [42.768651, 141.750955]], {color: '#FF0000', weight: 5, opacity: 0.6}).addTo(this.map);
    //antPath([[43.668661, 140.250755], [42.368651, 141.150955]], {color: '#0000FF', weight: 5, opacity: 0.6, reverse: true,}).addTo(this.map);
  }

}
