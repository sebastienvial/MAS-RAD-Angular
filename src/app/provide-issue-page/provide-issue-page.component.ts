import { Component, OnInit } from '@angular/core';
import { IssueTypeService } from '../api/services/issue-type.service';
import { IssueType } from '../models/issue-type';

@Component({
  selector: 'app-provide-issue-page',
  templateUrl: './provide-issue-page.component.html',
  styleUrls: ['./provide-issue-page.component.scss']
})
export class ProvideIssuePageComponent implements OnInit {

  public issueTypes: IssueType[];
  public selected = 'essai';

  constructor(private issueTypeService: IssueTypeService) { 
    
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => this.issueTypes = result,
      error: (error) => console.warn("Error", error),
    });    

  }

  ngOnInit(): void {
  }

}
