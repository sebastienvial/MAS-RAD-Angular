import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { IssueTypeService } from 'src/app/api/services/issue-type.service';
import { IssueType } from 'src/app/models/issue-type';
import { Issue } from 'src/app/models/issue';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { MapManagmentService } from 'src/app/services/map-managment.service';
import { MapOptions, Marker } from 'leaflet';
import { redIcon } from '../map/default-marker';
import { NgForm} from '@angular/forms';
import { ImageService } from 'src/app/api/services/image.service';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';

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
  //@Input() newIssueLocation: Location;
  newIssue: Issue;
  issueTypes: IssueType[];
  newMarker: Marker;
  mapOptions: MapOptions;

  constructor(private issueTypeService: IssueTypeService, 
              private issueManagmentService: IssueManagmentService, 
              private mapManagment: MapManagmentService,
              private imgService: ImageService,
              private router: Router,
              private geolocation: GeolocationService) {
                
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => this.issueTypes = result,
      error: (error) => console.warn("Error", error),
    }); 

    this.mapManagment.mapOptionsSubject.subscribe((res) => {
      this.mapOptions = res;
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

    var posLat: number, posLong: number;
    this.geolocation.getCurrentPosition().then((pos) => {
      console.log(pos);
      posLat = pos.coords.latitude;
      posLong = pos.coords.longitude;
    
      this.newMarker = new Marker([posLat, posLong], { icon: redIcon, draggable: true });
      //this.newMarker = new Marker([46.771111, 6.641524], { icon: redIcon, draggable: true });

      this.mapOptions.center = this.newMarker.getLatLng();
      this.mapManagment.updateMapOptions(this.mapOptions);
    
      const newMarkerPosition = new Location();
      this.newMarker.on("moveend", () => {
        newMarkerPosition.coordinates =  [this.newMarker.getLatLng().lng,this.newMarker.getLatLng().lat];
        newMarkerPosition.type = 'Point'
        this.mapManagment.updateMarkerPosition(newMarkerPosition);
      });
      
      this.newMarker.bindTooltip('My new issue');
      this.newMarker.bindPopup("<b>Hello world!</b><br><button class='btn btn-primary'>See details</button>").openPopup();
      this.issueManagmentService.mapMarkers.push(this.newMarker); 
    }); 
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
        tags = form.controls.tag.value.split(',');
        this.newIssue.tags = tags;
      }
       
      this.issueManagmentService.postNewIssue(this.newIssue).subscribe({
        next: (result) => {
          console.log("Result", result);
          this.issueManagmentService.getAllIssues();
          this.router.navigate(['/citizen', 'show']); 
        },
        error: (error) => console.warn("Error", error),
      }); 
    }

  }

}
