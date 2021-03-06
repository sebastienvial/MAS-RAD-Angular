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
  comments: Commentissue[] = new Array<Commentissue>();
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
    //console.log('detail image : ', this.issueDetail.imageUrl);
    
    //collect comments
    this.issueService.getComments(this.issueDetail.id).subscribe(c => {
      this.comments = c.slice(0);
      //console.log(this.comments);
    })
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

  }

  deleteIssue(issue: Issue) {
    if (confirm('Press OK to delete this issue')) {
      this.issueService.deleteIssue(issue.id).subscribe({
        next: (data) => {
          //console.log(data);
          this.issueService.getAllIssues();
          this.router.navigate(['/citizen', 'show']);
        },
        error: (error) => console.warn("Delete Issue Error ", error)})
      } 
  }

  toggleComment() {
    this.newComment = !this.newComment;
    //console.log(this.newComment);
  }

  addComment(issue: Issue) {
    if (this.comment.nativeElement.value) {
      //console.log('comment of issue : ', issue);
      //console.log(this.comment.nativeElement.value);
      var newComment: Commentissue = new Commentissue();
      newComment.text = this.comment.nativeElement.value;
      this.issueService.addComment(issue.id,newComment).subscribe(c=>{
        //console.log(c);
      });

      // Reload the component with the new comment
      this.router.navigate(['/citizen', 'detail']);
    }
  }

  updateIssue(issue: Issue) { 
    this.router.navigate(['/citizen', 'update']);
  }

 

}
