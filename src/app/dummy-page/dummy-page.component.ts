import { Component, OnInit } from "@angular/core";
import { IssueTypeService } from "../api/services/issue-type.service";
import { IssueRequest } from '../models/issue-request';

@Component({
  selector: "app-dummy-page",
  templateUrl: "./dummy-page.component.html",
  styleUrls: ["./dummy-page.component.scss"],
})
export class DummyPageComponent implements OnInit {

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  // Inject the UserService
  constructor(private issueTypeService: IssueTypeService) {

    
  }

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => console.log("Issue types", result),
      error: (error) => console.warn("Error", error),
    });
  }

  createNewIssueType(): void {
    console.log('Appel de la création d\'un nouveau type');
    let iType: IssueRequest = {name: 'Accident',description: ''};
    
    this.issueTypeService.createIssueType(iType).subscribe({
      next: (result) => console.log("new Issue type", result),
      error: (error) => console.warn("Error", error),
    });


  }
}