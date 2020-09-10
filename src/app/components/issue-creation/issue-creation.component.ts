import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from 'src/app/models/location';
import { IssueTypeService } from 'src/app/api/services/issue-type.service';
import { IssueType } from 'src/app/models/issue-type';
import { Issue } from 'src/app/models/issue';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { Marker } from 'leaflet';
import { redIcon } from '../map/default-marker';
import { NgForm, SelectMultipleControlValueAccessor} from '@angular/forms';
import { ImageService } from 'src/app/api/services/image.service';

@Component({
  selector: 'app-issue-creation',
  templateUrl: './issue-creation.component.html',
  styleUrls: ['./issue-creation.component.scss']
})

export class IssueCreationComponent implements OnInit {
  issueUpdate : Issue;

  private imagesUpload: File[];
  private imagesUrl: string[] = new Array<string>(0);
  
  //identifie la localisation du point sur la carte où se trouve le problème
  @Input() newIssueLocation: Location;
  newIssue: Issue;
  issueTypes: IssueType[];
  newMarker: Marker;

  constructor(private issueTypeService: IssueTypeService, 
              private issueManagmentService: IssueManagmentService, 
              private mapManagment: MapManagmentService,
              private imgService: ImageService) {
                
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => this.issueTypes = result,
      error: (error) => console.warn("Error", error),
    }); 
   
  }

  ngOnInit(): void {
  }

  onChange(files: File[]) {
    if (files.length>0) {
      this.imagesUpload = Array.from(files);
      this.processImage();
    }
  }

  processImage() {
    console.log('Process image begin');
    this.imagesUrl = new Array<string>();
    if (this.imagesUpload.length>0) {
      for (let i=0; i<this.imagesUpload.length; i++) {
        this.imgService.postNewImage(this.imagesUpload[i]).subscribe((data) =>{
          this.imagesUrl.push(data.url);
          console.log('imageUrl : ', this.imagesUrl);          
        })
      }
    }

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
    this.newMarker.bindPopup("<b>Hello world!</b><br><button class='btn btn-primary'>See details</button>").openPopup();
    this.issueManagmentService.mapMarkers.push(this.newMarker); 
    
  }


  createNewIssue(form: NgForm) {

    if(form.valid) { 
      
      console.log('Form :', form);

      //Création de la nouvelle issue
      this.newIssue = new Issue();

      this.issueTypes.forEach(issueType => {
        if (issueType.name==form.controls.issueType.value) {
          this.newIssue.issueTypeHref = issueType.href;
        }
      });

      // console.log(this.newIssue.issueTypeHref);
      this.newIssue.description = form.controls.description.value;
      console.log(this.imagesUrl);

      this.newIssue.imageUrl = this.imagesUrl[0];
      this.newIssue.additionalImageUrls = this.imagesUrl.slice(1);
      this.newIssue.location = this.mapManagment.positionNewMarker.value;
      
      if (form.controls.tag.value.length>0) {
        var tags: string[];
        tags = form.controls.tag.value.split(';');
        this.newIssue.tags = tags;
      }
        


      this.issueManagmentService.postNewIssue(this.newIssue).subscribe({
        next: (result) => console.log("Result", result),
        error: (error) => console.warn("Error", error),
      }); 
    }

  }

}
