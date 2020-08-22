import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/models/location';
import { IssueTypeService } from 'src/app/api/services/issue-type.service';
import { IssueType } from 'src/app/models/issue-type';
import { Issue } from 'src/app/models/issue';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { Marker } from 'leaflet';
import { redIcon } from '../map/default-marker';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-issue-creation',
  templateUrl: './issue-creation.component.html',
  styleUrls: ['./issue-creation.component.scss']
})
export class IssueCreationComponent implements OnInit {
  //identifie la localisation du point sur la carte où se trouve le problème
  @Input() newIssueLocation: Location;
  newIssue: Issue;
  issueTypes: IssueType[];
  newMarker: Marker;

  constructor(private issueTypeService: IssueTypeService, private issueManagmentService: IssueManagmentService, private mapManagment: MapManagmentService) {     
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => this.issueTypes = result,
      error: (error) => console.warn("Error", error),
    }); 
    
    // this.newIssueLocation = new Location();

  }

  ngOnInit(): void {
  }

  initNewIssue() {
    console.log('initialise une nouvelle issue');
    
    this.newMarker = new Marker([46.771111, 6.641524], { icon: redIcon, draggable: true });
    const newMarkerPosition = new Location();
    this.newMarker.on("moveend", () => {
      newMarkerPosition.coordinates =  [this.newMarker.getLatLng().lng,this.newMarker.getLatLng().lat];
      newMarkerPosition.type = 'Point'
      // this.sendMarkerPosition.emit(this.newMarkerPosition);
      this.mapManagment.updateMarkerPosition(newMarkerPosition);
    });
    this.newMarker.bindTooltip('My new issue');
    this.issueManagmentService.mapMarkers.push(this.newMarker); 
    
  }

  

  createNewIssue(form: NgForm) {

    if(form.valid) {
      //Création de la nouvelle issue
      this.newIssue = new Issue();
      this.newIssue.description = form.controls.description.value;
      this.newIssue.imageUrl = form.controls.imageUrl.value;
      this.newIssue.location = this.mapManagment.positionNewMarker.value;
      // if(form.controls.tag.value =='') form.controls.tag.value = ' ';
      this.newIssue.tags = form.controls.tag.value.split(';');
    
      // console.log(this.newIssue);

      this.issueManagmentService.postNewIssue(this.newIssue).subscribe({
        next: (result) => console.log("Result", result),
        error: (error) => console.warn("Error", error),
      }); 
    }

  }

}
