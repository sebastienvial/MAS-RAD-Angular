import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-update',
  templateUrl: './issue-update.component.html',
  styleUrls: ['./issue-update.component.scss']
})
export class IssueUpdateComponent implements OnInit {

  issueToUpdate: Issue;

  constructor(private issueService: IssueManagmentService,
              private router: Router) {
    this.issueToUpdate = issueService.issueActive;
   }

  ngOnInit(): void {
    
  }

  updateIssue(form: NgForm) {
      if(form .valid) { 
        // console.log('Form :', form);
        var updatedIssue = new Issue();
        updatedIssue.imageUrl = this.issueToUpdate.imageUrl;
        updatedIssue.issueTypeHref = this.issueToUpdate.issueTypeHref;        
        updatedIssue.description = form.controls.description.value;
        updatedIssue.location = this.issueToUpdate.location;
        
        if (form.controls.tag.value.length>0) {
          var tags: string[];
          console.log(form.controls.tag.value);
          tags = form.controls.tag.value;
          updatedIssue.tags = tags;
        }
          
        this.issueService.patchIssue(this.issueToUpdate.id, updatedIssue).subscribe({
          next: (result) => {
            console.log("Result", result);
            this.issueService.getAllIssues();            
            this.router.navigate(['/citizen', 'show']);
          },
          error: (error) => console.warn("Issue update Error", error),
        }); 
      }
  
    }

  

}
