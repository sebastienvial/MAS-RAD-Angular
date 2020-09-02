import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueManagmentService } from 'src/app/api/services/issue-managment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private issueService: IssueManagmentService) { }

  ngOnInit(): void {
  }

  search(searchForm: NgForm) {
    console.log(searchForm);
    console.log(searchForm.controls.searchTxt.value);

    // this.issueService.


  }

}
