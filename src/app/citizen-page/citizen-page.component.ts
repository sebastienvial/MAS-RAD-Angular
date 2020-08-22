import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';

@Component({
  selector: 'app-citizen-page',
  templateUrl: './citizen-page.component.html',
  styleUrls: ['./citizen-page.component.scss']
})
export class CitizenPageComponent implements OnInit {

  newMarkerPosition: Location;
  action: string;

  constructor() { }

  ngOnInit(): void {
  }

  processMarkerPosition(mp:Location) {
     this.newMarkerPosition = mp;
     console.log ("citizen",this.newMarkerPosition);
  }

  activeIssue(action:string) {
    this.action = action;
    console.log('action de activeIssue :', action);
  }

}
