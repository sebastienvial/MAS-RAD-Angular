import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input() newIssueLocation: Location;
  @Input() action: string;
  showC : boolean;
  showV : boolean;

  constructor() {
    if (this.action != 'vue'){
    this.showV = true;
    this.showC = false;
  } else {
    this.showV = false;
    this.showC = true;
  }

  console.log('action showV: ', this.showV );
   }

  ngOnInit(): void {
  }

  toggleVue() {
    if (this.showC) {
      this.showC = false;
    } else {
      this.showC = true;
    }

    this.showV = !this.showC;
  }

}
