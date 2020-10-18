import { Component, OnInit } from '@angular/core';
import { MapOptions, Marker, TileLayer, Map} from 'leaflet';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  mapOptions: MapOptions;
  mapMarkers: Marker[] = new Array<Marker>(0);
  mymap: Map;

  constructor(private issueManagment: IssueManagmentService, private mapManagment: MapManagmentService, private router: Router) { 
    
    this.issueManagment.mapMarkersChosen.subscribe(markers => {
      this.mapMarkers = markers;
      //console.log('marker actifs : ', markers);
    })
    
  }

  ngOnInit(): void {
    this.createMap();   
  } 

  createMap() {
    const viewPoint = {
      lat: 46.778186,
      lng: 6.641524,
    };

    const zoomLevel = 13; 
    
    const mainLayer = new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
    });

    this.mapOptions = {
        layers: [mainLayer],
        zoom: zoomLevel,
        center: viewPoint
    };
    
    this.mapManagment.updateMapOptions(this.mapOptions);

  }

  onMapReady(map: L.Map){
    this.mymap = map;
    this.mapManagment.mapOptionsSubject.subscribe((res) => {
      this.mapOptions = res;
      //console.log('mapOptions de la map ',this.mapOptions);
      this.mymap.flyTo(this.mapOptions.center,this.mapOptions.zoom);
    });
  };

}
