import { Component, OnInit } from '@angular/core';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Issue } from 'src/app/models/issue';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  issueDetail: Issue;

  constructor(private issueService: IssueManagmentService) { }

  ngOnInit(): void {
    this.issueDetail = this.issueService.issueActive;
  }

}
