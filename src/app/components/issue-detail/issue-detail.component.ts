import { Component, OnInit } from '@angular/core';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Issue } from 'src/app/models/issue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  issueDetail: Issue;

  constructor(private issueService: IssueManagmentService, private router: Router) { }

  ngOnInit(): void {
    this.issueDetail = this.issueService.issueActive;
  }

  deleteIssue(issue: Issue) {
    if (confirm('Press OK to delete this issue')) {
      this.issueService.deleteIssue(issue.id).subscribe(data => console.log(data));
      this.router.navigate(['/citizen', 'show']);
    } 
    
  }

}
