import { Component, OnInit } from '@angular/core';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Issue } from 'src/app/models/issue';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { Marker, MapOptions } from 'leaflet';
import { defaultIcon, greenIcon } from '../map/default-marker';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-issue-vue',
  templateUrl: './issue-vue.component.html',
  styleUrls: ['./issue-vue.component.scss']
})
export class IssueVueComponent implements OnInit {

  mapOptions: MapOptions;
  allIssues: Issue[];
  
  constructor(private issueManagmentService: IssueManagmentService, private mapManagment: MapManagmentService, private router: Router) {
    
    this.mapManagment.mapOptionsSubject.subscribe((res) => {
      this.mapOptions = res;
    });

    this.allIssues = new Array<Issue>(0);

    this.issueManagmentService.issuesChosen.subscribe(issues => {
      this.allIssues = issues;
    })

   }

  ngOnInit(): void {
    
    fromEvent<CustomEvent>(window, 'ngFix').subscribe(res => {
      let idI = res.detail.id;
      //console.log("my Detail :", idI);

      this.issueManagmentService.getIssue(idI).subscribe(issue => {
        //console.log("recup issue : ",issue);
        this.showDetail(issue);
      });
    });
  }

  showOnMap(issueActive: Issue) {
    //console.log(issueActive);
    var markerActif: Marker = new Marker(null);

    markerActif = this.issueManagmentService.mapMarkers.find(m => {
      (m.getLatLng().lat==issueActive.location.coordinates[1] && m.getLatLng().lng==issueActive.location.coordinates[0]);
    });
    
    this.issueManagmentService.mapMarkers.forEach(m => {
      if(m.getLatLng().lat==issueActive.location.coordinates[1]) {
        m.setIcon(greenIcon);
        this.mapOptions.center = m.getLatLng();
        this.mapOptions.zoom = 14;
        this.mapManagment.updateMapOptions(this.mapOptions);

      } else {
        m.setIcon(defaultIcon);
      }
    })

  }

  showDetail(issue: Issue) {
    this.showOnMap(issue);
    //[routerLink]="['/citizen', 'detail']"
    this.issueManagmentService.issueActive = issue;
    this.router.navigate(['/citizen', 'detail']);
  }


}
