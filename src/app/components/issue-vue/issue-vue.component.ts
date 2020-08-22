import { Component, OnInit } from '@angular/core';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Issue } from 'src/app/models/issue';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { Marker, MapOptions } from 'leaflet';
import { redIcon, defaultIcon } from '../map/default-marker';

@Component({
  selector: 'app-issue-vue',
  templateUrl: './issue-vue.component.html',
  styleUrls: ['./issue-vue.component.scss']
})
export class IssueVueComponent implements OnInit {

  mapOptions: MapOptions;
  allIssues: Issue[];
  
  constructor(private issueManagmentService: IssueManagmentService, private mapManagment: MapManagmentService) {
    // this.mapOptions = this.mapManagment.mapOptions;
    this.mapManagment.mapOptionsSubject.subscribe((res) => {
      this.mapOptions = res;
    });

    this.allIssues = new Array<Issue>(0);
    //this.allIssues = issueManagmentService.loadAllFakeIssues();
    this.issueManagmentService.loadAllIssues().subscribe({
      next: (result) => this.allIssues = result,
      error: (error) => console.warn("Error", error),
    }); 

    console.log(this.allIssues);


   }

  ngOnInit(): void {
  }

  showAllIssues() {

  }

  showOnMap(issueActive: Issue) {
    console.log(issueActive);
    var markerActif: Marker = new Marker(null);

    markerActif = this.issueManagmentService.mapMarkers.find(m => {
      m.getLatLng().lat==issueActive.location.coordinates[1];
    });
    
    this.issueManagmentService.mapMarkers.forEach(m => {
      if(m.getLatLng().lat==issueActive.location.coordinates[1]) {
        console.log("M Trouvé : ", m);
        // m.setOpacity(0.5);
        m.setIcon(redIcon);
        const viewPoint = {
          lat: 46.778186,
          lng: 6.841524,
        };
        this.mapOptions.center = viewPoint;
        this.mapOptions.zoom = 18;

        console.log('mapOptions : ',this.mapOptions);
        this.mapManagment.updateMapOptions(this.mapOptions);

        // console.log("trouver le centre :",this.mapManagment.mpOptions);
        // this.mapManagment.updateMapOptions()  mapOptions.center = viewPoint;
      } else {
        // m.setOpacity(1);
        m.setIcon(defaultIcon);
      }
    })

    // console.log("Marker actif :" , markerActif);
    // console.log(issueActive.location.coordinates[1]);
    // console.log(this.issueManagmentService.mapMarkers[20].getLatLng().lat);
    
    
    // this.issueManagmentService.issueActive = issueActive.id;
    // this.issueManagmentService.getAllMarkers();
  }


}
