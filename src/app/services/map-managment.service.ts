import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from 'src/app/models/location';
import { IssueManagmentService } from '../api/services/issue-managment.service';
import { Marker, MapOptions } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapManagmentService {

  private mapOptions: MapOptions; 
  mapOptionsSubject= new BehaviorSubject<MapOptions>(this.mapOptions);
  
  positionNewMarker = new BehaviorSubject<Location>(new Location());
  // observableMarker = this.positionNewMarker.asObservable;
  activeMarker = new BehaviorSubject<Marker>(null);
  // mpOptions: MapOptions;
  initIssue: boolean = false;

  constructor(private issueManagment: IssueManagmentService) { }

  updateMarkerPosition(pos: Location) {
    this.positionNewMarker.next(pos);
  }

  updateActiveMarker(m: Marker) {
     this.activeMarker.next(m);
   }

  updateMapOptions(mapOptions: MapOptions) {
    //console.log('Update with :',mapOptions);
    this.mapOptionsSubject.next(mapOptions);
  }

  initNewIssue() {
    this.initIssue=true;
  }




}
