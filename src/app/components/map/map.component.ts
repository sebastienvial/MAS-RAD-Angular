import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MapOptions, Marker, TileLayer, Map} from 'leaflet';
import { defaultIcon, greenIcon, redIcon } from './default-marker';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Location } from 'src/app/models/location';
import { MapManagmentService } from 'src/app/services/map-managment.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() sendMarkerPosition = new EventEmitter();

  mapOptions: MapOptions;
  mapMarkers: Marker[] = new Array<Marker>(0);
  mymap: Map;

  newMarker: Marker;
  newMarkerPosition: Location;

  constructor(private issueManagment: IssueManagmentService, private mapManagment: MapManagmentService) { 
    this.mapManagment.mapOptionsSubject.subscribe((res) => {
      if(this.mymap) {
        console.log('remove')
        this.mymap.removeLayer;
      }
      this.mapOptions = res;
      console.log('mapOptions de la map ',this.mapOptions);
    });
    this.mapMarkers = issueManagment.mapMarkers;
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
  }

}
