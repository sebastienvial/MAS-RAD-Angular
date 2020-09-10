import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: boolean = true;

  constructor(private issueService: IssueManagmentService, private router: Router) { }

  ngOnInit(): void {
  }

  search(searchForm: NgForm) {
    this.issueService.loadIssues(searchForm.controls.searchTxt.value).subscribe(res=>{
      // console.log('resultat recherche',res);
      this.issueService.showMarkers(res);
      this.router.navigate(['/citizen', 'show']);


    });

    // this.issueService.


  }

}
