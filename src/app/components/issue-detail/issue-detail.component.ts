import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Issue } from 'src/app/models/issue';
import { Router, NavigationEnd } from '@angular/router';
import { Commentissue } from 'src/app/models/commentissue';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit, OnDestroy {

  issueDetail: Issue;
  comments: Commentissue[];
  newComment: boolean = false;
  @ViewChild("comment") comment: ElementRef;
  mySubscription: any;

  constructor(private issueService: IssueManagmentService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.issueDetail = this.issueService.issueActive;
    //collect comments
    this.issueService.getComments(this.issueDetail.id).subscribe(c => {
      this.comments = c.slice(0);
    })
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

  }

  deleteIssue(issue: Issue) {
    if (confirm('Press OK to delete this issue')) {
      this.issueService.deleteIssue(issue.id).subscribe(data => console.log(data));
      this.router.navigate(['/citizen', 'show']);
    } 
    
  }

  toggleComment() {
    this.newComment = !this.newComment;
    console.log(this.newComment);
  }

  addComment(issue: Issue) {
    if (this.comment.nativeElement.value) {
      console.log('comment of issue : ', issue);
      console.log(this.comment.nativeElement.value);
      var newComment: Commentissue = new Commentissue();
      newComment.text = this.comment.nativeElement.value;
      this.issueService.addComment(issue.id,newComment).subscribe(c=>{
        console.log(c);
      });

      // Reload the component with the new comment
      this.router.navigate(['/citizen', 'detail']);
    }
  }

  updateIssue(issue: Issue) {  
    // this.showOnMap(issue);
    //[routerLink]="['/citizen', 'detail']"
    // this.issueManagmentService.issueActive = issue;
    this.router.navigate(['/citizen', 'update']);
  }

 

}
