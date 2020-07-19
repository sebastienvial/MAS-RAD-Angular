import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IssueType } from "src/app/models/issue-type";
// TODO Import the environment file
import { environment } from "../../../environments/environment";
import { IssueRequest } from 'src/app/models/issue-request';
import { IssueResponse } from 'src/app/models/issue-response';



@Injectable({
  providedIn: "root",
})
export class IssueTypeService {
  constructor(private http: HttpClient) {}

  loadAllIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(`${environment.apiUrl}/issueTypes`);
  }

  createIssueType(issueRequest: IssueRequest): Observable<IssueResponse> {
    return this.http.post<IssueResponse>(`${environment.apiUrl}/issueTypes`, issueRequest);
  }


}