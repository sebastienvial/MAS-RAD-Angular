import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/models/issue';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-issue-update',
  templateUrl: './issue-update.component.html',
  styleUrls: ['./issue-update.component.scss']
})
export class IssueUpdateComponent implements OnInit {

  issueToUpdate: Issue;

  constructor(private issueService: IssueManagmentService) {
    this.issueToUpdate = issueService.issueActive;
   }

  ngOnInit(): void {
    
  }

  updateIssue(form: NgForm) {
      if(form .valid) { 
        console.log('Form :', form);
        var updatedIssue = new Issue();
  
        // this.issueTypes.forEach(issueType => {
        //   if (issueType.name==form.controls.issueType.value) {
        //     this.newIssue.issueTypeHref = issueType.href;
        //   }
        // });
        updatedIssue.imageUrl = this.issueToUpdate.imageUrl;
        // updatedIssue.additionalImageUrls = this.issueToUpdate.additionalImageUrls;
        updatedIssue.issueTypeHref = this.issueToUpdate.issueTypeHref;
        
        updatedIssue.description = form.controls.description.value;
        
        // this.newIssue.imageUrl = this.imagesUrl[0];
        // this.newIssue.additionalImageUrls = this.imagesUrl.slice(1);
        updatedIssue.location = this.issueToUpdate.location;
        
        if (form.controls.tag.value.length>0) {
          var tags: string[];
          tags = form.controls.tag.value.split(';');
          updatedIssue.tags = tags;
        }
          
        console.log(updatedIssue);
  
        this.issueService.patchIssue(this.issueToUpdate.id, updatedIssue).subscribe({
          next: (result) => console.log("Result", result),
          error: (error) => console.warn("Error", error),
        }); 
      }
  
    }

  

}
