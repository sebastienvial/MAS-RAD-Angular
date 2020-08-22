import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import { MapOptions, Map, tileLayer, latLng, Marker, marker } from 'leaflet';
// import *  as L from 'leaflet';
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
    // this.mapOptions = mapManagment.mpOptions;
  }

  ngOnInit(): void {
    

    this.createMap(); 
    // this.createMarkers();   
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

  updateMap() {
    this.mapOptions.zoom = 15;
    console.log('new zoom' );
  }
  createMarkers() {
    // console.log('Marker depuis map: ', this.issueManagment.mapMarkers);
    // L.marker([46.778186, 6.641524]).addTo(this.mymap);
    // this.mapMarkers[1].addTo(this.mymap);
    // this.mapMarkers.forEach(marker => {marker.addTo(this.mymap)});
  }


  // createNewMarker() {
  //   console.log('creation du marker : ');
  //   this.newMarker = L.marker([ 46.771111, 6.641524 ], { icon: redIcon, draggable: true });
  //   this.newMarkerPosition = new Location();
  //   this.newMarker.on("moveend", () => {
  //     this.newMarkerPosition.coordinates =  [this.newMarker.getLatLng().lng,this.newMarker.getLatLng().lat];
  //     this.newMarkerPosition.type = 'Point'
  //     // this.sendMarkerPosition.emit(this.newMarkerPosition);
  //     this.mapManagment.updateMarkerPosition(this.newMarkerPosition);
  //   });
  //   this.newMarker.bindTooltip('My new issue');
  //   this.mapMarkers.push(this.newMarker); 
  //   this.mymap.invalidateSize();   
  // }

  sendPosition() {
    // this.newMarkerPosition.coordinates = [46.771111, 6.641524 ];
    // this.newMarkerPosition.type = "point";
    console.log(this.newMarker.getLatLng().lat);
    //this.sendMarkerPosition.emit({[this.newMarker.getLatLng().lat,this.newMarker.getLatLng().lng], "point"});
  }

  

}
